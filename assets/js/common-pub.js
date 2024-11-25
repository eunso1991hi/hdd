var popName;
var lastScrollTop = 0;
var mql_mobile = window.matchMedia("screen and (max-width: 767px)");
var mql_tablet = window.matchMedia("screen and (max-width: 1023px)");
var scrollTop = 0;
var $window = $(window);
var windowHeight = $window.innerHeight();
var commonPub = {
	common : function(){

		setTimeout(function(){

			$(window).off('scroll').on('scroll',
				commonPub.optimizeAnimation(() => {
					commonPub.scrollEvent()
				})
			);

			$(window).off('resize').on('resize',
				commonPub.optimizeAnimation(() => {
					commonPub.resizeEvent();
				})
			);

			commonPub.goTop();
			commonPub.gnbFunc();
			commonPub.headerLogoLayer();

		} , 0);


		// 터치 디바이스 구분
		if (commonPub.isMobile() === true) {
			$('html').removeClass('no-touchevents').addClass('touchevents');
		}
		else {
			$('html').removeClass('touchevents').addClass('no-touchevents');
		}

	},



	// gnb
	gnbFunc : function(){

		var $menu = $('#gnb .menu');
		var $recommend = $('#gnb .menu.recommend');
		var $d1 = $('#gnb .d1_list .d1');
		var $d2 = $('#gnb .d2_list .d2');
		var timerIdFocus = '';

		// 헤더 메뉴 인터랙션
		// 마우스오버, 탭으로 헤더메뉴 포커스 이동 시 서브메뉴 레이어 노출
		if($('html').hasClass('no-touchevents')){
			$('.sub_open').on('mouseenter focusin', function() {
				$('.sub_wrapper').show();
				clearTimeout(timerIdFocus);
				}).on('mouseleave focusout', function() {
					timerIdFocus = setTimeout(function() {
						$('.sub_wrapper').hide();
				}, 100);
			});

			// $menu.on('focus mouseenter', function(){
			// 	if($(this).hasClass('recommend')){
			// 		$('.sub_wrapper').show();
			// 	}
			// 	else {
			// 		$('.sub_wrapper').hide();
			// 	}
			// });
			// $('.sub_open').on('mouseenter', function(){
			// 	$('.sub_wrapper').show();
			// }).on('mouseleave', function(){
			// 	$('.sub_wrapper').hide();
			// });
		}
		if($('html').hasClass('touchevents')){
			$recommend.on('click', function(){
				$('.sub_wrapper').toggle();
			});
		}

		// $menu.on('focus mouseenter', function(){
		// 	if($(this).hasClass('recommend')){
		// 		$('.sub_wrapper').show();
		// 	}
		// 	else {
		// 		$('.sub_wrapper').hide();
		// 	}
		// });
		///////////

		// 레이어 대분류 인터랙션

		// pc에서 대분류 마우스오버 시 서브레이어 노출
		// $d1.on('focus mouseenter', function(){
		// 	if ($window.width() >= 1024){
		// 		// console.log($window.width(), 'pc')
		// 		$('.d2_wrapper').hide();
		// 		$(this).siblings('.d2_wrapper').show();
		// 	}
		// });

		// 모바일에서는 대분류 클릭(터치) 시 서브레이어 노출
		$d1.on('focus click', function(){
			if ($window.width() < 1024){
				// console.log($window.width(), 'mobile')
				$('.d2_wrapper').hide();
				$(this).siblings('.d2_wrapper').show();
			}
		});

		// 3뎁스 메뉴 클릭 시 레이어 닫기
		// $d2.on('click', function(){
		// 	commonPub.gnbSubClose();
		// });

	},

	gnbSubClose : function(){
		$('#gnb .sub_wrapper').hide();
		$('#gnb .d2_wrapper').hide();

		if ($window.width() >= 1024){
			$('.d1_list > li').eq(0).find('.d2_wrapper').show();
		}
	},


	// 헤더 로고 레이어
	headerLogoLayer : function(){
		var headerToggleBtn = $('#header .logo_bundle .btn_toggle_gate');
		var headerBrandGate = $('#header .logo_bundle .brand_gate');

		headerToggleBtn.on('click', function(){
			if(headerToggleBtn.hasClass('on')) {
				headerToggleBtn.removeClass('on');
				headerBrandGate.removeClass('on');
			}
			else {
				headerToggleBtn.addClass('on');
				headerBrandGate.addClass('on');
			}
		})
	},


	// 헤더 스크롤 모션
	headerScrollMotion : function(){
		var _header = $('#header');
		var currentPos = $(window).scrollTop();
		var scrollHeight = $(document).height() - $(window).height() - currentPos;
		var moveDistance = currentPos - lastScrollTop;
		var scrollRange = -10;

		// ios에서 상단 바운스 대응
		if (currentPos <= 0){
			// _header.removeClass('scrollDown').removeClass('bgOn');
			_header.removeClass('scrollDown');
		}
		// ios에서 하단 바운스 대응
		else if(scrollHeight <= 100){
			_header.addClass('scrollDown');
		}
		else{
			// 아래로 스크롤
			if (moveDistance > 0){
				// console.log(moveDistance, 'down');
				_header.addClass('scrollDown');

			}
			// 위로 스크롤
			else {
				// console.log(moveDistance, 'up');
				if (moveDistance < scrollRange){
					_header.removeClass('scrollDown');
				}
			}

			// 마지막 스크롤 지점을 저장
			lastScrollTop = currentPos;
		}
	},

	//헤더 검색 레이어 오픈
	searchLayerOpen : function(){
		$('body, html').css('overflow','hidden');
		$('#header .search_layer_wrapper').fadeIn(200, function(){
			// $(this).focus();
		});

		commonPub.searchLayerFocusLoop();
	},

	//닫기 버튼 클릭시 헤더 검색 레이어 닫기
	searchLayerClose : function(){
		$('body, html').css('overflow','');
		$('#header .search_layer_wrapper').fadeOut(200);

		// 레이어 띄운 버튼 위치로 포커스 이동
		$('#header .search_layer_open').focus();
	},

	//헤더 검색 레이어 닫기 전까지 포커스 루프 적용
	searchLayerFocusLoop : function(){
		$(document).on('keydown', function(e){

			var focused = document.activeElement.id;
			if (e.keyCode === 9) {

				// SHIFT + TAB
				if (e.shiftKey) {
					if (focused === 'focus-start') {
						e.preventDefault();
						$('#header .search_layer_close').focus();
					}
				}
				// TAB
				else {
					if (focused === 'focus-end') {
						e.preventDefault();
						$('#header .search_layer_wrapper').focus();
					}
				}
			}
		});
	},



	scrollEvent : function(){
		var floatingBtns = $('#pageTop, #pageShortcut');

		// bottom fixed 요소 푸터위에 고정
		var scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop();

		if (scrollBottom >= $('#footer').innerHeight()){
			floatingBtns.removeClass('meetFooter');
		}else {
			floatingBtns.addClass('meetFooter');
		}

		// 브라우저 높이만큼 스크롤 시 bottom fixed 요소 노출
		// var win_h = $(window).height();
		// var floatingPoint = win_h;
		// if ($(window).scrollTop() > floatingPoint) {
		// 	$('#pageTop').fadeIn();
		// } else {
		// 	$('#pageTop').fadeOut();
		// }

		commonPub.headerScrollMotion();
	},

	resizeEvent : function(){
		if($window.width() >= 767){
			page.product.recKeywordOpen();
		}
		else {
			page.product.recKeywordClose();
		}

		// 리사이즈할 때 팝업이 브라우저 상,하단을 벗어나는 경우 상단 위치 고정.
		this.setLayerPopHeight(popName);

	},


	// custom select
	customSelectbox : function(){
		var globalSelect = $('.g_select');
		var globalSelectInner = globalSelect.find('.g_select_inner');

		globalSelectInner.selectmenu({
			classes: {
				"ui-selectmenu-button": "g_select_button",
				"ui-selectmenu-icon": "g_select_icon",
				"ui-selectmenu-text": "g_select_text",
				"ui-selectmenu-menu": "g_select_menu"
			},

			appendTo : globalSelect,
		});

		globalSelect.find('.g_select_button').on("focus click", function(){
			globalSelectInner.selectmenu("open");
		});
	},

	// 팝업 오픈
	modalPopCall : function(target, el){
		$('body, html').css('overflow','hidden');
		popName = target;
		// console.log(popName)
		$('.popup_ui.'+ popName).fadeIn(200, function(){
			$(this).addClass('active');
			// tabindex 속성 추가
			$(this).attr('tabindex','0').focus();
		})

		commonPub.setLayerPopHeight(popName);

		// 레이어팝업 닫은 후 포커스를 원래 위치로 이동시키기 위하여 팝업 띄운 위치 지정
		$(el).addClass('focus-on');
		commonPub.popFocusLoop();

		commonPub.popDimClick(popName);

		// 리사이즈할 때 팝업이 브라우저 상,하단을 벗어나는 경우
		// 상단에 고정시키기 위해 팝업 네임 리턴.
		return popName;
	},

	// 팝업 닫기 전까지 포커스 루프 적용.
	popFocusLoop : function(){
		$(document).on('keydown', function(e){

			var focused = document.activeElement.id;
			if (e.keyCode === 9) {

				// SHIFT + TAB
				if (e.shiftKey) {
					if (focused === 'focus-start') {
						e.preventDefault();
						$('.btn_pop_close').focus();
					}
				}
				// TAB
				else {
					if (focused === 'focus-end') {
						e.preventDefault();
						$('.pop_container').focus();
					}
				}
			}
		});
	},

	// 팝업 닫기 버튼 클릭시 해당 팝업 닫기
	layerPopClose : function(_this){
		$(_this).closest('.popup_ui').fadeOut(200, function(){
			$(this).removeClass('active');
			if (!$('.popup_ui').hasClass('active')) {
				$('body, html').css('overflow','');
				// ScrollTrigger.refresh(true);
			}
			// tabindex 속성 삭제
			$(this).removeAttr('tabindex');
		});

		// 팝업 띄운 버튼 위치로 포커스 이동
		// 팝업이 2개 이상인 경우 갯수를 구해서 제일 상위부터 적용.
		var popLength = $('.focus-on').length;
		var popIdx = popLength - 1;

		$('.focus-on').eq(popIdx).focus();
		setTimeout(function(){
			$('.focus-on').eq(popIdx).removeClass('focus-on');
		},100);
	},

	// 팝업 dim 클릭시 닫기
	popDimClick : function(popName) {
		$('.popup_ui.'+ popName).on('click', function (e) {
			if ($('.pop_container').has(e.target).length === 0) {
				$(this).fadeOut(200, function(){
					$(this).removeClass('active');
					if (!$('.popup_ui').hasClass('active')) {
						$('body, html').css('overflow','');
					}
					// tabindex 속성 삭제
					$(this).removeAttr('tabindex');
				});

				// 팝업 띄운 버튼 위치로 포커스 이동
				// 팝업이 2개 이상인 경우 갯수를 구해서 제일 상위부터 적용.
				var popLength = $('.focus-on').length;
				var popIdx = popLength - 1;

				$('.focus-on').eq(popIdx).focus();
				setTimeout(function(){
					$('.focus-on').eq(popIdx).removeClass('focus-on');
				},100);
			}
		});
	},

	// popDimClick : function() {
	// 	$(".popup_ui").on('click', function (e) {
	// 		if ($(".pop_container").has(e.target).length === 0) {
	// 			$(this).fadeOut(200, function(){
	// 				$(this).removeClass('active');
	// 				if (!$('.popup_ui').hasClass('active')) {
	// 					$('body, html').css('overflow','');
	// 				}
	// 			});
	// 		}
	// 	});
	// },

	// 팝업이 브라우저보다 작을 때 가운데 노출
	setLayerPopHeight : function(popName){
		var winHeight = $(window).height();
		var popHeight = $('.popup_ui.'+ popName + ' .pop_layer').innerHeight();
		var popHeightHalf = parseInt(popHeight/2);
		// console.log(popHeight)
		if (popHeight + 100 < winHeight){
			// console.log(winHeight, popHeight, popName);
			$('.popup_ui.'+ popName +' .pop_layer').css({
				'left':'50%',
				'top':'50%',
				'transform':'translateX(-50%)',
				'margin-top': -popHeightHalf + 'px',
			});
		}
		else {
			$('.popup_ui.'+ popName +' .pop_layer').css({
				'left':'50%',
				'top':'50px',
				'transform':'translateX(-50%)',
				'margin-top': '0px',
				'transition':'0.3s'
			});
		}
	},




	goTop : function(){
		$('.btn_top').off('click').on('click', function () {
			$('body,html').animate({scrollTop: 0}, 300);
			return false;
		});
	},

	isMobile : function(){
		var UserAgent = navigator.userAgent;

		if (UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null)
		{
			return true;
		}else{
			return false;
		}
	},

	optimizeAnimation : function(callback) {
		let ticking = false;

		return () => {
			if (!ticking) {
				ticking = true;
				requestAnimationFrame(() => {
					callback();
					ticking = false;
				});
			}
		};
	},

}