var scrollTop = 0;
var page = {

	gate : {
		onLoad : function(){
			this.introEvent();
		},

		//인트로 애니메이션
		introEvent : function(){
			let introEventPc = gsap.matchMedia();

			introEventPc.add("(min-width: 1023px)", () => {
				gsap.registerPlugin(ScrollTrigger);

				const gateIntro = $('.gate_intro');
				const listWrap = gateIntro.find('.list_wrapper');

				const introAni = gsap.timeline({
					repeat: -1, // 무한반복
					repeatDelay: 10, // 10초 후 반복
				});

				introAni.addLabel('introAni1');
				introAni.to('body, html', { scrollTop: 0}, 'introAni1');
				introAni.to(listWrap, { y: 0, duration: 1, delay: 0.8}, 'introAni1');
				introAni.fromTo(gateIntro, { opacity: 1, display:"block"},{ opacity: 0, display:"none", duration: 0.9}, 'introAni1+=2.1');
				introAni.fromTo('body, html', { overflow: 'hidden'}, { overflow: ''}, 'introAni1+=2.4');

				//인트로 클릭시 인트로 꺼짐
				gateIntro.on('click', function(){
					$(this).addClass('click_hide').css('z-index', '1');
					$('body, html').css({'overflow' : ''});
					setTimeout(function(){
						gateIntro.removeClass('click_hide').css('z-index', '2');
					}, 3000); //애니메이션 플레이 시간
				})
			});

		}
	},
	main : {
		onLoad : function(){
			gsap.registerPlugin(ScrollTrigger);
			gsap.registerPlugin(ScrollToPlugin);

			this.headerControl();
			// this.mainMotion();
			this.mainHotGift();
			this.mainStorySlide();
			this.mainBannerType01_slide();
			this.mainBannerType02_slide();

			var targetTimer = $('.targetTimer');
			var imgMO = targetTimer.find("source");
			var imgPC = targetTimer.find("img");

			if (targetTimer.length > 0) {
				var thisDate = new Date(),
					changeDate = new Date(2024, 7, 29, 23, 59, 59);

				if(changeDate.getTime() < thisDate.getTime()){
					console.log('link change');
					targetTimer.attr("href", "https://bit.ly/3M6fbFy");
					imgMO.attr("srcset", "/assets/images/main/banner1_img2_mo_ver2.png")
					imgPC.attr("src", "/assets/images/main/banner1_img2_pc_ver2.png")
				}
			}
		},

		// 스크롤 잠금 함수
		lockScroll: function () {
			console.log('onStart')
			// lenis.stop();
			// $('html, body').addClass("noScroll")
		},

		// 스크롤 잠금 해제 함수
		unlockScroll: function () {
			console.log('onComplete')
			// lenis.start();
			// $('html, body').removeClass("noScroll")

		},

		// 메인 헤더 숨기기
		headerControl: function(){
			const showNav = gsap.from("#header", {
				yPercent: -100,
				paused: true,
				duration: 0.3
			}).progress(1);

			ScrollTrigger.create({
				start: "top top",
				end: "max",
				markers: false,
				onUpdate: (self) => {
					self.direction === -1 ? showNav.play() : showNav.reverse()
				}
			});
		},

		// 메인 모션
		mainMotion : function(){

			let breakPoint = 1080;
			let mm = gsap.matchMedia();
			let easeCubic = "cubic-bezier(.755,.05,.855,.06)";

			mm.add({
				isDesktop: `(min-width: ${ breakPoint + 1 }px)`,
				is1080: `(max-width: ${ breakPoint }px) and (min-width: 1024px)`,
				isMobile: `(max-width: 1023px)`,
				is767: `(max-width: 767px)`,
				isStandbyme: `(max-width: ${ breakPoint }px) and (min-height: 1800px)`,
			}, (context) => {

				let { isDesktop, is1080, isMobile, is767, isStandbyme } = context.conditions;

				// console.log(isDesktop ? "Desktop" : "Mobile")

				const aniIntro = gsap.timeline({
					onStart: page.main.lockScroll, // 애니메이션 시작 시 스크롤 잠금
					onComplete: page.main.unlockScroll // 애니메이션 완료 시 스크롤 잠금 해제
				});

				// const aniStory = gsap.timeline();
				// aniStory.from(".main_story .wrap_story_slide", {yPercent: 40, "--clip-right": "100%"}, "story-scene1")
				// 			.to(".main_story .section_tit", {y: -100}, "story-scene1")
				// 			.to(".main_story .section_tit", {yPercent: -100, autoAlpha: 0, overwrite: "auto"}, "story-scene2")
				// 			.to(".main_story .wrap_story_slide", {"--clip-top": 0, width: "100%", x: 0, duration: 0.5, overwrite: "auto"}, "story-scene2")
				// 			.to(".main_story .item_bg", {y: 0, duration: 0.5}, "story-scene2")
				// 			.fromTo(".main_story .bgDim", {autoAlpha: 0}, {autoAlpha: 1}, "story-scene2")
				// 			.fromTo(".main_story .storySwiperText", {autoAlpha: 0}, {autoAlpha: 1}, "story-scene2")

				// 스토리 pin
				// ScrollTrigger.create({
				// 	trigger: ".main_story",
				// 	start: "top 1px",
				// 	end: "+=200%",
				// 	pin: true,
				// 	anticipatePin: 1,
				// 	markers: false,
				// 	id: "pinStory"
				// });

				if (isDesktop) {
					console.log("isDesktop")

					// 휠 섹션이동
					// const scrollToNextSection = gsap.timeline({
					// 	scrollTrigger: {
					// 		id: "scrollToNextSection",
					// 		trigger: ".main_intro",
					// 		start: "top top",
					// 		markers: false,
					// 		onEnter: () => {
					// 			console.log("onEnter")
					// 			lenis.scrollTo('.main_story');
					// 		},
					// 		onEnterBack: () => {
					// 			// console.log("onEnterBack")
					// 			lenis.scrollTo(0);
					// 		}
					// 	}
					// });

					aniIntro.to("body, html", { scrollTop: 0})
							.to(".main_intro .wrap_bg", {"--clip-horz": "33%", ease: easeCubic, duration: 0.7, delay: 0.3}, "intro-scene1")
							.to(".main_intro .wrap_text", {width: "33%", ease: easeCubic, duration: 0.7, delay: 0.3}, "intro-scene1")
							.to(".main_intro .wrap_bg", {"--clip-horz": "0%", "--clip-vert": "0%", ease: "Power1.easeInOut", duration: 0.7, delay: 0.2}, "intro-scene2")
							.to(".main_intro .wrap_text", { autoAlpha: 0, ease: "Power1.easeInOut", duration: 0.7, delay: 0.2}, "intro-scene2")
							.to(".main_intro .wrap_content", {autoAlpha: 1, ease: "Power1.easeInOut", duration: 0.7, delay: 0.4}, "intro-scene2")
							.to(".main_intro .wrap_bg", {width: "calc(100% - 12rem)", height: "calc(100% - 21rem)", x: 60, y: 150, ease: "Power1.easeInOut", duration: 0.7}, "intro-scene3")
							.to("#header", {y: 0, ease: "Power1.easeInOut", duration: 0.7, overwrite: "auto"}, "intro-scene3")

					// 스토리 ani 실행시점
					// ScrollTrigger.create({
					// 	animation: aniStory,
					// 	trigger: ".main_story",
					// 	start: "-30% top",
					// 	toggleActions: 'play none none reverse',
					// 	markers: false,
					// 	id: "aniStory"
					// });

				}
				else if (is1080) {
					console.log("1080")
					aniIntro.to("body, html", { scrollTop: 0})
							.to(".main_intro .wrap_bg", {"--clip-horz": "33.867%", ease: easeCubic, duration: 0.7, delay: 0.3}, "intro-scene1")
							.to(".main_intro .wrap_bg", {"--clip-horz": "0%", "--clip-vert": "0%", ease: "Power1.easeInOut", duration: 0.7, delay: 0.3}, "intro-scene2")
							.to(".main_intro .wrap_text", { autoAlpha: 0, ease: "Power1.easeInOut", duration: 0.7, delay: 0.2}, "intro-scene2")
							.to(".main_intro .wrap_content", {autoAlpha: 1, ease: "Power1.easeInOut", duration: 0.7, delay: 0.4}, "intro-scene2")
							.to(".main_intro .wrap_bg", {width: "calc(100% - 12rem)", height: "calc(100% - 21rem)", x: 60, y: 150, ease: "Power1.easeInOut", duration: 0.7}, "intro-scene3")
							.to("#header", {y: 0, ease: "Power1.easeInOut", duration: 0.7, overwrite: "auto"}, "intro-scene3")

					// 스토리 ani 실행시점
					// ScrollTrigger.create({
					// 	animation: aniStory,
					// 	trigger: ".main_story",
					// 	start: "-50% top",
					// 	toggleActions: 'play none none reverse',
					// 	markers: false,
					// 	id: "aniStory"
					// });
				}
				else if (isMobile) {
					console.log("1023")
					aniIntro.to("body, html", { scrollTop: 0})
							.to(".main_intro .wrap_bg", {"--clip-horz": "33.867%", ease: easeCubic, duration: 0.7, delay: 0.3}, "intro-scene1")
							.to(".main_intro .wrap_bg", {"--clip-horz": "0%", "--clip-vert": "0%", ease: "Power1.easeInOut", duration: 0.7, delay: 0.3}, "intro-scene2")
							.to(".main_intro .wrap_text", { autoAlpha: 0, ease: "Power1.easeInOut", duration: 0.7, delay: 0.2}, "intro-scene2")
							.to(".main_intro .wrap_content", {autoAlpha: 1, ease: "Power1.easeInOut", duration: 0.7, delay: 0.4}, "intro-scene2")
							.to(".main_intro .wrap_bg", {
								x: 18,
								width: "calc(100% - 3.6rem)",
								y: is767 ? 105 : 150,
								height: is767 ? "calc(100% - 12.5rem)" : "calc(100% - 17rem)",
								ease: "Power1.easeInOut",
								duration: 0.7
							}, "intro-scene3")
							.to("#header", {y: 0, ease: "Power1.easeInOut", duration: 0.7, overwrite: "auto"}, "intro-scene3")

					// 스토리 ani 실행시점
					// ScrollTrigger.create({
					// 	animation: aniStory,
					// 	trigger: ".main_story",
					// 	start: "-50% top",
					// 	toggleActions: 'play none none reverse',
					// 	markers: false,
					// 	id: "aniStory"
					// });
				}

			});
		},

		// 메인 핫한 선물
        mainHotGift : function() {
            let hotGiftLists = document.querySelectorAll(".hot_giftList")
            let _width = window.innerWidth
            let remote
            if(_width > 767) {
                for(const list of hotGiftLists) {
					//react jquery 기능 충돌로 주석
                    // let clone = list.querySelector('ul').cloneNode(true)
                    // clone.classList.add("clone")
                    // list.appendChild(clone)
                    list.classList.add("cross")
                }
                remote = false
            } else {
                remote = true
            }
            function hotGift() {
                let _width = window.innerWidth
                if(_width > 767 && remote == true) {
                    for(const list of hotGiftLists) {
                        let clone = list.querySelector('ul').cloneNode(true)
                        clone.classList.add("clone")
                        list.appendChild(clone)
                        list.classList.add("cross")
                    }
                    remote = false
                } else if(_width <= 767 && remote == false) {
                    for(const list of hotGiftLists) {
                        const cloneList = document.querySelector(".hot-gift .clone")
                        list.classList.remove("cross")
                        if(cloneList) {
                            cloneList.remove();
                        }
                    }
                    remote = true
                }
            }
            hotGift()
            window.addEventListener("resize", function() {
                hotGift()
            })
        },

		// 메인 스토리 슬라이드
		storySwiperText : null,
		storySwiperImg : null,
		mainStorySlide : function(){
			const prevBtn = document.querySelector(".wrap_story_slide .swiper-button-prev");
    		const nextBtn = document.querySelector(".wrap_story_slide .swiper-button-next");
			const wrapPagi = document.querySelector(".wrap_story_slide .swiper-pagination");
			let slideSpeed = 700;

			this.storySwiperImg = new Swiper(".storySwiperImg", {
				speed: slideSpeed,
				// loop: true,
				// loopAdditionalSlides: 2,
				observer: true,
			    observeParents: true,
				effect: "creative",
				a11y: true,
				creativeEffect: {
					prev: {
						translate: [0, 0, -2],
					},
					next: {
						translate: ["100%", 0, 0],
					},
				},
			});

			this.storySwiperText = new Swiper(".storySwiperText", {
				speed: slideSpeed,
				// loop: true,
				// loopAdditionalSlides: 2,
				// simulateTouch: false,
				observer: true,
			    observeParents: true,
				effect: "creative",
				a11y: true,
				creativeEffect: {
					prev: {
					  	translate: [0, "-120%", -1],
					},
					next: {
					  	translate: [0, "60%", -1],
					},
				},
				navigation: {
					nextEl: nextBtn,
					prevEl: prevBtn,
				},
				pagination: {
					el: wrapPagi,
					clickable: true,
					renderBullet: function (index, className) {
						var pageText = $('.storySwiperText .swiper-slide').eq(index).find('.caption').text();
						// console.log(pageText)
						return '<span class="' + className + '"><span class="text">' + pageText + "</span></span>";
					},
				},
				on: {
					init: function(swiper){
						// console.log(swiper.slides.length)
						var slideNum = swiper.slides.length;
						$(".main_story").css({
							"--duration": slideSpeed / 1000 + "s",
							"--slideLength": slideNum,
						})
					},
				},
			});

			this.storySwiperImg.controller.control = this.storySwiperText;
			this.storySwiperText.controller.control = this.storySwiperImg;
		},

		// 메인 배너 타입1
		banner01_swiper : null,
		mainBannerType01_slide: function () {
			let textTab = ['사전예약 고객 혜택', '더 현대적인 선물', '설 특별 할인 혜택'];
			let slideSpeed = 1000;

			// Swiper1 설정
			const swiper1 = new Swiper('.swiperBanner1', {
				autoplay: {
					delay: 3000,
					disableOnInteraction: false, // 사용자 동작 후에도 자동 재생 유지
				},
				pagination: {
					el: '.swiper-pagination-1',
					clickable: true,
				},
				effect: 'fade',
				loopAdditionalSlides: 1,
				speed: slideSpeed,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
			});

			// Swiper2 설정
			const swiper2 = new Swiper('.swiperBanner1', {
				pagination: {
					el: '.swiper-pagination-2',
					clickable: true,
					renderBullet: function (index, className) {
						return '<p class="' + className + '">' + (textTab[index]) + '</p>';
					},
				},
				effect: 'fade',
			});

			// 슬라이드 상태 관리 변수
			let isPlaying = true;

			// 토글 버튼
			$('.stop-btn').on('click', function () {
				if (isPlaying) {
						// 재생 중이면 일시정지
						swiper1.autoplay.stop();
						// swiper2.autoplay.stop();
						$(this).addClass('paused'); // 버튼에 'paused' 클래스 추가
						$(this).find('.btn-text').text('재생'); // 버튼 텍스트 변경
						isPlaying = false;
					} else {
					// 일시정지 상태면 재생
					swiper1.autoplay.start();
					// swiper2.autoplay.start();
					$(this).removeClass('paused'); // 'paused' 클래스 제거
					$(this).find('.btn-text').text('일시정지'); // 버튼 텍스트 변경
					isPlaying = true;
				}
			});

			// Swiper 간 컨트롤 연동
			swiper1.controller.control = swiper2;
			swiper2.controller.control = swiper1;
		},


		// 메인 배너 타입2
		banner02_swiper : null,
		mainBannerType02_slide : function(){
			const slides = document.querySelectorAll('.swiperBanner2 .swiper-slide');
			let slideSpeed = 1000;

			this.banner02_swiper = new Swiper(".swiperBanner2", {
				autoplay: {
					delay: 3000,
				},
				effect:'fade',
				speed: slideSpeed,
				a11y: true,
				loop: slides.length > 1,
				loopAdditionalSlides: 1,
				observer: true,
				observeParents: true,
				pagination: {
					el: ".swiperBanner2 .swiper-pagination",
					clickable: true,
				},
			});

		}
	},

	product : {
		onLoad : function(){
			this.recKeyword();
			this.subNav();
			this.formButtonUi();
			this.dataFinder();
			this.kvActive();
			this.popThumb();
		},

		// 추천상품 키워드 show/hide
		recKeyword : function(){
			$('.rec_keyword .btn_open').off('click').on('click', function () {
				$(this).toggleClass('on');
				$(this).closest('.item').find('.group').slideToggle(200);
			});
		},
		// 추천상품 키워드 선택 : 웹버전에서 모두 노출
		recKeywordOpen : function(){
			$('.rec_keyword .item .group').show();
		},
		// 추천상품 키워드 선택 : 모바일에서 모두 숨김
		recKeywordClose : function(){
			$('.rec_keyword .item .group').hide();
			$('.rec_keyword .item .btn_open').removeClass('on');
		},

		formButtonUi : function() {
			$('.all input[type="checkbox"]').change(function() {
					var group = $(this).attr('name');
					if ($(this).is(':checked')) {
							$('input[name="' + group + '"]').not(this).prop('checked', false);
					}
			});

			$('input[type="checkbox"]').not('.all input[type="checkbox"]').change(function() {
					var group = $(this).attr('name');
					if ($(this).is(':checked')) {
							$('.all input[name="' + group + '"]').prop('checked', false);
					}
			});
		},
		dataFinder : function() {
			var btnFilterPrd = $('.btn_filter.product');

			btnFilterPrd.off('click').on('click', function () {
				$(this).parents('.list_header').siblings('.data-finder').stop().slideToggle(300);
				$(this).parents('.list_header').siblings('.data-finder').toggleClass('active');
			});
		},
		kvActive : function() {
				var kvCategory= $('.k_vi.category');
				if ($('.k_vi').length) {
						kvCategory.addClass('active');
				} else {
						$('.subNavSwiper').addClass('no_k_vi');
				}
		},


		// 서브 네비게이션 스와이퍼
		subNavSwiper : null,
		subNav : function(){
			this.subNavSwiper = new Swiper(".subNavSwiper", {
				speed: 500,
				slidesPerView: 'auto',
				spaceBetween: 0,
				freeMode: true,
				allowTouchMove: true,
				observer: true,
				observeParents: true,
				watchOverflow: true,
			});
		},

		// 제품상세 팝업 썸네일 스와이퍼
		popThumbSwiper : null,
		popThumb : function(){
			this.popThumbSwiper = new Swiper(".popThumbSwiper", {
				speed: 500,
				slidesPerView: 1,
				spaceBetween: 40,
				// autoplay: {
				// 	delay: 2500,
				// 	disableOnInteraction: false,
				// },
				allowTouchMove: true,
				observer: true,
				observeParents: true,
				watchOverflow: true,
				pagination: {
					el: ".popThumbSwiper .swiper-pagination",
					clickable: true,
				},
			});
		},
	},
	search : {
		onLoad : function(){
			this.filterFunc();
		},

		// 검색필터 show/hide
		filterFunc : function(){
			var filterHeader = $('.filter_header');
			var btnFilter = filterHeader.find('.btn_filter');

			btnFilter.off('click').on('click', function () {
				filterHeader.siblings('.filter_wrapper').stop().slideToggle(300);
			});
		},

	}

}
