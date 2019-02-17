console.log('\'Allo \'Allo!');

// Uncomment to enable Bootstrap tooltips
// https://getbootstrap.com/docs/4.0/components/tooltips/#example-enable-tooltips-everywhere
// $(function () { $('[data-toggle="tooltip"]').tooltip(); });

// Uncomment to enable Bootstrap popovers
// https://getbootstrap.com/docs/4.0/components/popovers/#example-enable-popovers-everywhere
// $(function () { $('[data-toggle="popover"]').popover(); });

$(document).ready(function(){
    $headerElement = $('#page-header');
    $heroSection = $('#hero-section');

    $(window).on('scroll', function(e){
        if($(document).scrollTop() > $heroSection.outerHeight() - 50){
            console.log('add class');
            if(!$headerElement.hasClass('show-bg')){
                $headerElement.addClass('show-bg');
            }
        } else {
            console.log('remove class');
            if($headerElement.hasClass('show-bg')){
                $headerElement.removeClass('show-bg');
            }
        }
    })
});