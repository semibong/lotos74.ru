$(document).ready(function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            $('.burger').removeClass('burger-opened');
            $('body').removeClass('noscroll');
            window.scroll(0, scrollTop);

            if (targetElement) {
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 800;

                let startTimestamp = null;

                function animation(timestamp) {
                    if (!startTimestamp) startTimestamp = timestamp;

                    const elapsed = timestamp - startTimestamp;
                    const progress = Math.min(elapsed / duration, 1);
                    const easeInOut = progress < 0.5
                    ? 2 * progress * progress
                    : -1 + (4 - 2 * progress) * progress;

                    window.scrollTo(0, startPosition + distance * easeInOut);

                    if (elapsed < duration) {
                        window.requestAnimationFrame(animation);
                    }
                }
            }

            window.requestAnimationFrame(animation);
        });
    });

    let scrollTop = 0;
    window.addEventListener('scroll', function () {
        if (!$('body').hasClass('noscroll')) {
            scrollTop = window.scrollY;
        }
    });

    if ($('.dentistry_sections').length) {
        $('.dentistry_sections a').on('click', function() {
            $('.dentistry_sections a').removeClass('active');
            $(this).addClass('active');
        });
    }

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

    if ($('.dentistry_steps').length) {
        const dentistryStepsSlider = new Swiper('.dentistry_steps__slider .swiper', {
            speed: 1000,
            slidesPerView: 'auto',
            spaceBetween: 10,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            scrollbar: {
                el: '.dentistry_steps__slider .slider-progressbar',
                draggable: true
            },
        });

        function dentistryStepsSliderHandler() {
            if (window.outerWidth > 992) {
                dentistryStepsSlider.disable();
            } else {
                dentistryStepsSlider.enable();
            }
        }

        dentistryStepsSliderHandler();
        $(window).on('resize', dentistryStepsSliderHandler);
    }
});