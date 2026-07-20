$(document).ready(function() {
    if ($('.dentistry_utp').length) {
        const dentistryUtpSlider = new Swiper('.dentistry_utp__slider .swiper', {
            speed: 1000,
            slidesPerView: 'auto',
            spaceBetween: 10,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            scrollbar: {
                el: '.dentistry_utp__slider .slider-progressbar',
                draggable: true
            },
            breakpoints: {
                993: {
                    slidesPerView: 4,
                    spaceBetween: 45
                }
            }
        });
    }

    if ($('.dentistry_specialists').length) {
        const dentistrySpecialistsSlider = new Swiper('.dentistry_specialists__slider .swiper', {
            speed: 1000,
            slidesPerView: 'auto',
            spaceBetween: 20,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            scrollbar: {
                el: '.dentistry_specialists__slider .slider-progressbar',
                draggable: true
            },
            breakpoints: {
                993: {
                    slidesPerView: 4
                }
            }
        });
    }

    if ($('.dentistry_cases').length) {
        const dentistryCasesSlider = new Swiper('.dentistry_cases__slider .swiper', {
            speed: 1000,
            slidesPerView: 'auto',
            spaceBetween: 20,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            scrollbar: {
                el: '.dentistry_cases__slider .slider-progressbar',
                draggable: true
            },
            breakpoints: {
                993: {
                    slidesPerView: 3,
                }
            }
        });
    }

    if ($('.dentistry_popular').length) {
        $('.dentistry_popular-filter__item').on('click', function() {
            $('.dentistry_popular-filter__item').removeClass('active');
            $(this).addClass('active');
        });
    }

    if ($('.dentistry_price').length) {
        $('.dentistry_price-sidebar__item.active').each((_, e) => {
            $(e.children[1]).slideDown(0);
        });

        $('.dentistry_price-sidebar__item__header').on('click', function() {
            const parent = $(this).parent();
            const content = $(parent[0].children[1]);

            if (parent.hasClass('active')) {
                content.slideUp(300);
                parent.removeClass('active');
            } else {
                $('.dentistry_price-sidebar__item.active').find('.dentistry_price-sidebar__item__content').slideUp(300);
                $('.dentistry_price-sidebar__item').removeClass('active');

                content.slideDown(300);
                parent.addClass('active');
            }
        });

        $('.dentistry_price__category.active').each((_, e) => {
            $(e.children[1]).slideDown(0);
        });

        $('.dentistry_price__category__header').on('click', function() {
            const parent = $(this).parent();
            const content = $(parent[0].children[1]);

            if (parent.hasClass('active')) {
                content.slideUp(300);
                parent.removeClass('active');
            } else {
                content.slideDown(300);
                parent.addClass('active');
                
            }
        });
    }

    if ($('.dentistry_reviews').length) {
        const dentistryReviewsSlider = new Swiper('.dentistry_reviews__slider .swiper', {
            speed: 1000,
            slidesPerView: 'auto',
            spaceBetween: 16,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            scrollbar: {
                el: '.dentistry_reviews__slider .slider-progressbar',
                draggable: true
            },
            breakpoints: {
                993: {
                    slidesPerView: 4,
                    spaceBetween: 22,
                }
            }
        });
    }

    if ($('.dentistry_faq').length) {
        $('.dentistry_faq__item.active').each((_, e) => {
            $(e.children[1]).slideDown(0);
        });

        $('.dentistry_faq__item-question').on('click', function() {
            const parent = $(this).parent();
            const answer = $(parent[0].children[1]);

            if (parent.hasClass('active')) {
                answer.slideUp(300);
                parent.removeClass('active');
            } else {
                answer.slideDown(300);
                parent.addClass('active');
            }
        });
    }
});