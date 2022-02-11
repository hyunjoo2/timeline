$(function () {
    fnTop();
    fnScrollDown();
    buttonClick();
})

function fnTop() {
    // if(window.innerWidth < 993) {
    //     $('html, body').animate({scrollTop : 400}, 400);
    // }
    // $('.timeline__inner').mCustomScrollbar('scrollTo', 0);
}

function fnScrollDown() {
    //스크롤 발생 이벤트 처리
    // $('#timeline').scroll(function () {
    //     var scrollT = $(this).scrollTop(); //스크롤바의 상단위치
    //     var scrollH = $(this).height(); //스크롤바를 갖는 div의 높이
    //     var contentH = $('.timeline__inner').height(); //문서 전체 내용을 갖는 div의 높이

    //     $(".timeline-button__bottom button").click(function () {
    //         $(".timeline__inner").scrollTop($(document).height());
    //     });

    //     // if(scrollT + scrollH +1 >= contentH) { // 스크롤바가 아래 쪽에 위치할 때
    //     //     $('.timeline__inner').append(imgs);
    //     // }
    // });
}

function buttonClick(){
    $(".content-right").hide();
    $(".timeline-item .button-wrap button").click(function(){
        $(".content_wrap").addClass("step2");
        $(".content-left").addClass("step2");
        $(".content-right").show();
        $(this).parents().find('.timeline-content').children().find(".timeline-item").removeClass("on");
        $(this).parents().closest('.timeline-item').addClass("on");
        
    });

    $(".btnRightSwitch button").click(function(){
        $(".content_wrap").removeClass("step2");
        $(".content-left").removeClass("step2");
        $(".content-right").hide();
    });
}

