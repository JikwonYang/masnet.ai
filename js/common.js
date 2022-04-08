/* GNB */
function setCookie(name, value, expiredays) {
	var today = new Date();
	today.setDate(today.getDate() + expiredays);
	document.cookie = name + '=' + escape(value) + '; path=/; expires=' + today.toGMTString() + ';';
}

function getCookie(name) {
	var cName = name + '=';
	var x = 0;
	var i = 0;
	while (i <= document.cookie.length) {
		var y = (x + cName.length);
		if (document.cookie.substring(x, y) == cName) {
			if ((endOfCookie = document.cookie.indexOf(';', y)) == -1)
				endOfCookie = document.cookie.length;
			return unescape(document.cookie.substring(y, endOfCookie));
		}
		x = document.cookie.indexOf(' ', x) + 1;
		if (x == 0)
			break;
	}
	return '';
}

$(function() {
	if (getCookie('notToday') != 'Y') {
		if ($('body').hasClass('main') == true) {
			if($('.top-banner').length > 0)
				$('body').addClass('pushed');
		}
		$('.top-banner').addClass('expanded');
	} else {
		if ($('body').hasClass('main') == true) {
			$('body').removeClass('pushed');
		}
		$('.top-banner').removeClass('expanded');
	}

	$('.top-banner .banner-slide').slick({
		dots: true,
		arrows: true,
		fade: true,
		autoplay:true,
		autoplaySpeed:3500,
	});
	var btn_play_toggle = $('<button class="btn-play-toggle pause"></button>').insertBefore('.top-banner .slick-dots');
	var slide_play_status = 'play';
	btn_play_toggle.on('click',function(){
		$(this).toggleClass('pause');
		if(slide_play_status == 'play'){
			slide_play_status == 'pause';
			$('.top-banner .banner-slide').slick('slickSetOptionset',{autoplay:false});
		}else{
			slide_play_status == 'play';
			$('.top-banner .banner-slide').slick('slickSetOptionset',{autoplay:3500});
		}
	});

	function convert_util_icons(device_statue) {
		var icon_type = '.png';
		if (device_statue == 'mobile') {
			$('.header .util .social img').each(function() {
				var current_src = $(this).attr('src');
				var icon_src;
				if (current_src.indexOf('-white') != -1) {
				} else {
					icon_src = current_src.split(icon_type)[0] + '-white' + icon_type;
				}
				$(this).attr('src', icon_src);
			});
		} else {
			$('.header .util .social img').each(function() {
				var current_src = $(this).attr('src');
				var icon_src;
				if (current_src.indexOf('-white') != -1) {
					icon_src = current_src.split(icon_type)[0].split('-white')[0] + icon_type;
				} else {
				}
				$(this).attr('src', icon_src);
			});
		}
	}

	function check_gnb_status() {
		if ($(window).width() > 992 && $('.gnb').hasClass('mobile-menu') == false) { //pc to pc
			$('.gnb').removeClass('mobile-menu','subBg');
			convert_util_icons('pc');
		} else if ($(window).width() > 992 && $('.gnb').hasClass('mobile-menu') == true) { //mo to pc
			$('.gnb').removeClass('mobile-menu');
			$('.gnb li').removeClass('on');
			convert_util_icons('pc');
		} else if ($(window).width() <= 992 && $('.gnb').hasClass('mobile-menu') == false) { //pc to mo
			$('.gnb').addClass('mobile-menu');
			$('.gnb li').removeClass('on');
			convert_util_icons('mobile');
		} else { //mo to mo
			$('.gnb').addClass('mobile-menu');
			convert_util_icons('mobile');
		}
	}
	check_gnb_status();
	$(window).resize(function() {
		check_gnb_status();
	});

	function check_window_scroll_top() {
		if ($('.wrapper').scrollTop() > 0) {
			$('body').addClass('scrolled');
		} else {
			$('body').removeClass('scrolled');
		}
	}

	check_window_scroll_top();
	$('.wrapper').scroll(function() {
		check_window_scroll_top();
	});

	function close_side_menu() {
		$('.header').removeClass('expanded');
		$('body').removeClass('modal-open');
	}

	function open_side_menu() {
		$('.header').addClass('expanded');
		$('body').addClass('modal-open');
	}
	$('.header .btnMenu').on('click', function() {
		open_side_menu();
	});
	$('.headerBottom').on('click', function(event) {
		if ($('.header').hasClass('expanded') == true && $(event.target).hasClass('headerBottom') == true || $('.header').hasClass('expanded') == true && $(event.target).hasClass('btnMenuClose') == true) {
			close_side_menu();
		}
	});

	$(".gnb").mouseenter(function(){
		$('.headerBottom').addClass('on');
		$('.headerBottom').children('.subBg','.mask').show();
	});

	$(".gnb").mouseleave(function(){
		$('.headerBottom').removeClass('on');
		$('.headerBottom').children('.subBg','.mask').hide();
	});

    $('.gnb > ul > li > a').on('click', function() {
    	if ($('.gnb').hasClass('mobile-menu') == true) { //mo
    		if ($(this).parent().find('ul').length > 0) {
    			$('.gnb > ul > li').removeClass('on');
    			$(this).parent().addClass('on');
    		} else {
    			location.href = $(this).attr('href');
    		}
    		return false;
    	}
    });

    
});
/* //GNB */



