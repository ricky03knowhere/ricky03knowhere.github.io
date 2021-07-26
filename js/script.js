// <<--- Navbar changed handler --->>
$(document).ready(() => {
  $(window).scroll(() => {

    var nScroll = $(this).scrollTop()

    if (nScroll > 250) {
      $(".navbar").addClass("nav")
      $(".navbar-brand").removeClass("shad")
      $(".nav-item").removeClass("shad")

    } else if (nScroll < 250) {
      $(".navbar").removeClass("nav")
      $(".navbar-brand").addClass("shad")
      $(".nav-item").addClass("shad")
    }
  })
})


// <<--- NavLink active handler --->>
const navLink = $('.navbar-nav .nav-item .nav-link')
navLink.on('click', function () {

  navLink.removeClass('active')
  $(this).addClass('active')

})


// <<--- Smooth scroll --->>
// $(".scroll").on("click", function(e) {
//   // e.preventDefault()
//   const link = $(this).attr("href")
//   const dest = $(link).offset().top - 100

//   $("#page-top").animate({
//     scrollTop: dest
//   },
//     1250)
//   e.preventDefault

// })


// <<--- Copyright Year --->>
let date = new Date()
let year = date.getFullYear()
$('footer #year').html(year)


// <<--- Gsheet Handler --->>
const scriptURL = 'https://script.google.com/macros/s/AKfycbzn2QWV-FntMDSF0iH4-K6Xp9KZKAc7YQsWOB8oYfVZ-a35rYslR6HxbL30pGUAcKLp/exec'
const form = document.forms['submit-to-google-sheet']

const btnLoading = document.querySelector('.btn-loading')
const btnSubmit = document.querySelector('.btn-submit')
const notif = document.querySelector('.notif')

let notifHidden = true
form.addEventListener('submit', e => {

  e.preventDefault()
  if (!notifHidden) {
    notif.classList.toggle('d-none')
  }

  btnLoading.classList.toggle('d-none')
  btnSubmit.classList.toggle('d-none')

  fetch(scriptURL, {
      method: 'POST',
      body: new FormData(form)
    })
    .then(response => {

      notif.classList.toggle('d-none')
      btnLoading.classList.toggle('d-none')
      btnSubmit.classList.toggle('d-none')
      form.reset()
      notifHidden = false
      
      console.log('Success!', response)
    })
    .catch(error => console.error('Error!', error.message))
})