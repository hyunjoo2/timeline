$(function () {
    buttonClick();
    fnPageResize();
    titClick();
    titColor();
    tabSelect();
    //mobileBtnfix();
})




$(function () {

    // var windowHeight = $(window).height();
    // $('.content-timeline').css({
    //     height: windowHeight - 50
    // });
    // var windowHeight = $(window).height();
    // $("#timeline").css({
    //     height: windowHeight - 50
    // });

    var position = 0;

    $('.timeline__inner').mCustomScrollbar({
        theme: 'minimal-dark',
        mouseWheel: {
            scrollAmount: 250
        },
        callbacks: {
            onInit: function () {
                $('.timeline__inner').mCustomScrollbar('scrollTo', 0);
            }
        },
        setTop: position + 'px',

    });


})


// button 클릭시 right 표출, class on
function buttonClick() {
    $(".timeline-item .button-wrap button a, .timeline-content>div .tit a").click(function () {
        $(".content_wrap").addClass("step2");
        $(".content-left").addClass("step2");
        $(".content-right").removeClass("step1");
        $(this).parents().find('.timeline-content').children().find(".timeline-item").removeClass("on");


        var timeItem = $(this).parents().closest('.timeline-content').children().not('.nodata');
        $(timeItem).addClass("on");


        $('#timeline').mCustomScrollbar('destroy');




        var divOvr = $(this).parents().closest('.timeline-item').parent();
        if ($(divOvr).hasClass("ovr")) {
            $(".step2 .category__inner >div.ovr").addClass("active");
            $(".step2 .category__inner >div.dom").removeClass("active");
        } else {
            $(".step2 .category__inner >div.ovr").removeClass("active");
            $(".step2 .category__inner >div.dom").addClass("active");
        };



        //left item 가운데 정렬
        $('.timeline__inner').mCustomScrollbar("update");
        $('.timeline__inner').mCustomScrollbar('scrollTo', '.timeline-content>div.on');


        $('.timeline__inner').mCustomScrollbar("update");


    });

    // 메인으로 돌아가는 button
    $(".btnRightSwitch button").click(function () {
        $(".content_wrap").removeClass("step2");
        $(".content-left").removeClass("step2");
        $(".content-right").addClass("step1");
        $(".timeline-content>div").removeClass("on");

        $('.timeline__inner').mCustomScrollbar("update");





    });



}

// 카테고리 tab, button click
function tabSelect() {
    var $tabButtonItem = $('#tab-button li, .timeline-item .button-wrap button'),
        $itemButton = $('.timeline-item .button-wrap button'),
        $tabTit = $('.timeline-content>div .tit'),
        $tabSelect = $('#tab-select'),
        $tabContents = $('.tab-contents'),

        activeClass = 'active';

    $tabButtonItem.first().addClass(activeClass);
    $tabContents.not(':first').hide();

    //tit
    // $tabTit.find('a').on('click', function (e) {
    //     var target = $(this).attr('href');

    //     $tabButtonItem.removeClass(activeClass);
    //     $tabButtonItem.first().addClass(activeClass);


    //     $tabButtonItem.removeClass(activeClass);
    //     $(this).parent().addClass(activeClass);
    //     $tabSelect.val(target);
    //     $tabContents.hide();
    //     $(target).show();
    //     e.preventDefault();


    // });

    

    // button
    $tabButtonItem.find('a').on('click', function (e) {
        var target = $(this).attr('href');

        $tabButtonItem.removeClass("on");
        $tabButtonItem.removeClass(activeClass);
        $(this).parent().addClass(activeClass);
        $tabSelect.val(target);
        $tabContents.hide();
        $(target).show();
        e.preventDefault();
    });

    // .timeline-item button
    $itemButton.find('a').on('click', function (e) {
        var target = $(this).attr('href'),
            tabTarget = $('#tab-button').find('a[href="' + target + '"]');

        $(tabTarget).parent('li').addClass('on');

    

    });

    // select
    // $tabSelect.on('change', function () {
    //     var target = $(this).val(),
    //         targetSelectNum = $(this).prop('selectedIndex');

    //     $tabButtonItem.removeClass(activeClass);
    //     $tabButtonItem.eq(targetSelectNum).addClass(activeClass);
    //     $tabContents.hide();
    //     $(target).show();
    // });


}






