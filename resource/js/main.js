/* 메인 비주얼 슬라이드 */
$(document).ready(function () {
	//initialize swiper when document ready
	var mySwiper = new Swiper('.swiper-container .main', {
		// Optional parameters
		direction: 'horizontal',
		loop: true,

		// If we need pagination
		pagination: {
			el: '.swiper-pagination',
		},

		// Navigation arrows
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},

	})
});

/* 국내외 포럼 슬라이드 */
$(document).ready(function () {
	
	var mySwiper = new Swiper('.swiper-container.forum', {
		/*slidesPerView: 3,*/
		spaceBetween: 25,
		loop: true,
		breakpoints: {
			500: {
			  slidesPerView: 3,
			  spaceBetween: 10,
			},
		}

	})
	
	
});

/* 미세먼지 법령 및 정책 */
$(document).ready(function () {
	
	var mySwiper = new Swiper('.swiper-container.dust', {

		spaceBetween: 25,
		loop: true,
		breakpoints: {
		501: {
			  slidesPerView: 2,
			},
			500: {
			  slidesPerView: 1,
			  spaceBetween: 10,
			},
		}

	})
	
	
});

/* 주요보고서 */
$(document).ready(function () {
	
	var mySwiper = new Swiper('.swiper-container.report', {
		spaceBetween: 25,
		loop: true,
		breakpoints: {
		501: {
			  slidesPerView: 2,
			},
			500: {
			  slidesPerView: 1,
			  spaceBetween: 10,
			},
		}

	})
	
	
});




