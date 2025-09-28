$(document).ready(function () {
    if ($('.lk-enter').length) {
        $('.lk-enter__form__input>input').on('input', function () {
            if ($(this).val().length !== 0) {
                $('.lk-enter__form__input>button').addClass('active');
            } else {
                $('.lk-enter__form__input>button').removeClass('active');
            }
        });

        $('.lk-enter__form__input>button').on('click', function () {
            $('.lk-enter__form__input>input').val('');
            $(this).removeClass('active');
        });

        $('.lk-enter__change-step').on('click', function () {
            let id = $('.lk-enter__form__block.active').data('id');

            $('.lk-enter__form__block.active').removeClass('active');

            if (id === 1) {
                $('.lk-enter__form__block[data-id=2]').addClass('active');
                $('.pincode-input-text.first').focus();
            } else if (id === 2) {
                $('.lk-enter__form__block[data-id=1]').addClass('active');
            }
        });

        $('#lk-code').pincodeInput({inputs: 4, change: (el, val) => {
            if (val) {
                $(el).addClass('active');
            } else {
                $(el).removeClass('active');
            }
        }, complete: () => {
            Fancybox.show([{
                src: '#lk-enter-modal',
                type: 'inline'
            }]);
        }});

        $('.lk-enter__icons__item>label').on('click', function () {
            let avatar = this.children[1].cloneNode(true);
            $('.lk-enter__icons__image').html(avatar);
        });
    }

    $('.lk-form__input>select').select2({
        placeholder: 'Не выбрано',
        width: 'element'
    });

    let scrollTop = 0;
    window.addEventListener('scroll', function () {
        if (!$('body').hasClass('noscroll')) {
            scrollTop = window.scrollY;
        }
    });

    if ($('.lk__nav').length) {
        $('.header__burger-btn').on('click', function () {
            const lkNav = $('.lk__nav');
            const body = $('body');
            
            lkNav.toggleClass('lk__nav-opened');

            if (lkNav.hasClass('lk__nav-opened')) {
                body.addClass('noscroll');
                body.css('top', `-${scrollTop}px`);
            } else {
                body.removeClass('noscroll');
                window.scroll(0, scrollTop);
            }
        });

        $('.lk__nav__close').on('click', function () {
            $('.lk__nav').removeClass('lk__nav-opened');
            $('body').removeClass('noscroll');
            window.scroll(0, scrollTop);
        });
    }

    $('.lk__appointment__expand-btn').on('click', function () {
        let parent = $(this).parent();
        parent.toggleClass('expanded');
        let collapsedParts = parent.find('.lk__appointment__part:not(.lk__appointment__user, .lk__appointment__detail, .lk__appointment__diagnostics, .lk__appointment__tests)');

        if (parent.hasClass('expanded')) {
            collapsedParts.slideDown(300);
        } else {
            collapsedParts.slideUp(300);
        }
    });

    if ($('.lk__tests__form').length) {
        $('.lk__tests__form__date input[type=date]').on('change', function (e) {
            $(this).next()[0].value = e.target.value;
        });
    }
});