// 클릭요소 중앙정렬
function muCenter(target) {
    var snbwrap = $('.tab-button-outer .swiper-wrapper');
    var targetPos = target.position();
    var boxWidth = $('.tab-button-outer').width();
    var wrapWidth = 0;
    snbwrap.find('.swiper-slide').each(function () {
        wrapWidth += $(this).outerWidth();
    })

    var selectTargetPos = targetPos.left + target.outerWidth() / 2;
    var pos;
    if (selectTargetPos <= boxWidth / 2) {
        pos = 0

    } else if (wrapWidth - selectTargetPos <= boxWidth / 2) {
        pos = wrapWidth - boxWidth;

    } else {
        pos = targetPos.left - (boxWidth / 2) + (target.outerWidth() / 2);

    }

    if (wrapWidth > boxWidth) {
        setTimeout(function () {
            snbwrap.css({
                "transform": "translate3d(" + (pos * -1) + "px, 0, 0)",
                "transition-duration": "500ms"
            })
        }, 200);
    }
}



function fnScrollDown() {
    $('.timeline__inner').mCustomScrollbar('scrollTo', -99999999)
}
window.fnScrollDown = fnScrollDown;




function fnPageResize() {
    var innerWidth = window.innerWidth;
    if (innerWidth <= 721) {
        $('.timeline__inner').mCustomScrollbar('destroy');
        $('.tab-contents').mCustomScrollbar('destroy');
        $(".timeline-content>div .tit a, .timeline-item .button-wrap button").click(function () {
            $('html, body').animate({
                scrollTop: 300
            }, 400);
        });
        var tabSwiper = new Swiper('.tab-button-outer', {
            slidesPerView: 'auto',
            preventClicks: true,
            preventClicksPropagation: false,
            observer: true,
            observeParents: true,

        });
        var $lankTitle = $('.tab-button-outer .swiper-slide a');
        $lankTitle.click(function () {
            var target = $(this).parent();
            $lankTitle.parent().removeClass('on')
            target.addClass('on');
            muCenter(target);
        });



    } else {
        $(".tab-contents").mCustomScrollbar({
            theme: "minimal-dark",
            mouseWheel: {
                scrollAmount: 250
            },
            callbacks: {
                onInit: function () {
                    $('.content-right').mCustomScrollbar('scrollTo', 0);
                }
            },
            advanced: {
                updateOnContentResize: true
            },
        });


    }


}



$(window).resize(function () {
    var innerWidth = window.innerWidth;
    if (innerWidth <= 721) {
        $('.timeline__inner').mCustomScrollbar('destroy');
        $('.tab-contents').mCustomScrollbar('destroy');
        /*
        $(".timeline-content>div .tit a, .timeline-item .button-wrap button").click(function () {
            $('html, body').animate({
                scrollTop: 300
            }, 400);
        });
		*/

        var tabSwiper = new Swiper('.tab-button-outer', {
            slidesPerView: 'auto',
            preventClicks: true,
            preventClicksPropagation: false,
            observer: true,
            observeParents: true,

        });
        var $lankTitle = $('.tab-button-outer .swiper-slide a');
        $lankTitle.click(function () {
            var target = $(this).parent();
            $lankTitle.parent().removeClass('on')
            target.addClass('on');
            muCenter(target);
        });










    } else {
        $('.timeline__inner').mCustomScrollbar({
            theme: 'minimal-dark',
            mouseWheel: {
                scrollAmount: 250
            },
            //scrollInertia : 400,                        
            callbacks: {
                onInit: function () {
                    $('.timeline__inner').mCustomScrollbar('scrollTo', 0);
                }
            },
            advanced: {
                updateOnContentResize: true
            },
        });
        $(".tab-contents").mCustomScrollbar({
            theme: "minimal-dark",
            mouseWheel: {
                scrollAmount: 250
            },
            callbacks: {
                onInit: function () {
                    $('.content-right').mCustomScrollbar('scrollTo', 0);
                }
            },
            advanced: {
                updateOnContentResize: true
            },
        });





    }
});


function titColor() {
    $(".timeline-content>div.ovr a, .timeline-content>div.ovr button").click(function () {
        $(this).parents().find(".content-left").next().children(".cateTit").removeClass("dom").addClass("ovr");
    });
    $(".timeline-content>div.dom a, .timeline-content>div.dom button").click(function () {
        $(this).parents().find(".content-left").next().children(".cateTit").removeClass("ovr").addClass("dom");
    })
}

// title 클릭
function titClick() {
    var titC = $(".timeline-content>div .tit a");
    var titCParents = $(titC).parents().closest('.timeline-content');
    $(titC).click(function () {
        $(this).parents().closest('.timeline-content').children().addClass("on");
        $(titC).not($(this)).parents().closest('.timeline-content').children().removeClass("on");
    });

    $('.timeline__inner').mCustomScrollbar("update");
    $('.timeline__inner').mCustomScrollbar('scrollTo', '.timeline-content>div.on');





}


$(function () {
    var switchbtn = $('.btnRightSwitch').offset();
    $(window).scroll(function () {
        if ($(document).scrollTop() > switchbtn.top) {
            $('.btnRightSwitch').addClass('fix');
        } else {
            $('.btnRightSwitch').removeClass('fix');
        }
    });

})