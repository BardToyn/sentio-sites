document.addEventListener("DOMContentLoaded", () => {
    const forms = document.querySelectorAll(".contact__form");
    if (!forms.length) return;

    const nameRegex = /^[A-ZА-ЯЁ][a-zа-яё]{1,20}(?:[ -][A-ZА-ЯЁ][a-zа-яё]{1,20})?$/;
    const phoneRegex = /^\+7 \(\d{3}\) \d{3} \d{2}-\d{2}$/;

    const formatPhone = (value) => {
        const digits = value.replace(/\D/g, "");
        const local = digits.startsWith("7") || digits.startsWith("8")
            ? digits.slice(1, 11)
            : digits.slice(0, 10);

        let result = "+7";
        if (local.length > 0) result += ` (${local.slice(0, 3)}`;
        if (local.length >= 4) result += `) ${local.slice(3, 6)}`;
        if (local.length >= 7) result += ` ${local.slice(6, 8)}`;
        if (local.length >= 9) result += `-${local.slice(8, 10)}`;
        return result;
    };

    forms.forEach((form) => {
        const nameInput = form.querySelector('input[name="name"]');
        const phoneInput = form.querySelector('input[name="phone"]');

        if (phoneInput) {
            phoneInput.placeholder = "+7 (800) 555 35-55";
            phoneInput.addEventListener("input", () => {
                phoneInput.value = formatPhone(phoneInput.value);
                phoneInput.setCustomValidity("");
            });
        }

        if (nameInput) {
            nameInput.addEventListener("input", () => {
                nameInput.setCustomValidity("");
            });
        }

        form.addEventListener("submit", (event) => {
            let isValid = true;

            if (nameInput) {
                const nameValue = nameInput.value.trim();
                if (!nameRegex.test(nameValue)) {
                    nameInput.setCustomValidity(
                        "Введите имя буквами: первая буква заглавная, например Иван или Иван Петров."
                    );
                    isValid = false;
                } else {
                    nameInput.setCustomValidity("");
                }
            }

            if (phoneInput) {
                const phoneValue = phoneInput.value.trim();
                if (!phoneRegex.test(phoneValue)) {
                    phoneInput.setCustomValidity("Введите телефон в формате +7 (800) 555 35-55.");
                    isValid = false;
                } else {
                    phoneInput.setCustomValidity("");
                }
            }

            if (!isValid) {
                event.preventDefault();
                form.reportValidity();
            }
        });
    });
});
