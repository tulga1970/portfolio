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