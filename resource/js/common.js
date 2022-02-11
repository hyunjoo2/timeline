
$(function(){

	//  햄버거 메뉴  ////////////////////////////
	var hamWidth = $(".hamNavibar").width();
	var hamSt = 0;
	$("#ham").click(function(){
        $(this).toggleClass("on");
		if(hamSt===0){
			/*$("span",this).eq(0).animate({
				rotate:"45deg",
				top:"10px"
			},200);
			$("span",this).eq(1).animate({
				width:"0px",
				left:"16px"
			},200);
			$("span",this).eq(2).animate({
				rotate:"-45deg",
				top:"10px"
			},200);*/
			
			$(".hamNaviBg").show();
			$(".hamNavibar").stop();
			$(".hamNavibar").animate({right:"0"},300);	

			hamSt=1;
		}		
		else if(hamSt===1){
//			$("span",this).eq(0).animate({
//				rotate:"0deg",
//				top:"0px"
//			},200);
//			$("span",this).eq(1).animate({
//				width:"24px",
//				left:"0px"
//			},200);
//			$("span",this).eq(2).animate({
//				rotate:"0deg",
//				top:"20px"
//			},200);

			$(".hamNaviBg").hide();
			$(".hamNavibar").stop();
			$(".hamNavibar").animate({right:"-600px"},300);
			hamSt=0;
		}
	});
	$(".hamNaviBg").click(function(){
		
		if(hamSt===1){
			$(".ham span").eq(0).animate({
				rotate:"0deg",
				top:"0px"
			},200);
			$(".ham span").eq(1).animate({
				width:"24px",
				left:"0px"
			},200);
			$(".ham span").eq(2).animate({
				rotate:"0deg",
				top:"20px"
			},200);

			$(".hamNaviBg").hide();
			$(".hamNavibar").stop();
			$(".hamNavibar").animate({right:-hamWidth},300);
			hamSt=0;
		}
	});


}); 


$(function(){
	$('#ham').click(function(){
		$(".hamWrap2").toggleClass('Fixed');
	})
	$('.click1').click(function(){
		$('.child').toggle('display','block')
	})
	$('.click2').click(function(){
		$('.child').toggle('display','block')
	})
	
});

$(function() {
	$(".click").click(function() {
		$(".child").slideUp();
		if (!$(this).next().is(":visible")) {
			$(this).next().slideDown();
		}
	})
});





