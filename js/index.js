$(document).ready(function () {
    var bvi = new isvek.Bvi({
        target: '.btn-bvi',
        reload: true
    });

    Fancybox.bind('[data-fancybox]');

    $('input[type=tel]').inputmask({
        mask: '+7 (*{1}99) 999-99-99',
        placeholder: "+7 (___) ___-__-__",
        definitions: {
            '*': {
                validator: "[0-6,9]"
            }
        }
    });

    let scrollTop = 0;
    window.addEventListener('scroll', function () {
        if (!$('body').hasClass('noscroll')) {
            scrollTop = window.scrollY;
        }
    });

    if ($('.burger').length) {
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
    }

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
            $('.drop-list').each(function () {
                if (window.innerWidth < 993 || $(this).hasClass('drop-list_desktop')) {
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
                }
            });
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
    
    if ($('.service').length) {
        $('.service__prices__expand').on('click', function () {
            let block = $(this).closest('.service__prices');
            block.toggleClass('expanded');

            if (block.hasClass('expanded')) {
                $($(this).children()[0]).text('Свернуть');
            } else {
                $($(this).children()[0]).text('Показать еще');
            }
        });

        $('.service__about__expand').on('click', function () {
            let block = $(this).closest('.service__about');
            block.toggleClass('expanded');

            if (block.hasClass('expanded')) {
                $($(this).children()[0]).text('Свернуть');
            } else {
                $($(this).children()[0]).text('Показать еще');
            }
        });

        $('.service__utp__item').each(function () {
            const parallax = new Parallax(this, {
                pointerEvents: true,
                selector: '.service__utp__item__image',
                invertX: false,
                invertY: false,
            });

            const parallaxBorder = new Parallax(this, {
                pointerEvents: true,
                selector: '.service__utp__item__border',
            });

            if ($(window).width() < 993) {
                parallax.disable();
                parallaxBorder.disable();
            }
        });
    }

    if ($('.service__gallery').length) {
        const serviceGallery = new Swiper('.service__gallery__slider', {
            speed: 1000,
            loop: true,
            slidesPerView: 1,
            spaceBetween: 22,
            navigation: {
                prevEl: '.service__gallery .slider-arrow-prev',
                nextEl: '.service__gallery .slider-arrow-next'
            },
            breakpoints: {
                993: {
                    slidesPerView: 4
                },
                769: {
                    slidesPerView: 2
                }
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
            
            if (windowWidth < 993) {
                pack.packery('option', {
                    gutter: 5
                });
            }
            else if (windowWidth < 1207) {
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

    if ($('.blog-list').length) {
        const blogListSlider = new Swiper('.blog-list__slider', {
            speed: 1000,
            slidesPerView: 1.2,
            spaceBetween: 22,
            navigation: {
                prevEl: '.blog-list__arrows .slider-arrow-prev',
                nextEl: '.blog-list__arrows .slider-arrow-next'
            },
            breakpoints: {
                993: {
                    slidesPerView: 4,
                },
                769: {
                    slidesPerView: 2.5,
                }
            } 
        });
    }

    if ($('.specialists').length) {
        $('.specialists__filter__category>a').on('click', function () {
           $(this).parent().children().removeClass('active');
           $(this).addClass('active');
        });

        $('.specialists__filter__profile>select').select2({
            minimumResultsForSearch: Infinity,
            placeholder: 'Любой профиль',
            width: 'element'
        });

        $('.specialists__address>button').on('click', function () {
            $('.specialists__address').toggleClass('active');

            if ($(window).width() < 993) {
                let body = $('body');
                if ($('.specialists__address').hasClass('active')) {
                    body.addClass('noscroll');
                    body.css('top', `-${scrollTop}px`);
                } else {
                    body.removeClass('noscroll');
                    window.scroll(0, scrollTop);
                }
            }
        });

        $('.specialists__address__close').on('click', function () {
            $('.specialists__address').removeClass('active');

            if ($(window).width() < 993) {
                $('body').removeClass('noscroll');
                window.scroll(0, scrollTop);
            }
        });

        $('.specialists__sort__button').on('click', function () {
            $(this).parent().toggleClass('active');
        });

        $('.specialists__sort__content>a').on('click', function () {
            $('.specialists__sort__content>a').removeClass('active');
            $(this).addClass('active');
            $(this).parent().parent().removeClass('active');
        });
    }

    if ($('.specialist').length) {
        if ($('.specialist__block__show').length) {
            $('.specialist__block__show').each(function () {
                let showBtn = $(this);
                let showBtnTextField = showBtn.children()[0];
                let showBtnText = showBtnTextField.innerHTML;
                let block = $(this).parent().children()[0];
                let height = window.getComputedStyle(block).getPropertyValue('height');

                $(block).animate({height: '100%'}, 0);
                let maxHeight = $(block).outerHeight();
                $(block).removeAttr('style');

                if (+height.slice(0, -2) >= maxHeight) {
                    showBtn.addClass('invisible');
                } else {
                    showBtn.removeClass('invisible');
                }

                $(window).on('resize', function () {
                    height = window.getComputedStyle(block).getPropertyValue('height');

                    $(block).animate({height: '100%'}, 0);
                    maxHeight = $(block).outerHeight();
                    $(block).removeAttr('style');

                    if (+height.slice(0, -2) >= maxHeight) {
                        showBtn.addClass('invisible');
                    } else {
                        showBtn.removeClass('invisible');
                    }
                });

                showBtn.on('click', function () {
                    showBtn.toggleClass('active');

                    if (showBtn.hasClass('active')) {
                        $(block).animate({height: `${maxHeight}px`}, 300);
                        showBtnTextField.innerHTML = 'Скрыть';
                    } else {
                        $(block).animate({height: `${height}`}, 300);
                        showBtnTextField.innerHTML = showBtnText;
                    }
                });
            });
        }
    }

    if ($('.control').length) {
        const controlSlider = new Swiper('.control__slider', {
            speed: 1000,
            slidesPerView: 1,
            spaceBetween: 22,
            navigation: {
                prevEl: '.control__slider__controls .slider-arrow-prev',
                nextEl: '.control__slider__controls .slider-arrow-next'
            },
            pagination: {
                el: '.control__slider__controls .slider-progressbar',
                type: 'progressbar'
            },
            breakpoints: {
                993: {
                    slidesPerView: 4
                },

                769: {
                    slidesPerView: 2.5
                }
            }
        });
    }

    if ($('.donor').length) {
        const donorSlider = new Swiper('.donor__gallery>.swiper', {
            loop: true,
            speed: 1000,
            effect: 'fade',
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            navigation: {
                prevEl: '.donor__gallery__arrows .slider-arrow-prev',
                nextEl: '.donor__gallery__arrows .slider-arrow-next'
            },
            pagination: {
                el: '.donor__gallery .slider-progressbar',
                type: 'progressbar'
            }
        });
    }
});