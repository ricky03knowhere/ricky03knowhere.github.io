// <<--- Navbar changed handler --->>
$(document).ready(() => {
  $(window).scroll(() => {
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
  });

  // <<--- NavLink active handler --->>
  const navLink = $(".navbar-nav .nav-item .nav-link");
  navLink.on("click", function () {
    navLink.removeClass("active");

    $(this).addClass("active");
  });

  // Skills Tooltips
  $("#profile .progress-bar").each((i, el) => {
    let skill = el.getAttribute("data-skill");
    let value = el.getAttribute("data-tooltip");

    new bootstrap.Tooltip($("#profile .progress." + skill), {
      title: `${value}%`,
      // offset: '200',
      template:
        '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
    });
  });

  // <<--- Gsheet Handler --->>
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbwfwcj4ep9omeWXCCqmnerWfMyCjv-ygH7WudXak4wygYRsIau9UESn9zRJ5BkW5psE/exec";
  const form = document.forms["submit-to-google-sheet"];

  const btnLoading = document.querySelector(".btn-loading");
  const btnSubmit = document.querySelector(".btn-submit");
  const notif = document.querySelector(".notif");

  console.log("form ==>> ", form);

  let notifHidden = true;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!notifHidden) {
      notif.classList.toggle("d-none");
    }

    btnLoading.classList.toggle("d-none");
    btnSubmit.classList.toggle("d-none");

    fetch(scriptURL, {
      method: "POST",
      body: new FormData(form),
      mode: "no-cors",
    })
      .then((response) => {
        notif.classList.toggle("d-none");
        btnLoading.classList.toggle("d-none");
        btnSubmit.classList.toggle("d-none");
        form.reset();
        notifHidden = false;

        console.log("Success!", response);
      })
      .catch((error) => console.error("Error!", error.message));
  });
});