/* 메인 롤링배너 */
$(document).ready(function(){
    var mainVisual = $('.visualSlide').slick({
        dots: true,
        dotsClass: 'visualDots',
        touchMove: false,
        draggable: false,
        arrows: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4000
    });

    var currentIndex = ($('.visualSlide').slick('slickCurrentSlide'));
    setTimeout(function(){
        $('.slick-slide').eq(currentIndex+1).addClass('ts');
    }, 100);


    $('.visualSlide').on('afterChange', function(event, slick, currentSlide, nextSlide){
        $('.slick-slide').removeClass('ts').eq(currentSlide+1).addClass('ts');
    });

    $('.visualDots').children('li:last').after('<li class="playSetup"><button type="button">멈춤</button></li>')

    $('.mainVisualArea').mousemove(function(e){
        $('.visualMove > span').parallax(-25,e);
    });

    $('.playSetup > button').click(function(){
        if($(this).hasClass('play')){
            mainVisual.slick('slickPlay');
            $(this).removeClass('play').addClass('stop').text('멈춤');
        } else {
            mainVisual.slick('slickPause');
            $(this).removeClass('stop').addClass('play').text('재생');
        }
    });

    var innoMain = $('.innoSlideMain').slick({
        fade: true,
        speed: 1000,
        slidesToshow: 1,
        slidesToScroll: 1,
        dots: false,
        touchMove: false,
        draggable: true,
        arrows: true,
        infinite: true,
        autoplay: false,
        asNavFor: '.innoSlideRolling',
        prevArrow: $('.btnSlideArea > .btnPrev'),
        nextArrow: $('.btnSlideArea > .btnNext'),
        rtl: true
    });

    var innoRolling = $('.innoSlideRolling').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        speed: 500,
        asNavFor: '.innoSlideMain',
        dots: false,
        touchMove: false,
        draggable: false,
        arrows: false,
        infinite: true,
        autoplay: false,
        focusOnSelect: true,
        variableWidth: true,
        rtl: true
    });

    mainVisualImage();

    $(window).resize(function(){
        mainVisualImage();
    });

    sub.gridList();

    viewScroll('innovativeArea', 0.15);
    viewScroll('networkArea', 0.5);
    viewScroll('companyArea', 0.7);
});

/* 메인 롤링 배너 비쥬얼 이미지 */
var mainVisualImage = function(){
    var visual  = $('.visualMove');
    var bgImg = visual.children('span');
    
    visual.css({width:$(window).width()+'px', height: $(window).height()+'px'});
    bgImg.css({width:($(window).width()+200)+'px', height: ($(window).height()+200)+'px'});
}


/* section1 롤링배너 */
$(document).ready(function(){
	var nowNum = 0;
	var bannerObj = $('.slideSec01 li'); // 클래스 네임 설정
	var maxLength = bannerObj.length;
	var timer = 4000; // 자동 롤링되는 타임 설정
	var autoRun = setInterval(function(){rollingFn('right');},timer);
	bannerObj.eq(nowNum).fadeIn();
	$('.nextBtn').bind('click',function(){
		rollingFn('right');
	});
	$('.prevBtn').bind('click',function(){
		rollingFn('left');
	});
	function rollingFn(direction){
		if(direction=='right'){
			nowNum = nowNum+1;
			if(nowNum>maxLength-1){
				nowNum = 0;
			}
		}else{
			nowNum = nowNum-1;
			if(nowNum<0){
				nowNum = maxLength-1;
			}
		}
		bannerObj.hide().eq(nowNum).fadeIn();
	}
})


/* section2 롤링배너 */
$(document).ready(function(){
	var nowNum = 0;
	var bannerObj = $('.slideSec02 li'); // 클래스 네임 설정
	var maxLength = bannerObj.length;
	var timer = 3000; // 자동 롤링되는 타임 설정
	var autoRun = setInterval(function(){rollingFn('right');},timer);
	bannerObj.eq(nowNum).fadeIn();
	$('.nextBtn').bind('click',function(){
		rollingFn('right');
	});
	$('.prevBtn').bind('click',function(){
		rollingFn('left');
	});
	function rollingFn(direction){
		if(direction=='right'){
			nowNum = nowNum+1;
			if(nowNum>maxLength-1){
				nowNum = 0;
			}
		}else{
			nowNum = nowNum-1;
			if(nowNum<0){
				nowNum = maxLength-1;
			}
		}
		bannerObj.hide().eq(nowNum).fadeIn();
	}
})


/* gnb 스크롤시 변경 */
$(function(){
	var rollHeader = 10; // 시작위치설정
	$(window).scroll(function() {
		var scroll = getCurrentScroll();
		if ( scroll >= rollHeader ) {
			$('.headerWrap').addClass('roll');
			}
			else {
				$('.headerWrap').removeClass('roll');
			}
	});
	function getCurrentScroll() {
		return window.pageYOffset || document.documentElement.scrollTop;
		}
	});


/* 스크롤 smooth */
$(document).ready(function(){
	$('a[href^="#"]').on('click',function (e) {
		e.preventDefault();

		var target = this.hash;
		var $target = $(target);

		$('html, body').stop().animate({
			'scrollTop': $target.offset().top
		}, 900, 'swing', function () {
			window.location.hash = target;
		});
	});
});


