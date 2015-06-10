var mypage = angular.module('mypage', ['ngStorage'])
	.config(['$httpProvider', function($httpProvider) {  
	    $httpProvider.interceptors.push('bearerInterceptor');
	}]);
mypage.controller('home', ['$scope', function(){

}]);

mypage.controller('header', ['$scope', function(){
	
}]);

mypage.controller('about', ['$scope', function($scope){
	
}]);

mypage.controller('resume', ['$scope', function($scope){
	
}]);

mypage.controller('portfolio', ['$scope', function($scope){
}]);

mypage.controller('blog', ['$scope', function($scope){
	
}]);

mypage.controller('contact', ['$scope', function($scope){
	
}]);

mypage.controller('footer', ['$scope', 'util', function($scope, util){
	util.setUp();
}]);

mypage.controller('login', ['$rootScope', '$scope', '$location', '$localStorage', 'Authentication', function($rootScope, $scope, $location, $localStorage, Authentication) {
 
        $scope.signin = function(user) {
            var formData = {
                email: $scope.user.email,
                password: $scope.user.password
            };
 
            Authentication.signin(formData, function(res) {
                if (res.type == false) {
                    $scope.response = res.data;    
                } else {
                    $localStorage.token = res.data.token;
                    $scope.response = $localStorage.token;
                    // /window.location = "/";    
                }
            }, function() {
                $rootScope.error = 'Failed to signin';
            });
        };
 
        $scope.signup = function(user) {
            var formData = {
                email: $scope.user.email,
                password: $scope.user.password
            }
 
            Authentication.signup(formData, function(res) {
                if (res.type == false) {
                    $scope.response = res.data;
                } else {
                    $localStorage.token = res.data.token;
                    $scope.response = $localStorage.token;
                }
            }, function() {
                $rootScope.error = 'Failed to signup';
            })
        };
 
        $scope.test = function() {
            Authentication.test(function(res) {
                $scope.response = res;
                console.log(res);
            }, function() {
                $location.path('/');
            })
        };
 
        $scope.logout = function() {
        	console.log("logout");

            Authentication.logout(function() {
                //window.location = "/"
            }, function() {
                console.log("Failed to logout!");
            });
        };
        $scope.token = $localStorage.token;
    }])
