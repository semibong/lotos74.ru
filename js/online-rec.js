$(document).ready(function () {
    if ($('.online-rec__find__select').length) {
        $('.online-rec__find__select>select').select2({
            width: 'element',
            language: {
                errorLoading: function () {
                return 'Результаты не могут быть загружены.';
                },
                inputTooLong: function (args) {
                return 'Пожалуйста, удалите ' + args.input.length + ' символ(ов)';
                },
                inputTooShort: function (args) {
                return 'Пожалуйста, введите ' + (args.minimum - args.input.length) + ' или более символов';
                },
                loadingMore: function () {
                return 'Загрузка данных…';
                },
                maximumSelected: function (args) {
                return 'Вы можете выбрать не более ' + args.maximum + ' элемент(ов)';
                },
                noResults: function () {
                return 'Ничего не найдено';
                },
                searching: function () {
                return 'Поиск…';
                }
            }
        });
    }

    if ($('.online-rec__calendar').length) {
        $.datepicker.regional['ru'] = {
            closeText: 'Закрыть',
            prevText: 'Предыдущий',
            nextText: 'Следующий',
            currentText: 'Сегодня',
            monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
            monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн','Июл','Авг','Сен','Окт','Ноя','Дек'],
            dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
            dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
            dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
            weekHeader: 'Не',
            dateFormat: 'dd.mm.yy',
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ''
        };
        $.datepicker.setDefaults($.datepicker.regional['ru']);
        $('#online-rec-datepicker').datepicker({
            beforeShowDay: function (date) {
                let dateToCheck = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                let activeDates = [
                    new Date(2025, 9, 1),
                    new Date(2025, 9, 2),
                    new Date(2025, 9, 3),
                    new Date(2025, 9, 4),
                    new Date(2025, 9, 5),
                    new Date(2025, 9, 7),
                    new Date(2025, 9, 8),
                    new Date(2025, 9, 16),
                    new Date(2025, 9, 17),
                    new Date(2025, 9, 18),
                ];

                for (let i = 0; i < activeDates.length; i++) {
                    if (dateToCheck.getTime() === activeDates[i].getTime()) {
                        return [true, ''];
                    }
                }

                return [false, ''];
            }
        });
    }

    if ($('.online-rec__specialist').length) {
        $('.online-rec__specialist__time').on('click', function () {
            const times = $($(this).parent()[0].children);
            
            times.removeClass('active');
            $(this).addClass('active');
        });
    }

    if ($('#online-rec-modal').length) {
        $('#online-rec-modal-datepicker').datepicker({
            beforeShowDay: function (date) {
                let dateToCheck = new Date(date.getFullYear(), date.getMonth(), date.getDate());
                let activeDates = [
                    new Date(2025, 9, 1),
                    new Date(2025, 9, 2),
                    new Date(2025, 9, 3),
                    new Date(2025, 9, 4),
                    new Date(2025, 9, 5),
                    new Date(2025, 9, 7),
                    new Date(2025, 9, 8),
                    new Date(2025, 9, 16),
                    new Date(2025, 9, 17),
                    new Date(2025, 9, 18),
                ];

                for (let i = 0; i < activeDates.length; i++) {
                    if (dateToCheck.getTime() === activeDates[i].getTime()) {
                        return [true, ''];
                    }
                }

                return [false, ''];
            }
        });

        $('.online-rec__modal__change-step').on('click', function () {
            let step = $('.online-rec__modal__step.active').data('step');

            $('.online-rec__modal__step').removeClass('active');
            if (+step === 1) {
                $('.online-rec__modal__step[data-step=2]').addClass('active');
                $('.online-rec__modal .online-rec__calendar__controls').addClass('invisible');
            } else if (+step === 2) {
                $('.online-rec__modal__step[data-step=1]').addClass('active');
                $('.online-rec__modal .online-rec__calendar__controls').removeClass('invisible');
            }
        });
    }
});