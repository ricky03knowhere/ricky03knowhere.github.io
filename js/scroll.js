$(document).ready(function() {
  $(window).scroll(function() {
    var nScroll = $(this).scrollTop();
    if (nScroll > 250) {
      $(".navbar").addClass("nav");
      $(".navbar-brand").removeClass("shad");
      $(".nav-item").removeClass("shad");

    } else if (nScroll < 250) {
      $(".navbar").removeClass("nav");
      $(".navbar-brand").addClass("shad");
      $(".nav-item").addClass("shad");
    }
  })


})

$(".scroll").on("click", function(e) {
  // e.preventDefault()
  const link = $(this).attr("href")
  const dest = $(link).offset().top - 100

  $("#page-top").animate({
    scrollTop: dest
  },
    1250)
  e.preventDefault

})


let date = new Date()
let year = date.getFullYear()
$('footer #year').html(year)