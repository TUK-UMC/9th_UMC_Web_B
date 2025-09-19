const hamburger = document.querySelector('.hamburger');
const sidebar = document.querySelector('.sidebar');
const closeBtn = document.querySelector('.close-button');
const navLinks = document.querySelectorAll('.nav-link');
const sidebarLinks = document.querySelectorAll('.sidebar-link');

function toggleSidebar() {
    hamburger.classList.toggle('active');
    sidebar.classList.toggle('active');
    document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : 'auto';
}

function closeSidebar() {
    hamburger.classList.remove('active');
    sidebar.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function setActiveLink(clickedLink, allLinks) {
    allLinks.forEach(link => link.classList.remove('active'));
    clickedLink.classList.add('active');
}

hamburger.addEventListener('click', toggleSidebar);

closeBtn.addEventListener('click', closeSidebar);

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        setActiveLink(link, navLinks);
        const page = link.getAttribute('data-page');
        const correspondingSidebarLink = document.querySelector(`.sidebar-link[data-page="${page}"]`);
        if (correspondingSidebarLink) {
            setActiveLink(correspondingSidebarLink, sidebarLinks);
        }
    });
});

sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        setActiveLink(link, sidebarLinks);
        closeSidebar();
        const page = link.getAttribute('data-page');
        if (page !== 'home') {
            const correspondingNavLink = document.querySelector(`.nav-link[data-page="${page}"]`);
            if (correspondingNavLink) {
                setActiveLink(correspondingNavLink, navLinks);
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    if (navLinks.length > 0) {
        navLinks[0].classList.add('active');
    }
    if (sidebarLinks.length > 0) {
        sidebarLinks[0].classList.add('active');
    }
});