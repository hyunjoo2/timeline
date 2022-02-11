
$(document).ready(function () {
	$(".u-page-breadcrumb__item--mobile-hide").click(function(){
		$('.u-page-list--depth1').toggleClass("is-over");
		$(this).toggleClass("is-over");
		
	});
	$(".u-page-breadcrumb__item--last").click(function(){
		$('.u-page-list--depth2').toggleClass("is-over");
		$(this).toggleClass("is-over");
	});
});







