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