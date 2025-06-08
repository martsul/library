class Reviews {
    #swiperOptions = {
        freeMode: true,
        grabCursor: true,
        slidesPerView: "auto",
        spaceBetween: 16,
    };

    init() {
        this.#initSwiper();
    }

    #initSwiper() {
        new Swiper(".swiper", this.#swiperOptions);
    }
}

const reviews = new Reviews();
reviews.init();
