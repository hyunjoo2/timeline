$(function () {
    buttonClick();
    fnPageResize();
    titClick();
    titColor();
    tabSelect();
    fixYear();
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
    $(".timeline-item .button-wrap button").click(function () {
        $(".content_wrap").addClass("step2");
        $(".content-left").addClass("step2");
        $(".content-right").removeClass("step1");
        $(this).parents().find('.timeline-content').children().find(".timeline-item").removeClass("on");


        var timeItem = $(this).parents().closest('.timeline-content').children();
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
        $('.timeline__inner').mCustomScrollbar('scrollTo','.timeline-content>div.on');

        
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


function fnScrollDown() {
    $('.timeline__inner').mCustomScrollbar('scrollTo', -99999999)
}
window.fnScrollDown = fnScrollDown;


function fnPageResize() {
    var innerWidth = window.innerWidth;
    if (innerWidth <= 721) {
        $('.timeline__inner').mCustomScrollbar('destroy');
        $('.tab-contents').mCustomScrollbar('destroy');
        
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
            advanced:{ 
                updateOnContentResize: true 
            },
        });
    }

    
}

// $(window).load(function () {
//     setInterval("fnPageResize()", 9000);
//     fnPageResize();
// });



$(window).resize(function () {
	var innerWidth = window.innerWidth;
	if (innerWidth <= 721) {
		$('.timeline__inner').mCustomScrollbar('destroy');
		$('.tab-contents').mCustomScrollbar('destroy');
        
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
            advanced:{ 
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
            advanced:{ 
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
    })
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



function fixYear() {
    var filter_Offset = $('.timelinePage .content_wrap .category').offset();
    $(window).scroll(function () {
        if ($(document).scrollTop() > filter_Offset.top) {
            $('.timelinePage .content_wrap').addClass('fix');
        } else {
            $('.timelinePage .content_wrap').removeClass('fix');
        }
    });
}