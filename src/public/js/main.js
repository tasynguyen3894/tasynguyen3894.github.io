
$('#menu_responsive').click(function () {
    if($('#header_menu').hasClass('respove_show'))
    {
        $('#menu_responsive > span').removeClass('fa-times');
        $('#menu_responsive > span').addClass('fa-navicon');
        $('#header_menu').removeClass('respove_show');
    }
    else
    {
        $('#menu_responsive > span').removeClass('fa-navicon');
        $('#menu_responsive > span').addClass('fa-times');
        $('#header_menu').addClass('respove_show');
    }
});