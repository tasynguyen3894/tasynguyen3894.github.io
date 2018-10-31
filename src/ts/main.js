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

$('#show-comment-box').click(function () {
	$('#post-comment').show();
	$(this).hide();
})

// tabs

$('.tabs li').click(function () {
	$('.tabs li').removeClass('active');
	$(this).addClass('active');
	let target = $(this).attr('tab-target');
	$('.tab-content > div').hide();
	$('.tab-content > div[data-tab='+target+']').show();
})

