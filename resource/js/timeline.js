$(function () {
    fnTop();
    fnScrollDown();
    buttonClick();
    tabSelect();
    //clickboardList();
    fixYear();
})

function fnTop() {
    // if(window.innerWidth < 993) {
    //     $('html, body').animate({scrollTop : 400}, 400);
    // }
    // $('.timeline__inner').mCustomScrollbar('scrollTo', 0);
}

function fnScrollDown() {
    //스크롤 발생 이벤트 처리
    $('#timeline').scroll(function () {
        var scrollT = $(this).scrollTop(); //스크롤바의 상단위치
        var scrollH = $(this).height(); //스크롤바를 갖는 div의 높이
        var contentH = $('.timeline__inner').height(); //문서 전체 내용을 갖는 div의 높이

        $(".timeline-button__bottom button").click(function () {
            $(".timeline__inner").scrollTop($(document).height());
        });

        // if(scrollT + scrollH +1 >= contentH) { // 스크롤바가 아래 쪽에 위치할 때
        //     $('.timeline__inner').append(imgs);
        // }
    });
}

function buttonClick() {
    //$(".content-right").hide();
    $(".timeline-item .button-wrap button").click(function () {
        $(".content_wrap").addClass("step2");
        $(".content-left").addClass("step2");
        $(".content-right").removeClass("step1");
        $(this).parents().find('.timeline-content').children().find(".timeline-item").removeClass("on");
        $(this).parents().closest('.timeline-content').children().addClass("on");


        //
        var divOvr = $(this).parents().closest('.timeline-item').parent();
        if($(divOvr).hasClass("ovr")){
            $(".step2 .category__inner >div.ovr").addClass("active");
            $(".step2 .category__inner >div.dom").removeClass("active");
            
            // $(".step2 .timeline-content>div.ovr").parent().show();
            // $(".step2 .timeline-content>div.dom").parent().hide();
        }else{
            $(".step2 .category__inner >div.ovr").removeClass("active");
            $(".step2 .category__inner >div.dom").addClass("active");

            // $(".step2 .timeline-content>div.ovr").parent().hide();
            // $(".step2 .timeline-content>div.dom").parent().show();
        };


        var step2 = $(".step2 .category__inner").parents(".content-left");

        // if($(step2).hasClass("step2")){
        //     $(this).children(".category__inner>div").click(function(){
        //         $(this).addClass("active");

        //     });
        // };
        
        $(".category__inner>div").click(function(){
            

            // if($(this).hasClass("active").click(function(){
            //     $(this).removeClass("active");
            // })
            // ){
                
            // }
            //$(this).siblings().removeClass("active");
            
    
            // if($(".step2 .category__inner >div.dom").hasClass("active")){
            //     $(".step2 .timeline-content>div.ovr").parent().hide();
            //     $(".step2 .timeline-content>div.dom").parent().show();
            // }else{
            //     $(".step2 .timeline-content>div.ovr").parent().show();
            //     $(".step2 .timeline-content>div.dom").parent().hide();
            // }
        });
    });

    $(".btnRightSwitch button").click(function () {
        $(".content_wrap").removeClass("step2");
        $(".content-left").removeClass("step2");
        $(".content-right").addClass("step1");
    });
}

function tabSelect() {
    var $tabButtonItem = $('#tab-button li'),
        $tabSelect = $('#tab-select'),
        $tabContents = $('.tab-contents'),
        activeClass = 'active';

    $tabButtonItem.first().addClass(activeClass);
    $tabContents.not(':first').hide();

    // button
    $tabButtonItem.find('a').on('click', function (e) {
        var target = $(this).attr('href');

        $tabButtonItem.removeClass(activeClass);
        $(this).parent().addClass(activeClass);
        $tabSelect.val(target);
        $tabContents.hide();
        $(target).show();
        e.preventDefault();
    });

    // select
    $tabSelect.on('change', function () {
        var target = $(this).val(),
            targetSelectNum = $(this).prop('selectedIndex');

        $tabButtonItem.removeClass(activeClass);
        $tabButtonItem.eq(targetSelectNum).addClass(activeClass);
        $tabContents.hide();
        $(target).show();
    });

   
}



function fixYear(){
    var filter_Offset = $('.timeline-box .year').offset();
		$(window).scroll(function() 
		{
			if ( $(document).scrollTop() > filter_Offset.top ) 
			{
			   $('.timeline-box .year').addClass('fix');
			} 
			else 
			{
			   $('.timeline-box .year').removeClass('fix');
			}
		});
}