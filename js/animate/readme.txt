Скрипт автоматизации анимации контента.

Подключение в Html.
<link rel="stylesheet" href="js/animate/css/animate.min.css">
<script src="js/animate/js/noframework.waypoints.min.js"></script>
<script src="js/animate/animate.js"></script>

Подключение в 1С-Битрикс.
Asset::getInstance()->addCss(SITE_TEMPLATE_PATH.'/js/animate_content/css/animate.min.css');
Asset::getInstance()->addJs(SITE_TEMPLATE_PATH.'/js/animate_content/js/noframework.waypoints.min.js');
Asset::getInstance()->addJs(SITE_TEMPLATE_PATH.'/js/animate_content/animate.js');

Установка data-атрибутов
Блок, который нужно анимировать, прописываем атрибут [data-wp], например:

<section class="program" data-wp data-wp-delay=".2" data-wp-class="animate__fadeInBottomLeft" data-wp-child="li">
    <img src="..." alt="" class="program__bg" loading="lazy" >
    <div class="program__content">
        <h2 class="program__title h1">Моя программа &quot;Спит сам&quot;</h2>
        <p class="program__description">Старт 13.11.2023<br>Продолжительность 4 недели<br>Формат: уроки в записи/ онлайн-встречи/ практика</p>
        <ul>
            <li>Текст 1</li>
            <li>Текст 1</li>
            <li>Текст 1</li>
            <li>Текст 1</li>
        </ul>
        <a href="#" data-wp-child class="program__link">Крепкий сон - счастливая семья! →</a>
    </div>
</section>

[data-wp-child] - внутри [data-wp], означает что при появлении блока на экране, по очереди будут появляться блоки с атрибутом [data-wp-child].
[data-wp-class] - это тип анимации, с которой будет появляться блок. Список всех анимаций можно посмотреть тут: https://animate.style/
[data-wp-delay] - время задержки для всех элементов в блоке
[data-wp-child] - css-селектор потомков, которые следует анимаировать