mypage.directive('resEducation', function(){

	return {
		restrict : 'A',
		scope : {

		},
		link : function(scope, element, attrs){
			var edSlider = $("#educationSlider");
            edSlider.owlCarousel({
                slideSpeed: 600,
                items: 3,
                itemsDesktop: [1000, 3],
                itemsDesktopSmall: [900, 3],
                itemsTablet: [800, 2],
                itemsMobile: [500, 1],
                pagination: false
            });
            var edData = edSlider.data('owlCarousel');


            var edTgt = $('.edu-ctrl').find('.go');
            edTgt.on('click', function(e) {
                e.preventDefault();

                if ($(this).hasClass('go-left')) {
                    edData.prev();
                } else {
                    edData.next();
                }
            });
		},
		templateUrl : 'app/template/directive/resume/education.html'
	};
});
mypage.directive('resExperience', function(){

	return {
		restrict : 'A',
		scope : {

		},
		link : function(scope, element, attrs){
			var exSlider = $("#experienceSlider");
            exSlider.owlCarousel({
                items: 3,
                slideSpeed: 600,
                itemsDesktop: [1000, 3],
                itemsDesktopSmall: [900, 3],
                itemsTablet: [800, 2],
                itemsMobile: [500, 1],
                pagination: false
            });
            var exData = exSlider.data('owlCarousel');


            var exTgt = $('.exp-ctrl').find('.go');
            exTgt.on('click', function(e) {
                e.preventDefault();
                if ($(this).hasClass('go-left')) {
                    exData.prev();
                } else {
                    exData.next();
                }
            });
		},
		templateUrl : 'app/template/directive/resume/experience.html'
	};
});
mypage.directive('resSkill', function(){


	return {
		restrict : 'A',
		scope : {

		},
		link : function(scope, element, attrs){
			var sklSlider = $("#skillSlider");

            /*sklSlider.owlCarousel({
                slideSpeed: 400,
                itemsCustom: [
                    [0, 3],
                    [400, 4],
                    [500, 5],
                    [620, 6],
                    [700, 8],
                    [992, 5],
                    [1200, 6]
                ],
                pagination: false
            });*/

            sklSlider.owlCarousel({
				slideSpeed: 400,
				items : 6,
				itemsDesktop : false,
				itemsDesktopSmall : [991, 8],
				itemsTablet: [768, 8],
				itemsTabletSmall: [600, 6],
				itemsMobile : [479, 4],
				pagination : false
			});

            var sklData = sklSlider.data('owlCarousel');


            var sklTgt = $('.skl-ctrl').find('.go');
            sklTgt.on('click', function(e) {
                e.preventDefault();
                if ($(this).hasClass('go-left')) {
                    sklData.prev();
                } else {
                    sklData.next();
                }
            });

            // skills animation
            $('#skillSlider').waypoint({
                handler: function(event, direction) {
                    $(this).find('.singel-hr-inner').each(function() {
                        var height = $(this).data('height');
                        $(this).css('height', height);
                    });
                },
                offset: '60%'
            });
		},
		templateUrl : 'app/template/directive/resume/skill.html'
	};
});
mypage.factory('Authentication', ['$http', '$localStorage', function($http, $localStorage){
    var baseUrl = "https://portfolio-tulga1970.c9.io";
    function changeUser(user) {
        angular.extend(currentUser, user);
    }

    function urlBase64Decode(str) {
        var output = str.replace('-', '+').replace('_', '/');
        switch (output.length % 4) {
            case 0:
                break;
            case 2:
                output += '==';
                break;
            case 3:
                output += '=';
                break;
            default:
                throw 'Illegal base64url string!';
        }
        return window.atob(output);
    }

    function getUserFromToken() {
        var token = $localStorage.token;
        var user = {};
        if (typeof token !== 'undefined') {
            var encoded = token.split('.')[1];
            user = JSON.parse(urlBase64Decode(encoded));
        }
        return user;
    }

    var currentUser = getUserFromToken();

    return {
        signup: function(data, success, error) {
            $http.post(baseUrl + '/signup', data).success(success).error(error)
        },
        signin: function(data, success, error) {
            $http.post(baseUrl + '/signin', data).success(success).error(error)
        },
        test: function(success, error) {
            $http.get(baseUrl + '/test').success(success).error(error)
        },
        logout: function(success) {
            changeUser({});
            delete $localStorage.token;
            success();
        }
    };
}]);
mypage.factory('bearerInterceptor', ['$q', '$location', '$localStorage', function($q, $location, $localStorage){  
    var headerAugmenter = {
        request: function(config) {
            config.headers = config.headers || {};
            if ($localStorage.token) {
                config.headers.Authorization = 'Bearer ' + $localStorage.token;
            }
            return config;
        },
        responseError: function(response) {
            if(response.status === 401 || response.status === 403) {
                $location.path('/');
            }
            return $q.reject(response);
        }
    };
    return headerAugmenter;
}]);
mypage.service('service', function(){
	
});
mypage.factory('util', [function() {
    var scrollDirection, $ = jQuery, blogMsnry;

    return {
        setUp: function() {
            (function($) {
                $.fn.scrollingTo = function(opts) {
                    var defaults = {
                        animationTime: 1000,
                        easing: '',
                        topSpace: 0,
                        callbackBeforeTransition: function() {},
                        callbackAfterTransition: function() {}
                    };

                    var config = $.extend({}, defaults, opts);

                    $(this).on('click', function(e) {
                        var eventVal = e;
                        e.preventDefault();

                        var $section = $(document).find($(this).data('section'));
                        if ($section.length < 1) {
                            return false;
                        }

                        if ($('html, body').is(':animated')) {
                            $('html, body').stop(true, true);
                        }

                        var scrollPos = $section.offset().top;

                        if ($(window).scrollTop() == (scrollPos + config.topSpace)) {
                            return false;
                        }

                        config.callbackBeforeTransition(eventVal, $section);

                        var newScrollPos = (scrollPos - config.topSpace);

                        $('html, body').animate({
                            'scrollTop': (newScrollPos + 'px')
                        }, config.animationTime, config.easing, function() {
                            config.callbackAfterTransition(eventVal, $section);
                        });

                        return $(this);
                    });

                    $(this).data('scrollOps', config);
                    return $(this);
                };
            }(jQuery));
        	$('.search-form-li').on('click', function(e) {
                e.stopPropagation();
                $('.search-form-li').find('#initSearchIcon').addClass('hide');
                $('.search-form-wrap').removeClass('hide').find('input.search').focus();
                $('.side-nav').addClass('hide');
            });

            $(window).on('click', function() {
                $('.search-form-li').find('#initSearchIcon').removeClass('hide');
                $('.search-form-wrap').addClass('hide');
                $('.side-nav').removeClass('hide');
            });



            $(".blog-submenu-init").dropdown({
                inDuration: 300,
                outDuration: 225,
                constrain_width: true,
                hover: false,
                alignment: 'right',
                gutter: 10,
                belowOrigin: true
            });


            $(".primary-nav .button-collapse").sideNav();


            // jwplayer video post
            (function() {
                $('.player').each(function() {
                    var $this = $(this),
                        defaults = {
                            fileSrc: '',
                            imageSrc: '',
                            id: '',
                            width: '100%',
                            height: '100%',
                            aspectratio: ''
                        },
                        config = {
                            fileSrc: $(this).data('file-sec') || defaults.fileSrc,
                            imageSrc: $(this).data('image-src') || defaults.imageSrc,
                            id: $(this).attr('id'),
                            width: $(this).data('width') || defaults.width,
                            height: $(this).data('height') || defaults.height,
                            aspectratio: $(this).data('aspectratio') || defaults.aspectratio
                        };

                    jwplayer(config.id).setup({
                        file: config.fileSrc,
                        image: config.imageSrc,
                        width: config.width,
                        height: config.height,
                        aspectratio: config.aspectratio
                    });
                });
            }());


            /*$("html").niceScroll({
				cursorwidth: '7px',
				zindex: '9999999'
			});*/

            // blog Mesonary
            if ($('#blog-posts').length > 0) {
                blogMsnry = $('#blog-posts').isotope({
                    itemSelector: '.single-post',
                    isInitLayout: false,
                    layoutMode: 'masonry'
                });
            }

            $('.menu-smooth-scroll').scrollingTo({
                easing: 'easeOutQuart',
                animationTime: 1800,
                callbackBeforeTransition: function(e) {
                    if (e.currentTarget.hash !== "") {
                        if (e.currentTarget.hash !== '#home') {
                            $(e.currentTarget).parent().addClass('current').siblings().removeClass('current');
                        }
                    }

                    $('.button-collapse').sideNav('hide');
                },
                callbackAfterTransition: function(e) {
                    
                }
            });


            $('.section-call-to-btn').scrollingTo({
                easing: 'easeOutQuart',
                animationTime: 1800,
                callbackBeforeTransition: function(e) {

                },
                callbackAfterTransition: function(e) {}
            });

            // Animate scrolling on hire me button
            $('.hire-me-btn').on('click', function(e) {
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: $("#contact").offset().top
                }, 500);
            });


            // Menu animations plugin
            (function() {
                function Menu($element, options) {

                    var handler,
                        defaults = {
                            domObj: $element,
                            className: 'small-menu',
                            position: '100px',
                            onIntellingenceMenu: function() {},
                            onNormalMenu: function() {}
                        },
                        config = $.extend({}, defaults, options),
                        coreFuns = {
                            displayMenu: function() {
                                if (config.domObj.hasClass(config.className)) {
                                    config.domObj.removeClass(config.className);
                                }
                            },
                            hideMenu: function() {
                                if (!config.domObj.hasClass(config.className)) {
                                    config.domObj.addClass(config.className);
                                }
                            }
                        },
                        publicFuns = {
                            intelligent_menu: function() {

                                var lastScrollTop = 0,
                                    direction;

                                if (handler != undefined) {
                                    $(window).unbind('scroll', handler);
                                }

                                handler = function(e) {
                                    if (e.currentTarget.scrollY > lastScrollTop) {
                                        direction = 'down';
                                    } else {
                                        direction = 'up';
                                    }
                                    lastScrollTop = e.currentTarget.scrollY;

                                    // check is user scrolling to up or down?
                                    if (direction == 'up') {
                                        // so you are scrolling to up...

                                        // lets display menu
                                        coreFuns.displayMenu();

                                    } else {
                                        // so you are scrolling to down...

                                        // se we have to hide only the small menu because the normal menu isn't sticky!
                                        coreFuns.hideMenu();
                                    }
                                };
                                $(window).bind('scroll', handler);

                                config.onNormalMenu();
                            },
                            fixed_menu: function() {
                                if (handler != undefined) {
                                    $(window).unbind('scroll', handler);
                                }

                                handler = function(e) {
                                    // check have we display small menu or normal menu ?
                                    coreFuns.displayMenu();
                                };

                                $(window).bind('scroll', handler);

                                config.onNormalMenu();
                            },
                            mobile_intelligent_menu: function() {

                                if (jQuery.browser.mobile === true) {
                                    this.intelligent_menu();
                                } else {
                                    this.fixed_menu();
                                }
                            }
                        };

                    return publicFuns;
                }

                $.fn.menu = function(options) {
                    var $element = this.first();
                    var menuFuns = new Menu($element, options);
                    return menuFuns;
                };

            })();


            // call to Menu plugin
            var menuFun = $('header').menu({
                className: 'hide-menu',
                position: '100px'
            });

            window.menuFun = menuFun;


            /* Choose your navigation style */

            //menuFun.intelligent_menu(); // Hide intelligently
            //menuFun.fixed_menu(); // Always fixed
            menuFun.mobile_intelligent_menu(); // Hide on Mobile Devices




            // window scroll Sections scrolling

            (function() {
                var sections = $(".scroll-section");

                function getActiveSectionLength(section, sections) {
                    return sections.index(section);
                }

                if (sections.length > 0) {


                    sections.waypoint({
                        handler: function(event, direction) {

                            var active_section, active_section_index, prev_section_index;
                            active_section = $(this);
                            active_section_index = getActiveSectionLength($(this), sections);
                            prev_section_index = (active_section_index - 1);

                            if (direction === "up") {
                                scrollDirection = "up";
                                if (prev_section_index < 0) {
                                    active_section = active_section;
                                } else {
                                    active_section = sections.eq(prev_section_index);
                                }
                            } else {
                                scrollDirection = "Down";
                            }

                            
                            if (active_section.attr('id') !== 'home') {
                                var active_link = $('.menu-smooth-scroll[href="#' + active_section.attr("id") + '"]');
                                active_link.parent('li').addClass("current").siblings().removeClass("current");
                            } else {
                                $('.menu-smooth-scroll').parent('li').removeClass('current');
                            }
                            window.location.hash = '#/'+active_section.attr('id');
                        },
                        offset: '35%'
                    });
                }

            }());

            // Map
            var mapStyle = [{
                "featureType": "landscape",
                "stylers": [{
                    "saturation": -100
                }, {
                    "lightness": 50
                }, {
                    "visibility": "on"
                }]
            }, {
                "featureType": "poi",
                "stylers": [{
                    "saturation": -100
                }, {
                    "lightness": 40
                }, {
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "road.highway",
                "stylers": [{
                    "saturation": -100
                }, {
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "road.arterial",
                "stylers": [{
                    "saturation": -100
                }, {
                    "lightness": 20
                }, {
                    "visibility": "on"
                }]
            }, {
                "featureType": "road.local",
                "stylers": [{
                    "saturation": -100
                }, {
                    "lightness": 30
                }, {
                    "visibility": "on"
                }]
            }, {
                "featureType": "transit",
                "stylers": [{
                    "saturation": -100
                }, {
                    "visibility": "simplified"
                }]
            }, {
                "featureType": "administrative.province",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "water",
                "elementType": "labels",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "lightness": -0
                }, {
                    "saturation": -0
                }]
            }, {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                    "hue": "#00baff"
                }, {
                    "lightness": -10
                }, {
                    "saturation": -95
                }]
            }];

            var $mapWrapper = $('#map'),
                draggableOp;


            if (jQuery.browser.mobile === true) {
                draggableOp = false;
            } else {
                draggableOp = true;
            }

            if ($mapWrapper.length > 0) {
                var map = new GMaps({
                    div: '#map',
                    lat: 23.79473005386213,
                    lng: 90.41430473327637,
                    scrollwheel: false,
                    draggable: draggableOp,
                    zoom: 16,
                    disableDefaultUI: true,
                    styles: mapStyle
                });

                map.addMarker({
                    lat: 23.79473005386213,
                    lng: 90.41430473327637,
                    icon: 'images/marker-icon.png',
                    infoWindow: {
                        content: '<p>BD InfoSys Ltd, Dhaka, Bangladesh</p>'
                    }
                });
            }

            // Preloader
            $('.loader').fadeOut();
            $('#preloader').delay(350).fadeOut('slow');
            $('body').delay(350);



            // blog post slider
            (function() {
                var $blog_post_slider = $('.thumb-slides-container');
                if ($blog_post_slider.length > 0) {

                    $blog_post_slider.each(function() {
                        $(this).owlCarousel({
                            singleItem: true,
                            autoPlay: true,
                            stopOnHover: true,
                            slideSpeed: 800,
                            transitionStyle: 'fade'
                        });
                    });

                    $('.thumb-slides-controller a').on('click', function(e) {
                        e.preventDefault();

                        var blog_post_slider_data = $(this).closest('.blog-post-thumb').children('.thumb-slides-container').data('owlCarousel');

                        if ($(this).hasClass('left-arrow')) {
                            blog_post_slider_data.prev();
                        } else {
                            blog_post_slider_data.next();
                        }
                    });
                }
            }());


            // favorite maker
            (function() {
                var lovedText = "You already love this",
                    loveText = "Love this",
                    loveClass = "active";
                $('.js-favorite').on('click', function(e) {
                    e.preventDefault();
                    var favoriteNumb = parseInt($(this).find('.numb').text(), 10);
                    if ($(this).hasClass(loveClass)) {
                        $(this).removeClass(loveClass).attr('title', loveText);
                        --favoriteNumb;
                        $(this).find('.numb').text(favoriteNumb);
                    } else {
                        $(this).addClass(loveClass).attr('title', lovedText);
                        ++favoriteNumb;
                        $(this).find('.numb').text(favoriteNumb);
                    }
                });
            }());


            // Blog masonry re layout
            if (typeof blogMsnry !== "undefined") {
                blogMsnry.isotope('layout');
            }

            $(window).resize(function(){

				// Blog masonry re layout

				var handler = setTimeout(function(){
					if ( typeof blogMsnry !== "undefined" ) {
						blogMsnry.isotope('layout');
					}
					clearTimeout(handler);
				}, 2000);

			});
            // section calling
            $('.section-call-to-btn.call-to-home').waypoint({
                handler: function(event, direction) {
                    var $this = $(this);
                    $this.fadeIn(0).removeClass('btn-hidden');
                    var showHandler = setTimeout(function() {
                        $this.addClass('btn-show').removeClass('btn-up');
                        clearTimeout(showHandler);
                    }, 1500);
                },
                offset: '90%'
            });


            $('.section-call-to-btn.call-to-about').delay(1000).fadeIn(0, function() {
                var $this = $(this);
                $this.removeClass('btn-hidden');
                var showHandler = setTimeout(function() {
                    $this.addClass('btn-show').removeClass('btn-up');
                    clearTimeout(showHandler);
                }, 1600);
            });



            // portfolio Mesonary
            if ($('#protfolio-msnry').length > 0) {
                // init Isotope
                var loading = 0;
                var portfolioMsnry = $('#protfolio-msnry').isotope({
                    itemSelector: '.single-port-item',
                    layoutMode: 'fitRows'
                });


                $('#portfolio-msnry-sort a').on('click', function(e) {

                    e.preventDefault();

                    if ($(this).parent('li').hasClass('active')) {
                        return false;
                    } else {
                        $(this).parent('li').addClass('active').siblings('li').removeClass('active');
                    }

                    var $this = $(this);
                    var filterValue = $this.data('target');

                    // set filter for Isotope
                    portfolioMsnry.isotope({
                        filter: filterValue
                    });

                    return $(this);
                });

                $('#portfolio-item-loader').on('click', function(e) {
                    e.preventDefault();
                    var $this = $(this);

                    for (var i = 0; i < 3; i++) {
                        $.get("portfolioitems.html", function(data, status) {
                            var lists, numb, target = $('#portfolio-msnry-sort li.active a').data('target');

                            lists = (target != '*') ? $(data).find('li' + target) : $(data).find('li');

                            if (lists.length > 0) {
                                numb = Math.floor(Math.random() * lists.length);
                                portfolioMsnry.isotope('insert', lists.eq(numb));

                                loading++;
                                (loading == 9) ? $this.remove(): "";
                            }

                        });
                    }

                });

                var portfolioModal = $('#portfolioModal'),
                    portImgArea = portfolioModal.find('.model-img'),
                    portTitle = portfolioModal.find('.modal-content .title'),
                    portContent = portfolioModal.find('.modal-content .m-content'),
                    portLink = portfolioModal.find('.modal-footer .modal-action');

                $('#protfolio-msnry').delegate('a.modal-trigger', 'click', function(e) {
                    e.preventDefault();
                    var $this = $(this);
                    portfolioModal.openModal({
                        dismissible: true,
                        opacity: '.4',
                        in_duration: 400,
                        out_duration: 400,
                        ready: function() {
                            var imgSrc = $this.data('image-source'),
                                title = $this.data('title'),
                                content = $this.data('content'),
                                demoLink = $this.data('demo-link');


                            if (imgSrc) {
                                portImgArea.html('<img src="' + imgSrc + '" alt="Portfolio Image" />');
                            };


                            portTitle.text(title);
                            portContent.text(content);
                            portLink.attr('href', demoLink);
                        }
                    });
                });
            }

            // Wow init
            new WOW({
                offset: 200,
                mobile: false
            }).init();

            var $countNumb = $('.countNumb');

            if ($countNumb.length > 0) {
                $countNumb.counterUp({
                    delay: 15,
                    time: 1700
                });
            }
        }
    }
}]);