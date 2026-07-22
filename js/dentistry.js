$(document).ready(function() {
    if (document.querySelector('[data-count]')) {
        const counters = document.querySelectorAll('[data-count]');

        function formatCount(el, value) {
            const decimals = parseInt(el.getAttribute('data-count-decimals') || '0', 10);
            const sep = el.getAttribute('data-count-sep') || '';
            const prefix = el.getAttribute('data-count-prefix') || '';
            const suffix = el.getAttribute('data-count-suffix') || '';
            let s = value.toFixed(decimals);
            if (sep) {
                const parts = s.split('.');
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, sep);
                s = parts.join('.');
            }
            return prefix + s + suffix;
        }

        function runCounter(el) {
            const target = parseFloat(el.getAttribute('data-count'));
            // scale duration to the number's magnitude: small numbers finish quickly,
            // large ones keep the full duration so they stay readable
            const duration = Math.min(1600, 350 + Math.log10(Math.abs(target) + 1) * 400);

            // reserve the final width now (the element is visible at this point) so counting
            // up doesn't change width / reflow the layout
            if (!el.style.minWidth) {
                el.textContent = formatCount(el, target);
                el.style.minWidth = Math.ceil(el.getBoundingClientRect().width) + 'px';
                el.textContent = formatCount(el, 0);
            }

            let startTime = null;

            function tick(now) {
                if (startTime === null) startTime = now;
                const progress = Math.min((now - startTime) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = formatCount(el, target * eased);
                if (progress < 1) {
                    window.requestAnimationFrame(tick);
                } else {
                    el.textContent = formatCount(el, target);
                }
            }

            window.requestAnimationFrame(tick);
        }

        function startCounters() {
            // use tabular figures and start each counter at 0 (final width is reserved later,
            // in runCounter, once the element is actually visible)
            counters.forEach(el => {
                if (window.getComputedStyle(el).display === 'inline') {
                    el.style.display = 'inline-block';
                }
                el.style.fontVariantNumeric = 'tabular-nums';
                el.textContent = formatCount(el, 0);
            });

            function startWhenAppeared(el) {
                // if the number is inside an appearance-animated block, wait until that
                // block is most of the way faded in before counting — a touch before it's
                // fully visible, so the count-up overlaps the tail of the appearance
                const box = el.closest('[data-wp-child]') || el;

                function waitForOpacity() {
                    const cs = window.getComputedStyle(box);
                    if (cs.display !== 'none' && parseFloat(cs.opacity) > 0.6) {
                        runCounter(el);
                    } else {
                        window.requestAnimationFrame(waitForOpacity);
                    }
                }

                if ('IntersectionObserver' in window) {
                    const io = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                io.unobserve(entry.target);
                                waitForOpacity();
                            }
                        });
                    }, { threshold: 0.6 });
                    io.observe(el);
                } else {
                    waitForOpacity();
                }
            }

            counters.forEach(startWhenAppeared);
        }

        // measure after web fonts have loaded so the reserved width matches the final glyphs
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(startCounters);
        } else {
            startCounters();
        }
    }

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

    if ($('.dentistry_sections').length || $('.dentistry_sidenav').length) {
        const $navLinks = $('.dentistry_sections a, .dentistry_sidenav__item');
        const sections = [];

        $navLinks.each(function() {
            const id = $(this).attr('href');
            if (id && id.charAt(0) === '#') {
                const target = document.querySelector(id);
                if (target && sections.indexOf(id) === -1) {
                    sections.push(id);
                }
            }
        });

        let suppressSpy = false;
        let suppressTimer = null;

        function setActiveSection(id) {
            $navLinks.removeClass('active');
            $navLinks.filter('[href="' + id + '"]').addClass('active');
        }

        function updateActiveSection() {
            if (suppressSpy) return;

            const offset = window.innerHeight * 0.35;
            let currentId = sections[0];

            for (let i = 0; i < sections.length; i++) {
                const target = document.querySelector(sections[i]);
                if (target && target.getBoundingClientRect().top - offset <= 0) {
                    currentId = sections[i];
                }
            }

            setActiveSection(currentId);
        }

        if (sections.length) {
            $navLinks.on('click', function() {
                setActiveSection($(this).attr('href'));

                // Freeze the scroll-spy while the smooth scroll animation runs,
                // otherwise intermediate scroll positions flicker the active state.
                suppressSpy = true;
                clearTimeout(suppressTimer);
                suppressTimer = setTimeout(function() {
                    suppressSpy = false;
                    updateActiveSection();
                }, 900);
            });

            window.addEventListener('scroll', updateActiveSection, { passive: true });
            updateActiveSection();
        }
    }

    if ($('.dentistry_utp').length) {
        const dentistryUtpSlider = new Swiper('.dentistry_utp__slider .swiper', {
            loop: true,
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
            loop: true,
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
            loop: true,
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

        function animatePricePositions(content) {
            let delay = 0;
            content.children('.dentistry_price__position').each(function() {
                $(this).removeClass('animate__animated animate__faster animate__fadeInUp');
                void this.offsetWidth; // reflow so the animation restarts on every re-open
                $(this)
                    .css('animation-delay', delay + 's')
                    .addClass('animate__animated animate__faster animate__fadeInUp');
                delay += 0.07;
            });
        }

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
                animatePricePositions(content);
            }
        });
    }

    if ($('.dentistry_reviews').length) {
        const dentistryReviewsSlider = new Swiper('.dentistry_reviews__slider .swiper', {
            loop: true,
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