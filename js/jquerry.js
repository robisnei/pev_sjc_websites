$(document).ready(function() {
    $('.mapa').click(function () {
        $('.mapa iframe').css("pointer-events", "auto");
    });
    
    $( ".mapa" ).mouseleave(function() {
      $('.mapa iframe').css("pointer-events", "none"); 
    });
 });