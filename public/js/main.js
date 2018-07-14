$('#nav-info-toggle').click(function () {
	if($('#nav-info').hasClass('show-info')) {
		$('#nav-info').removeClass('show-info');
		$('#navbar-quotes').removeClass('hide');
	} else {
		$('#nav-info').addClass('show-info');
		$('#navbar-quotes').addClass('hide');
	}
});

$('#nav-info-mobile-open').click(function () {
	if($('.navbar-fixed').hasClass('show-info')) {
		$('.navbar-fixed').removeClass('show-info');
	} else {
		$('.navbar-fixed').addClass('show-info');
	}
});


$('#nav-info-mobile-close').click(function () {
	if($('.navbar-fixed').hasClass('show-info')) {
		$('.navbar-fixed').removeClass('show-info');
	} else {
		$('.navbar-fixed').addClass('show-info');
	}
});


