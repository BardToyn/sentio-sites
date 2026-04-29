var swiper = new Swiper(".blog-swiper", {

    loop: true,
    autoplay: {
        delay: 3000,
    },

    navigation: {
        nextEl: ".blog-nav--next",
        prevEl: ".blog-nav--prev",
    },

    pagination: {
        el: ".blog-pagination",
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