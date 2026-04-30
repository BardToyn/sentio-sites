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

    const syncSolidHeaderBackground = () => {
        document.body.classList.toggle('header-scroll-solid', window.scrollY > revealThreshold);
    };
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

        syncSolidHeaderBackground();

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
    onScroll();
}

/*dropdown start*/

(function initHeaderDropdowns() {
    const items = document.querySelectorAll('.header-nav__item--dropdown');

    items.forEach((item) => {
        const toggle = item.querySelector('.header-nav__dropdown-toggle');
        if (!toggle) {
            return;
        }

        const setExpanded = (value) => {
            toggle.setAttribute('aria-expanded', String(value));
        };

        item.addEventListener('mouseenter', () => setExpanded(true));
        item.addEventListener('mouseleave', () => setExpanded(false));
        item.addEventListener('focusin', () => setExpanded(true));
        item.addEventListener('focusout', (e) => {
            if (!item.contains(e.relatedTarget)) {
                setExpanded(false);
            }
        });

        toggle.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                setExpanded(false);
                toggle.blur();
            }
        });
    });
})();

/*dropdown end*/

/*burger start*/

(function initMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const openBtn = document.querySelector('.burger-btn');
    const closeBtn = menu?.querySelector('.mobile-menu__close');

    if (!menu || !openBtn || !closeBtn) {
        return;
    }

    const mq = window.matchMedia('(max-width: 1024px)');

    const open = () => {
        if (!mq.matches) {
            return;
        }
        menu.classList.add('mobile-menu--open');
        openBtn.setAttribute('aria-expanded', 'true');
        menu.setAttribute('aria-hidden', 'false');
        document.body.classList.add('mobile-menu-active');
        closeBtn.focus();
    };

    const close = () => {
        menu.classList.remove('mobile-menu--open');
        openBtn.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('mobile-menu-active');
        openBtn.focus();
    };

    openBtn.addEventListener('click', () => open());

    closeBtn.addEventListener('click', () => close());

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu.classList.contains('mobile-menu--open')) {
            close();
        }
    });

    mq.addEventListener('change', () => {
        if (!mq.matches && menu.classList.contains('mobile-menu--open')) {
            close();
        }
    });

    menu.querySelectorAll('.mobile-menu__nav-link, .mobile-menu__pill, .mobile-menu__social-link').forEach((el) => {
        el.addEventListener('click', () => {
            if (menu.classList.contains('mobile-menu--open')) {
                close();
            }
        });
    });
})();

/*burger end*/