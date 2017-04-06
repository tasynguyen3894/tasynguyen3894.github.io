$('#menu_responsive').click(function () {
    console.log('ok');
    if($('#header_menu').hasClass('respove_show'))
    {
        $('#header_menu').removeClass('respove_show');
    }
    else
    {
        $('#header_menu').addClass('respove_show');
    }
});