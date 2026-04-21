(() => {
    const PUBLIC_PAGES = new Set(['login.html']);
    const path = window.location.pathname.split('/').pop() || 'index.html';

    if (PUBLIC_PAGES.has(path)) {
        return;
    }

    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
        window.location.replace('login.html');
        return;
    }

    function logout() {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        window.location.replace('login.html');
    }

    window.logout = logout;

    function removeLoginLinks() {
        document.querySelectorAll('a[href="login.html"]').forEach((link) => {
            link.remove();
        });
    }

    function addProfileLinks() {
        document.querySelectorAll('nav .d-flex').forEach((container) => {
            if (container.querySelector('a[href="profile.html"]')) {
                return;
            }

            const profileLink = document.createElement('a');
            profileLink.href = 'profile.html';
            profileLink.className = 'btn btn-light btn-sm';
            profileLink.textContent = 'Profile';
            container.appendChild(profileLink);
        });
    }

    function setupProfileLogout() {
        if (path !== 'profile.html') {
            return;
        }

        document.querySelectorAll('[data-logout-btn]').forEach((button) => {
            button.addEventListener('click', logout);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            removeLoginLinks();
            addProfileLinks();
            setupProfileLogout();
        });
    } else {
        removeLoginLinks();
        addProfileLinks();
        setupProfileLogout();
    }
})();
