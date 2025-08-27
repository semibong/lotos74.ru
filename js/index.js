$(document).ready(function () {
    var bvi = new isvek.Bvi({
        target: '.btn-bvi',
        reload: true
    });

    let scrollTop = 0;
    window.addEventListener('scroll', function () {
        if (!$('body').hasClass('noscroll')) {
            scrollTop = window.scrollY;
        }
    });

    $('.header__burger-btn').on('click', function () {
        const burger = $('.burger');
        const body = $('body');
        
        burger.toggleClass('burger-opened');

        if (burger.hasClass('burger-opened')) {
            body.addClass('noscroll');
            body.css('top', `-${scrollTop}px`);
        } else {
            body.removeClass('noscroll');
            window.scroll(0, scrollTop);
        }
    });

    $('.burger__close').on('click', function () {
        $('.burger').removeClass('burger-opened');
        $('body').removeClass('noscroll');
        window.scroll(0, scrollTop);
    });

    $('.btn-sign-up').on('click', function () {
        const signUp = $('.sign-up');
        const body = $('body');

        signUp.addClass('sign-up-opened');

        if (window.innerWidth < 993) {
            if (signUp.hasClass('sign-up-opened')) {
                body.addClass('noscroll');
                body.css('top', `-${scrollTop}px`);
            } else {
                body.removeClass('noscroll');
                window.scroll(0, scrollTop);
            }
        }
    });

    $('.sign-up__close, .sign-up__space').on('click', function () {
        $('.sign-up').removeClass('sign-up-opened');

        if (window.innerWidth < 993) {
            $('body').removeClass('noscroll');
            window.scroll(0, scrollTop);
        }
    });

    $(document).on('scroll', function() {
        if ($(window).scrollTop() >= 120) {
            $('.header').addClass('header_mob');
        } else {
            $('.header').removeClass('header_mob');
        }

        if ($(window).scrollTop() >= 800) {
            $('.up').removeClass('up-invisible');
        } else {
            $('.up').addClass('up-invisible');
        }
    });

    $('.up').on('click', () => {
        const body = $("html, body");
        body.animate({
            scrollTop: 0
        }, 500, 'swing');
    });

    if ($('.search').length) {
        let searchBacking = document.createElement('div');
        searchBacking.classList.add('search__backing');
        $(document.body).prepend(searchBacking);

        $('.search input').on('focus', function () {
            $('.search__backing').addClass('active')

            if (window.innerWidth < 993) {
                $('.header__content .header__burger-btn, .header__logo, .header__buttons > .btn:not(.btn-sign-up), .header__contacts>*').css('filter', 'blur(10px)');
            }
        }).on('blur', function () {
            $('.search__backing').removeClass('active');

            if (window.innerWidth < 993) {
                $('.header__content .header__burger-btn, .header__logo, .header__buttons > .btn:not(.btn-sign-up), .header__contacts>*').css('filter', 'none');
            }
        });
    }

    if ($('.screen__slider').length) {
        const screenSlider = new Swiper('.screen__slider .swiper', {
            speed: 1000,
            spaceBetween: 22,
            effect: 'fade',
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            navigation: {
                prevEl: '.screen__slider .slider-arrow-prev',
                nextEl: '.screen__slider .slider-arrow-next'
            },
            pagination: {
                el: '.screen__slider .slider-progressbar',
                type: 'progressbar',
            }
        });
    }

    if ($('.screen__banner').length) {
        $('.screen__banner').each(function () {
            $(this).on('mouseenter', function () {
                if ($(this).find('video').length) {
                    $(this).find('video')[0].play();
                }
            });

            if ($(this).find('video').length) {
                setTimeout(() => {
                    $(this).find('video')[0].play();
                }, 10_000);
            }
        });
    }

    if ($('.services__slider').length) {
        const servicesSlider = new Swiper('.services__slider .swiper', {
            speed: 500,
            spaceBetween: 14,
            slidesPerView: 0.5,
            freeMode: true,
            navigation: {
                prevEl: '.services__slider .slider-arrow-prev',
                nextEl: '.services__slider .slider-arrow-next'
            },
            pagination: {
                el: '.services__slider .slider-progressbar',
                type: 'progressbar',
            },

            breakpoints: {
                993: {
                    spaceBetween: 60,
                    slidesPerView: 1,
                    freeMode: false
                }
            }
        });

        $('.services__item__image').each(function () {
            const parallax = new Parallax(this, {
                invertX: false,
                invertY: false,
                scalarX: 3,
                scalarY: 3
            });
        });
    }

    if ($('.doctors').length) {
        $('.doctors__enumeration__item').on('click', function () {
            $('.doctors__enumeration__item').removeClass('active');
            $(this).addClass('active');
        });

        const doctorsSlider = new Swiper('.doctors__slider .swiper', {
            speed: 1000,
            spaceBetween: 10,
            slidesPerView: 0.5,
            freeMode: true,
            navigation: {
                prevEl: '.doctors__slider .slider-arrow-prev',
                nextEl: '.doctors__slider .slider-arrow-next'
            },
            pagination: {
                el: '.doctors__slider .slider-progressbar',
                type: 'progressbar',
            },
            breakpoints: {
                993: {
                    spaceBetween: 22,
                    slidesPerView: 1,
                    freeMode: false
                }
            }
        });
    }

    if ($('.drop-list').length) {
        if (window.innerWidth < 993) {
            $('.drop-list').each(function () {
                let dropList = this;

                let height = $(dropList).outerHeight();
                $(window).on('resize', function () {
                    $(dropList).animate({height: '100%'}, 0);
                    height = $(dropList).outerHeight();
                    $(dropList).animate({height: '4.2rem'}, 0);  
                });

                $(dropList).animate({height: '4.2rem'}, 0);  

                let dropListButton;
                for (let i = 0; i < dropList.children.length; i++) {
                    if ($(dropList.children.item(i)).hasClass('drop-list__button')) {
                        dropListButton = dropList.children.item(i);
                    }
                }

                $(dropListButton).on('click', function () {
                    $(this).toggleClass('active');

                    if ($(this).hasClass('active')) {
                        $(dropList).animate({height: `${height}px`}, 500);
                    } else {
                        $(dropList).animate({height: '4.2rem'}, 500);
                    }
                });

                for (let i = 0; i < dropList.children.length; i++) {
                    if (!$(dropList.children.item(i)).hasClass('drop-list__button')) {
                        $(dropList.children.item(i)).on('click', function () {
                            for (let i = 0; i < dropList.children.length; i++) {
                                $(dropList.children.item(i)).removeClass('active');
                            }
                            $(this).addClass('active');
                            $(dropList).animate({height: '4.2rem'}, 500);
                        });
                    }
                }
            });
        }
    }

    if ($('.utp').length) {
        $('.utp__item').each(function () {
            const parallax = new Parallax(this, {
                pointerEvents: true,
                selector: '.utp__item__image',
                invertX: false,
                invertY: false,
            });
            const parallaxBorder = new Parallax(this, {
                pointerEvents: true,
                selector: '.utp__item__border',
            });
        });
    }

    if ($('.reviews').length) {
        $('.reviews__header__sources__item').on('click', function () {
            $('.reviews__header__sources__item').removeClass('active');
            $(this).addClass('active');
        });

        const reviewsSlider = new Swiper('.reviews__slider .swiper', {
            speed: 1000,
            slidesPerView: 1,
            spaceBetween: 15,
            navigation: {
                prevEl: '.reviews__slider__controls .slider-arrow-prev',
                nextEl: '.reviews__slider__controls .slider-arrow-next'
            },
            pagination: {
                el: '.reviews__slider__controls .slider-progressbar',
                type: 'progressbar'
            },
            breakpoints: {
                993: {
                    slidesPerView: 4,
                    spaceBetween: 22
                }
            }
        });
    }

    if ($('.map').length) {
        $('.map__drop-list__item').on('click', function () {
            $('.map__drop-list__item').removeClass('active');
            $(this).addClass('active');
        });
    }

    if ($('.drop-down').length) {
        let isDropDownBtnHover = false;
        let isDropDownMenuHover = false;

        $('.drop-down-open').on('mouseenter', function () {
            isDropDownBtnHover = true;
            $('.drop-down').addClass('active');
        }).on('mouseleave', function () {
            isDropDownBtnHover = false;
            setTimeout(() => {
                if (!isDropDownMenuHover) {
                    $('.drop-down').removeClass('active');
                }
            }, 10);
        });

        $('.drop-down').on('mouseenter', function () {
            isDropDownMenuHover = true;
        }).on('mouseleave', function () {
            isDropDownMenuHover = false;
            setTimeout(() => {
                if (!isDropDownBtnHover) {
                    $('.drop-down').removeClass('active');
                }
            }, 10);
        });

        $(document).on('scroll', function() {
            if ($(window).scrollTop() >= 120) {
                $('.drop-down').addClass('drop-down_mob');
            } else {
                $('.drop-down').removeClass('drop-down_mob');
            }
        });

        $('.drop-down__list__sub>ul').slideUp(0);
        $('.drop-down__list__sub').on('click', function () {
            $(this).toggleClass('active');
            $(this.children.item(1)).slideToggle(250);
        });
    }

    if ($('.search-page').length) {
        const input = document.querySelector('input[name=q]');
        const clear = document.getElementById('search-clear');
        const startButton = document.getElementById('search-recognition');

        clear.addEventListener('click', () => {
            input.value = '';
        });

        if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();

            recognition.lang = 'ru-RU';
            recognition.continuous = false;
            recognition.interimResults = true;

            recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            input.value = transcript;
            };

            recognition.onerror = (event) => {
            console.error('Ошибка распознавания речи:', event.error);
            };

            startButton.addEventListener('click', () => {
            recognition.start();
            });

        } else {
            startButton.disabled = true;
            startButton.textContent = 'Голосовой ввод не поддерживается';
            console.error('SpeechRecognition API не поддерживается в этом браузере.');
        }


        $('.b-list__item__expand').on('click', function () {
            $(this).prev().toggleClass('expanded');
        });
    }

    if ($('.services-page').length) {
        $('.services-page__category').on('click', function () {
            $('.services-page__category').removeClass('active');
            $(this).addClass('active');

            const slider = document.querySelector('.services-page__categories__content');
            const sliderRect = slider.getBoundingClientRect();
            const itemRect = this.getBoundingClientRect();
            const sliderWidth = sliderRect.width;
            const itemWidth = itemRect.width;

            // Текущее смещение через DOMMatrix
            const style = window.getComputedStyle(slider);
            const matrix = new DOMMatrix(style.transform);
            let translateX = matrix.m41;

            // Позиция элемента с учетом текущего смещения
            const itemPos = itemRect.left - sliderRect.left + translateX;
            const contentWidth = slider.scrollWidth;
            const minTranslateX = sliderWidth - contentWidth;

            // Логика определения конечного положения
            if (itemPos < sliderWidth / 2) {
                // Элемент близко к началу
                translateX = 0;
            }
            else if ((contentWidth - (itemPos + itemWidth)) < sliderWidth / 2) {
                // Элемент близко к концу
                translateX = minTranslateX;
            }
            else {
                // Центрирование элемента
                const targetCenter = sliderWidth / 2;
                const itemCenter = itemPos + itemWidth / 2;
                translateX += (targetCenter - itemCenter);
            }

            // Изменение положения
            translateX = Math.max(minTranslateX, Math.min(0, translateX));
            slider.style.transform = `translateX(${translateX}px)`;
        });

        $('.services-page__category').each(function () {
            const parallax = new Parallax(this, {
                pointerEvents: true,
                selector: '.services-page__category__image',
                invertX: false,
                invertY: false,
            });

            const parallaxBorder = new Parallax(this, {
                pointerEvents: true,
                selector: '.services-page__category__border',
            });

            if ($(window).width() < 993) {
                parallax.disable();
                parallaxBorder.disable();
            }
        });

        $('.services-page__list__column>.services-page_sub').each(function () {
            $(this).find('.services-page__list_sub').slideUp(0);
        });

        $('.services-page_sub>button').on('click', function () {
            const parent = $(this).offsetParent();
            parent.toggleClass('active');
            
            if (parent.hasClass('active')) {
                parent.find('.services-page__list_sub').slideDown(300);
            } else {
                parent.find('.services-page__list_sub').slideUp(300);
            }
        });
    }

    if ($('.promotions').length) {
        const parallaxBorder = new Parallax(document.querySelector('.promotions__item_all'), {
            pointerEvents: true,
            selector: '.promotions__item_all__border',
        });
        
        const pack = $('.promotions__content').packery({
            itemSelector: '.promotions__item',
            gutter: 20
        });

        function layoutPackery() {
            var windowWidth = $(window).width();  
            
            if (windowWidth < 1207) {
                pack.packery('option', {
                    gutter: 10
                });
            } else if (windowWidth < 1454) {
                pack.packery('option', {
                    gutter: 15
                });
            } else if (windowWidth < 1701) {
                pack.packery('option', {
                    gutter: 18
                });
            }
            
            pack.packery();
        }

        layoutPackery();

        $(window).resize(function() {
          layoutPackery();
        });
    };
});