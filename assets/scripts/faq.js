// faq accordion
(function initFaqAccordion() {
    const faqItems = Array.from(document.querySelectorAll(".faq-item"));

    if (!faqItems.length) {
        return;
    }

    const closeItem = (item) => {
        item.classList.remove("is-open");
        const button = item.querySelector(".faq-item__header");
        if (button) {
            button.setAttribute("aria-expanded", "false");
        }
    };

    const openItem = (item) => {
        item.classList.add("is-open");
        const button = item.querySelector(".faq-item__header");
        if (button) {
            button.setAttribute("aria-expanded", "true");
        }
    };

    faqItems.forEach((item) => {
        const button = item.querySelector(".faq-item__header");
        if (!button) {
            return;
        }

        button.addEventListener("click", () => {
            const isOpen = item.classList.contains("is-open");

            faqItems.forEach(closeItem);

            if (!isOpen) {
                openItem(item);
            }
        });
    });
})();