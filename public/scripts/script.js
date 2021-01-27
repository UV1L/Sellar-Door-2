$(document).scroll(function() {
    var y = $(this).scrollTop();
    if (y >= 130) {
        $('.bottomMenu').slideDown(250);
        $('.center').css('display', 'none');
    } else {
        $('.bottomMenu').slideUp(250);
        $('.center').css('display', 'none');
    }
});