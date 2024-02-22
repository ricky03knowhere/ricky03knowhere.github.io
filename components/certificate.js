const certificate = () => {
  let dataList = Array(7);
  dataList = [
    { title: "Alibaba Cloud Services -  Certified Developer", year: "2023" },
    { title: "Belajar Machine Learning untuk Pemula", year: "2023" },
    { title: "Belajar Membuat Aplikasi Web dengan React", year: "2023" },
    {
      title:
        "(MCE) Technology Literacy for Educators - 21st Century Learning Design",
      year: "2022",
    },
    {
      title: "HackatonTeknik Informatika UIN Sunan Gunung Djati Bandung",
      year: "2022",
    },
    { title: "junior web developer sertification", year: "2021" },
    { title: "fullstack development training", year: "2020" },
  ]
    .map(
      (el, i) =>
        `<div class="card item-${dataList.length -
          i}" index="${dataList.length - i}" data-title="${
          el.title
        }" data-year="${el.year}"></div>`
    )
    .join("");
  return (
    // <!--CERTIFICATES START-->
    ` <div id="certificates" class="pt-5">
      <h3 class="title text-center text-secondary my-4 pt-4">Certificates</h3>
      <div class="slides hi-slide d-none d-lg-block d-xl-block">
        <div class="hi-prev">
          <i class="fas fa-chevron-left"></i>
        </div>
        <div class="hi-next">
          <i class="fas fa-chevron-right"></i>
        </div>
        <ul>
        ${[...Array(7)]
          .map(
            (el, i) =>
              `<li><img src="img/certificates/${1 + i}.png" alt="${i +
                1}" /></li>`
          )
          .join("")}
        </ul>
      </div>
    
      <div class="contain  d-xl-none d-xxl-none d-md-none m-3 pt-5">
      ${dataList}
      </div>
    
      <div class="preview d-xl-none d-xxl-none d-md-none">
        <div class="card"></div>
        <i class="fas fa-chevron-left fa-2x prev"></i>
        <i class="fas fa-chevron-right fa-2x next"></i>
        <h3>Pelatihan Coding</h3>
        <h6 class="year">2020</h6>
    
        <i class="far fa-times-circle close"></i>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#333" fill-opacity="1"
          d="M0,224L48,213.3C96,203,192,181,288,176C384,171,480,181,576,197.3C672,213,768,235,864,208C960,181,1056,107,1152,96C1248,85,1344,139,1392,165.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
        </path>
      </svg>
    </div>`

    // <!--CERTIFICATES END-->
  );
};

export default certificate;
