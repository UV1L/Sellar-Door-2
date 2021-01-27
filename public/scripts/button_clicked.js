$(document).ready(function() {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    $(".button").click(function() {
        if ($("#username").val() !== '' && $("#email").val() !== '') {
            if (re.test($("#email").val()))
                $(".on-tapped").css('display', 'block');
        }
    })
})