// ===================================
// Blog Pagination and Filtering
// ===================================

document.addEventListener('DOMContentLoaded', function () {
    const POSTS_PER_PAGE = 6;
    let currentPage = 1;
    let currentFilter = 'all';

    const blogGrid = document.querySelector('.blog-grid');
    const blogCards = Array.from(document.querySelectorAll('.blog-card'));
    const filterContainer = document.getElementById('categoryFilters');
    const paginationContainer = document.getElementById('pagination');

    // Extract unique categories from posts
    function getCategories() {
        const categories = new Set(['all']);
        blogCards.forEach(card => {
            const category = card.dataset.category;
            if (category) {
                categories.add(category.toLowerCase());
            }
        });
        return Array.from(categories);
    }

    // Create filter buttons
    function createFilterButtons() {
        if (!filterContainer) return;

        const categories = getCategories();
        filterContainer.innerHTML = '';

        categories.forEach(category => {
            const btn = document.createElement('button');
            btn.className = `filter-btn ${category === 'all' ? 'active' : ''}`;
            btn.dataset.category = category;
            btn.textContent = category === 'all' ? 'All Posts' : capitalizeFirst(category);
            btn.addEventListener('click', () => filterByCategory(category));
            filterContainer.appendChild(btn);
        });
    }

    // Filter posts by category
    function filterByCategory(category) {
        currentFilter = category;
        currentPage = 1;

        // Update active button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });

        renderPosts();
    }

    // Get filtered posts
    function getFilteredPosts() {
        if (currentFilter === 'all') {
            return blogCards;
        }
        return blogCards.filter(card =>
            card.dataset.category &&
            card.dataset.category.toLowerCase() === currentFilter
        );
    }

    // Render posts for current page
    function renderPosts() {
        const filteredPosts = getFilteredPosts();
        const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
        const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
        const endIndex = startIndex + POSTS_PER_PAGE;

        // Hide all posts first
        blogCards.forEach(card => {
            card.style.display = 'none';
        });

        // Show posts for current page
        filteredPosts.slice(startIndex, endIndex).forEach(card => {
            card.style.display = 'flex';
        });

        renderPagination(totalPages);

        // Scroll to top of blog section if not on first page load
        if (currentPage > 1 || currentFilter !== 'all') {
            const blogSection = document.querySelector('.section-padding');
            if (blogSection) {
                blogSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }

    // Create pagination controls
    function renderPagination(totalPages) {
        if (!paginationContainer) return;

        paginationContainer.innerHTML = '';

        if (totalPages <= 1) {
            paginationContainer.style.display = 'none';
            return;
        }

        paginationContainer.style.display = 'flex';

        // Previous button
        const prevBtn = document.createElement('button');
        prevBtn.className = `page-btn prev ${currentPage === 1 ? 'disabled' : ''}`;
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i> Newer';
        prevBtn.disabled = currentPage === 1;
        prevBtn.addEventListener('click', () => goToPage(currentPage - 1));
        paginationContainer.appendChild(prevBtn);

        // Page info
        const pageInfo = document.createElement('span');
        pageInfo.className = 'page-info';
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
        paginationContainer.appendChild(pageInfo);

        // Next button
        const nextBtn = document.createElement('button');
        nextBtn.className = `page-btn next ${currentPage === totalPages ? 'disabled' : ''}`;
        nextBtn.innerHTML = 'Older <i class="fas fa-chevron-right"></i>';
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.addEventListener('click', () => goToPage(currentPage + 1));
        paginationContainer.appendChild(nextBtn);
    }

    // Navigate to page
    function goToPage(page) {
        const filteredPosts = getFilteredPosts();
        const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

        if (page < 1 || page > totalPages) return;

        currentPage = page;
        renderPosts();
    }

    // Utility function
    function capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Initialize
    if (blogCards.length > 0) {
        createFilterButtons();
        renderPosts();
    }
});

// ===================================
// Back to Top Button
// ===================================
const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    window.addEventListener('scroll', function () {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
