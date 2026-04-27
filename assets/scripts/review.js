var swiper = new Swiper(".review-swiper", {

    loop: true,
    autoplay: {
        delay: 3000,
    },

    pagination: {
        el: ".review-pagination",
        clickable: true,
    },

    breakpoints: {
        
        480: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        
        1024: {
            slidesPerView: 2,
            spaceBetween: 20
        },

        1280: {
            slidesPerView: 3,
            spaceBetween: 20
        }

    }

});