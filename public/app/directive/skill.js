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