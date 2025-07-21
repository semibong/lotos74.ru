$(document).ready(function (){
    var arWaypoints = document.querySelectorAll('[data-wp]');

    arWaypoints.forEach((el) => {

        let classNameParent = $(el).data('wp-class');
        let childElement = $(el).data('wp-child');
        let sectionDelay = $(el).data('wp-section-delay') * 1000;

        let delay = .3;
        if ($(el).data('wp-delay') !== undefined) {
            delay = parseFloat($(el).data('wp-delay'));
        }

        new Waypoint({
            element: el,
            handler: function(direction) {

                let childs;
                if (childElement === undefined) {
                    childs = $(el).find('[data-wp-child]');
                }
                else {
                    childs = $(el).find(childElement);
                }

                let n = 0;
                $.each(childs, function (i, childElement) {
                    $(childElement).hide();
                });
                setTimeout(function () {
                    $.each(childs, function (i, childElement) {

                        let childClassName = classNameParent;
                        if ($(childElement).data('wp-class') !== undefined) {
                            childClassName = $(childElement).data('wp-class');
                        }

                        $(childElement)
                            .show()
                            .css('animation-delay', n+ 's')
                            .addClass('animate__animated animate__faster '+ childClassName);

                        n+= delay;
                    });
                },$(el).data('wp-section-delay') !== undefined ? sectionDelay : 0);
            },

            offset: '100%'
        })
    });
});