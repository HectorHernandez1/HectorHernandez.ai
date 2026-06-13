// ===================================
// AI Chat Widget — "Ask me about Hector"
// Talks to the Cloudflare Worker proxy (worker/) which holds the
// LLM API key and enforces rate limits. No key ships to the browser.
// ===================================
(function () {
    // Paste your deployed worker URL here (printed by `wrangler deploy`).
    // For local dev with `wrangler dev`, use 'http://localhost:8787/chat'.
    const CHAT_API_URL = 'https://hector-chat-proxy.hhhector9.workers.dev/chat';

    const MAX_MESSAGE_CHARS = 500; // must match the worker
    const MAX_HISTORY_TURNS = 8;   // must match the worker

    const GREETING = "Hi! I'm Hector's AI assistant. Ask me anything about his experience, skills, or projects.";

    let history = []; // {role, content}
    let busy = false;

    document.addEventListener('DOMContentLoaded', function () {
        // ---- Build widget DOM ----
        const bubble = document.createElement('button');
        bubble.className = 'chat-bubble';
        bubble.setAttribute('aria-label', 'Open AI chat');
        bubble.setAttribute('aria-expanded', 'false');
        bubble.innerHTML =
            '<i class="fas fa-comment-dots chat-icon-open" aria-hidden="true"></i>' +
            '<i class="fas fa-xmark chat-icon-close" aria-hidden="true"></i>';

        const panel = document.createElement('div');
        panel.className = 'chat-panel';
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-label', 'AI chat about Hector');
        panel.innerHTML =
            '<div class="chat-header">' +
            '  <div>' +
            '    <p class="chat-header-title">Ask me about Hector</p>' +
            '    <p class="chat-header-sub">ai assistant · may make mistakes</p>' +
            '  </div>' +
            '  <button class="chat-close" aria-label="Close chat"><i class="fas fa-xmark" aria-hidden="true"></i></button>' +
            '</div>' +
            '<div class="chat-messages" aria-live="polite"></div>' +
            '<form class="chat-form">' +
            '  <input class="chat-input" type="text" placeholder="e.g. What does Hector do?"' +
            '         maxlength="' + MAX_MESSAGE_CHARS + '" autocomplete="off">' +
            '  <button class="chat-send" type="submit" aria-label="Send message">' +
            '    <i class="fas fa-paper-plane" aria-hidden="true"></i>' +
            '  </button>' +
            '</form>' +
            '<p class="chat-disclaimer">answers are generated from hector’s resume &amp; site content</p>';

        document.body.appendChild(panel);
        document.body.appendChild(bubble);

        const messagesEl = panel.querySelector('.chat-messages');
        const form = panel.querySelector('.chat-form');
        const input = panel.querySelector('.chat-input');
        const sendBtn = panel.querySelector('.chat-send');

        addMessage('assistant', GREETING);

        // ---- Open / close ----
        function setOpen(open) {
            panel.classList.toggle('open', open);
            bubble.classList.toggle('open', open);
            bubble.setAttribute('aria-expanded', open);
            if (open) input.focus();
        }

        bubble.addEventListener('click', function () {
            setOpen(!panel.classList.contains('open'));
        });

        panel.querySelector('.chat-close').addEventListener('click', function () {
            setOpen(false);
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && panel.classList.contains('open')) setOpen(false);
        });

        // ---- Send flow ----
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            const text = input.value.trim();
            if (!text || busy) return;

            busy = true;
            sendBtn.disabled = true;
            input.value = '';

            addMessage('user', text);
            history.push({ role: 'user', content: text });

            const typing = document.createElement('div');
            typing.className = 'chat-typing';
            typing.innerHTML = '<span></span><span></span><span></span>';
            messagesEl.appendChild(typing);
            scrollDown();

            try {
                const res = await fetch(CHAT_API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ messages: history.slice(-MAX_HISTORY_TURNS) }),
                });
                typing.remove();

                if (res.ok) {
                    const data = await res.json();
                    addMessage('assistant', data.reply);
                    history.push({ role: 'assistant', content: data.reply });
                } else if (res.status === 429) {
                    const data = await res.json().catch(function () { return {}; });
                    addMessage('error', data.error || "Slow down a little — try again in a minute.");
                    history.pop(); // don't resend this turn's context
                } else {
                    addMessage('error', "Something went wrong — please try again, or just email Hector directly.");
                    history.pop();
                }
            } catch (err) {
                typing.remove();
                addMessage('error', "Couldn't reach the assistant. Check your connection and try again.");
                history.pop();
            } finally {
                busy = false;
                sendBtn.disabled = false;
                input.focus();
            }
        });

        function addMessage(role, text) {
            const el = document.createElement('div');
            el.className = 'chat-msg ' + role;
            el.textContent = text; // textContent — never innerHTML (XSS-safe)
            messagesEl.appendChild(el);
            scrollDown();
        }

        function scrollDown() {
            messagesEl.scrollTop = messagesEl.scrollHeight;
        }
    });
})();
