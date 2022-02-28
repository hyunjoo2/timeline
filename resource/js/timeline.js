$(function () {
	titColor(); //cateTit 색상 변경
	fnTop();
	fnScrollDown();
	buttonClick();
	titClick();
	tabSelect();
	//clickboardList();
	fixYear();
	fnPageResize();
})

var timer = null;
$(window).on('resize', function() {
	
});

$(document).ready(function() {
		
	// let dep1 = '';
	// let dep2 = '';
	// let dep3 = '';
	
	// if ( dep1 != '' && dep2 != '' && dep3 != '' ) fnSetReSearchCode(dep1, dep2, dep3,'N' ,'them', 'N');
	
	// $('[data-toggle="tooltip"]').tooltip();
	
	// var windowHeight = $(window).height();
	// $('.content-timeline').css({
	// 	height: windowHeight + 50
	// });
	var windowHeight = $(window).height();
	$("#timeline").css({
		height: windowHeight + 50
	});
	
	clearTimeout(timer);
	timer = setTimeout(fnPageResize, 300);

	$('.timeline__inner').mCustomScrollbar({
		theme: 'minimal-dark',
		mouseWheel: {
			scrollAmount: 400
		},
		//scrollInertia : 400,                        
		callbacks: {
			onInit: function () {
				$('.timeline__inner').mCustomScrollbar('scrollTo', 0);
			}
		},
		alwaysTriggerOffsets: false
	});
	// $(".tab-contents").mCustomScrollbar({
	// 	theme: "minimal-dark",
	// 	mouseWheel: {
	// 		scrollAmount: 400
	// 	},
	// 	callbacks: {
	// 		onInit: function () {
	// 			$('.content-right').mCustomScrollbar('scrollTo', 0);
	// 		}
	// 	}
	// });
	
// 	$(".left_wrap .scroll_area").mCustomScrollbar({
// 		theme: "minimal-dark",
// 		mouseWheel: { scrollAmount: 400 },
// 		callbacks:{
// 			onInit:function() {
// 				var tempId = $(this).find('div').first().attr('id');
// //                     $('#' + tempId + '_dragger_vertical').css('width', '20px');
// //                     $('#' + tempId + '_dragger_vertical').css('left', '1px');
// //                     $('.scroll_area.mCustomScrollbar').first().css('width', '98%');
// 			},
// 			onScrollStart:function(){
				
// 			},
// 			onScroll:function(){
// 			},
// 			onTotalScroll:function() {
// 			},
// 			onTotalScrollBack:function(){
// 			}
// 		}
// 	});
	
	// 타임 라인 스크롤
	// $('.center_wrap .scroll_area').mCustomScrollbar({
	// 	theme: "minimal-dark",
	// 	mouseWheel: { scrollAmount: 400 },
	// 	callbacks:{
	// 		onInit:function() {
	// 		},
	// 		onScrollStart:function(){
	// 		},
	// 		onScroll:function(){
	// 		},
	// 		onTotalScroll:function() {
	// 			fnSearchTimeLinePaging(glReltThemCd, $('#ORDER_TXT').val());
	// 		},
	// 		onTotalScrollBack:function(){
	// 		}
	// 	}
	// });
	
	// 1레벨 주제
	// $('#timeline .tree_depth_1>li>a').click(function(e) {
	// 	var target = $(e.target);
	// 	var targetSub = target.parent();
	// 	if(target.hasClass('curout') || targetSub.hasClass('curout')) {
	// 		return false;
	// 	} else {
	// 		$(this).parent('li').siblings('li').removeClass('on');
	// 		$('#timeline .tree_depth_2>li').removeClass('on');
	// 		fnPoint();
	// 		$(this).parent('li').addClass('on').find('.tree_depth_2').slideToggle(300);
	// 	}
	// });
	
	
});

