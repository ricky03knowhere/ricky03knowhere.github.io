const education = () => {
  const dataList = [
    {
      link: "http://sekolah.data.kemdikbud.go.id/index.php/chome/profil/B5F296A2-08FE-4CF8-B99C-0737CFC6B092",
      picture: "img/educations/1602551267992.png",
      alt: "agif",
      delay: "200",
      name: "SMKS Al-ghifari Banyuresmi",
      subject: "Software Engineering",
    },
    {
      link: "https://uinsgd.ac.id/",
      picture: "img/educations/logo.png",
      alt: "uin_sgd",
      delay: "800",
      name: "UIN sunan gunung djati bandung",
      subject: "Informatics Engeenering",
    },
  ]
    .map(
      (el, i) =>
        `<div class="col-md-6">
        <a href="${el.link}" target="_blank">
          <img src="${el.picture}" alt="${el.alt}" ${
          i === 1 ? 'class="uin"' : ""
        } data-aos="flip-left" data-aos-delay="${el.delay}"
            data-aos-duration="1000" />
        </a>
        <h5 data-aos="flip-up" data-aos-delay="800" data-aos-duration="1000">
          ${el.name}
        </h5>
        <span data-aos="fade-up" data-aos-delay="1000" data-aos-duration="1000">{ ${
          el.subject
        } }</span>
      </div>`
    )
    .join("");

  return (
    // <!--EDUCATION START-->
    `  <div id="education">
    <div class="parralax">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#fff" fill-opacity="1"
          d="M0,224L48,218.7C96,213,192,203,288,170.7C384,139,480,85,576,90.7C672,96,768,160,864,176C960,192,1056,160,1152,133.3C1248,107,1344,85,1392,74.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z">
        </path>
      </svg>
      <div class="cont">
        <h3 class="title mb-5 mt-3" style="filter: blur(0px)">Education</h3>
        <div class="row mb-5">
        ${dataList}
        </div>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="edu-wave">
        <path fill="#e8e8e8" fill-opacity="1"
          d="M0,256L48,218.7C96,181,192,107,288,80C384,53,480,75,576,90.7C672,107,768,117,864,122.7C960,128,1056,128,1152,106.7C1248,85,1344,43,1392,21.3L1440,0L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
        </path>
      </svg>
    </div>
  </div>`
    // <!--EDUCATION END-->
  );
};

export default education;
