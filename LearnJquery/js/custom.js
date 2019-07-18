$(function () {


  $("p").click(function () {
    $('p').hide();
  });

  $("#succeessButton").click(function () {
    $('.bg-success').toggle();
  });
  $("#infoButton").click(function () {
    $('.bg-info').toggle();
  });
  $("#warningButton").click(function () {
    $('.bg-warning').toggle();
  });

  
});