function titColor() {
	$(".timeline-content>div.ovr a, .timeline-content>div.ovr button").click(function () {
		$(this).parents().find(".content-left").next().children(".cateTit").removeClass("dom").addClass("ovr");
	});
	$(".timeline-content>div.dom a, .timeline-content>div.dom button").click(function () {
		$(this).parents().find(".content-left").next().children(".cateTit").removeClass("ovr").addClass("dom");
	})
}

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
		//scoll top 조정
		// $(".timeline__inner").mCustomScrollbar({
		// 	callbacks:{
		// 		onOverflowYNone:function(){
		// 			$(".timeline__inner").children().find(".mCSB_container").addClass("vcenter");
		// 		},
		// 		onOverflowY:function(){
		// 			$(".timeline__inner").children().find(".mCSB_container").removeClass("vcenter");
		// 			$(".timeline__inner").mCustomScrollbar("scrollTo","top",{scrollInertia:0,timeout:0,callbacks:false});
		// 		}
		// 	}
		// });

	




	//
	var divOvr = $(this).parents().closest('.timeline-item').parent();
	if ($(divOvr).hasClass("ovr")) {
		$(".step2 .category__inner >div.ovr").addClass("active");
		$(".step2 .category__inner >div.dom").removeClass("active");

		// $(".step2 .timeline-content>div.ovr").parent().show();
		// $(".step2 .timeline-content>div.dom").parent().hide();
	} else {
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

	$(".category__inner>div").click(function () {


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
	$(".timeline-content>div").removeClass("on");
});
}


// title 클릭
function titClick(){
	var titC = $(".timeline-content>div .tit a");
	var titCParents = $(titC).parents().closest('.timeline-content');
	$(titC).click(function(){
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



// 모바일일 경우 시계열 선택시 스크롤 이동
// function fnMobileScroll(){
// 	var innerWidth = window.innerWidth;
// 	if(innerWidth <= 992){
// 	    var scrollPosition = $("#nonEmptyDiv").offset().top;
// 		$("html, body").animate({
// 			scrollTop : scrollPosition
// 		});
// 	}
// }

function fnScrollDown() { $('.timeline__inner').mCustomScrollbar('scrollTo', -99999999) }
    window.fnScrollDown = fnScrollDown;

function fnPageResize() {
	// $('.timeline-button__bottom button').on('click', function () {
	// 	//$('.timeline__inner').mCustomScrollbar("update");

		

	// 	$('.timeline__inner').mCustomScrollbar('scrollTo', -9999999999999);


	// });

	var innerWidth = window.innerWidth;
	if (innerWidth <= 721) {
		$('.timeline__inner').mCustomScrollbar('destroy');
		$('.tab-contents').mCustomScrollbar('destroy');
	} else {
		// $('.timeline__inner').mCustomScrollbar({
		// 	theme: 'minimal-dark',
		// 	mouseWheel: {
		// 		scrollAmount: 400
		// 	},
		// 	//scrollInertia : 400,                        
		// 	callbacks: {
		// 		onInit: function () {
		// 			$('.timeline__inner').mCustomScrollbar('scrollTo', 0);
		// 		}
		// 	},
		// 	alwaysTriggerOffsets: false
		// });
		$(".tab-contents").mCustomScrollbar({
			theme: "minimal-dark",
			mouseWheel: {
				scrollAmount: 400
			},
			callbacks: {
				onInit: function () {
					$('.content-right').mCustomScrollbar('scrollTo', 0);
				}
			}
		});
	}
}

// $(window).load(function(){
//     setInterval("fnPageResize()",9000);
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
				scrollAmount: 400
			},
			//scrollInertia : 400,                        
			callbacks: {
				onInit: function () {
					$('.timeline__inner').mCustomScrollbar('scrollTo', 0);
				}
			}
		});
		$(".tab-contents").mCustomScrollbar({
			theme: "minimal-dark",
			mouseWheel: {
				scrollAmount: 400
			},
			callbacks: {
				onInit: function () {
					$('.content-right').mCustomScrollbar('scrollTo', 0);
				}
			}
		});
	}
});