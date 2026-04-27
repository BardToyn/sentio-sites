const fadeUpElements = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

fadeUpElements.forEach((element) => observer.observe(element));
const header = document.querySelector('.header');

if (header) {
    const revealThreshold = 400;
    /** Sync with `transition: transform` on `.header` in header.css */
    const HEADER_HIDE_MS = 300;
    let lastScrollY = window.scrollY;
    let hideToAbsoluteTimeout = null;

    const finishAbsoluteHeader = () => {
        hideToAbsoluteTimeout = null;
        header.style.transition = 'none';
        header.classList.remove('header--fixed', 'header--visible');
        void header.offsetHeight;
        header.style.removeProperty('transition');
    };

    const setAbsoluteHeader = () => {
        if (!header.classList.contains('header--fixed')) {
            return;
        }
        if (header.classList.contains('header--visible')) {
            clearTimeout(hideToAbsoluteTimeout);
            header.classList.remove('header--visible');
            hideToAbsoluteTimeout = setTimeout(finishAbsoluteHeader, HEADER_HIDE_MS);
            return;
        }
        if (hideToAbsoluteTimeout) {
            return;
        }
        finishAbsoluteHeader();
    };

    const setFixedVisibleHeader = () => {
        if (!header.classList.contains('header--fixed')) {
            header.classList.add('header--fixed');
            requestAnimationFrame(() => {
                header.classList.add('header--visible');
            });
            return;
        }

        header.classList.add('header--visible');
    };

    const hideFixedHeader = () => {
        if (header.classList.contains('header--fixed')) {
            header.classList.remove('header--visible');
        }
    };

    const onScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY <= revealThreshold) {
            setAbsoluteHeader();
            lastScrollY = currentScrollY;
            return;
        }

        if (hideToAbsoluteTimeout) {
            clearTimeout(hideToAbsoluteTimeout);
            hideToAbsoluteTimeout = null;
            if (header.classList.contains('header--fixed') && !header.classList.contains('header--visible')) {
                header.classList.add('header--visible');
            }
        }

        if (currentScrollY < lastScrollY) {
            setFixedVisibleHeader();
        } else if (currentScrollY > lastScrollY) {
            hideFixedHeader();
        }

        lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
}
