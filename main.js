/* globals jQuery:false, Markdown: false, document: false*/
(function ($) {
    "use strict";
    if (!$) {
        return console.err("Semantic Markdown Editor requires jQuery");
    }
    $.fn.setupEditor = function (content) {
        var html = "<div id=\"wmd-button-bar\"></div>\n<div class=\"wmd-panel input-panel\">\n  <textarea class=\"wmd-input\" id=\"wmd-input\">\n  " + content + "\n  </textarea>\n</div>\n<div class=\"left panel\">\n  <div class=\"vertical divider\">\n    <a href=\"#\" id=\"collapse\">\n    <i class=\"right circular arrow icon\"></i>\n    </a>\n  </div>\n  <div id=\"wmd-preview\" class=\"wmd-panel wmd-preview\">\n  </div>\n</div>";
        $(this).html(html);
        var editor1 = new Markdown.Editor(Markdown.getSanitizingConverter());
        $('.divider').css('top', $(this).height() / 2 + $(this).offset().top);
        editor1.run();
        $(document).ready(function () {

            var $input = $('.wmd-input');
            var $preview = $('.wmd-preview');
            $input.scroll(function () {
                var percentage = $input.get(0).scrollTop / ($input.get(0).scrollHeight - $input.get(0).offsetHeight);
                $preview.scrollTop(percentage * ($preview.get(0).scrollHeight - $preview.get(0).offsetHeight));
            });
            $('#collapse').on('click', function (e) {
                e.preventDefault();
                if (!$('i.arrow.icon').hasClass('spinned')) {
                    $('.left.panel').animate({
                        width: '0px'
                    }, 750);
                    $('.input-panel').animate({
                        width: '98%'
                    }, 750);
                    $('.divider').animate({
                        left: '98%'
                    }, 750);
                    $('i.arrow.icon').addClass('spinned');
                } else {
                    $('.left.panel').animate({
                        width: '50%'
                    }, 750);
                    $('.divider').animate({
                        left: '50%'
                    }, 750);
                    $('.input-panel').animate({
                        width: '48%'
                    }, 750);
                    $('i.arrow.icon').removeClass('spinned');
                }
            });
        });
    };

})(jQuery);
