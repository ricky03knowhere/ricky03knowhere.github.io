const project = () => {
  const indicators = [...Array(6)]
    .map(
      (el, i) =>
        ` <button type="button" data-bs-target="#carouselExampleControls" data-bs-slide-to="${i}" ${
          i === 0 ? 'class="active" aria-current="true"' : ""
        }aria-label="Slide ${i + 1}"></button>`
    )
    .join("");

  const dataList = [
    {
      picture: "img/projects/Screenshot (266).png",
      title: "Web Pesantren Habiburrahman (2022)",
      desc: `Web Frontend yang merupakan project akhir sekaligus sebagai ujian akhir semester (UAS) mata kuliah
        Pengembangan Aplikasi Web di
        perkuliahan semester 5, Dibuat dengan React.js dan Template Bootstrap 5 dengan tambahan kostumisasi
        tema.`,
      link: "https://github.com/ricky03knowhere/pesantren-habiburahman",
    },
    {
      picture: "img/projects/Screenshot (267).png",
      title: "Web Pemesanan Tiket Situ Bagendit (2022)",
      desc: `Merupakan project akhir sekaligus sebagai ujian akhir semester (UAS) mata kuliah Basis Data di
        perkuliahan semester 4, dibuat dengan Node.js ,Express.js denganTemplate layouting menggunakan EJS &
        Bootstrap5.`,
      link: "https://github.com/ricky03knowhere/bagendit_ticket_order",
    },
    {
      picture: "img/projects/Screenshot.png",
      title: "Pendaur Ulang Sampah Otomatis (2021)",
      desc: `Merupakan project akhir sekaligus sebagai ujian akhir semester (UAS) mata kuliah Teori Bahasa & Automata
        (TBO) di perkuliahan semester 3, dibuat dengan Javascript, JQuery dan Template Bootstrap 5.`,
      link: "https://pemilah-sampah-otomatis.netlify.app/",
    },
    {
      picture: "img/projects/Screenshot (27).png",
      title: "Shanika Service Sofa (2021)",
      desc: `Website profil perusahaan jasa service sofa yang bertempat di Jakarta. Dibuat dengan Template Bootstrap
        5 dengan tambahan kostumisasi tema.`,
      link: "https://shanika.netlify.app/",
    },
    {
      picture: "img/projects/Screenshot.jpg",
      title: "Comic Store (2021)",
      desc: `Merupakan project akhir sekaligus sebagai ujian akhir semester
        (UAS) mata kuliah Algoritma & pemrograman di perkuliahan
        semester 2, dibuat dengan Laravel 8 dan Template dari Argon
        Dashboard Admin.`,
      link: "http://comic--store.herokuapp.com/",
    },
    {
      picture: "img/projects/Screenshot_20201013-082407.png",
      title: "People Report (2020)",
      desc: `Merupakan dokumentasi pembelajaran saya yang masih dalam tahap
        pengembangan. Dibuat menggunakan konsep MVC dalam Codeigniter
        dan template Cooladmin yang berdasarkan soal UJIKOM RPL 2020.`,
      link: "https://ricky03knowhere.github.io/people_report",
    },
  ]
    .map(
      (el, i) =>
        `<div class="carousel-item ${i === 0 ? "active" : ""}">
  <div class="card project">
    <img class="card-img-top" src="${el.picture}" alt="Card image cap" />
    <div class="card-body">
      <h5 class="card-title">${el.title}</h5>
      <p class="card-text d-none d-md-block">
      ${el.desc}
      </p>
      <a href="${el.link}" target="_blank" class="btn btn-primary">View</a>
    </div>
  </div>
  </div>`
    )
    .join("");

  return (
    // <!--  PROJECTS START-->
    `<div id="projects">
  <h3 class="title text-center my-4 pt-5">Projects</h3>
  <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
    ${indicators}
    </div>
    <div class="carousel-inner">
    ${dataList}
    </div>
    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-bs-slide="prev">
      <i class="fas fa-chevron-left fa-2x"></i>
    </a>
    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-bs-slide="next">
      <i class="fas fa-chevron-right fa-2x"></i>
    </a>
  </div>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
    <path fill="#fff" fill-opacity="1"
      d="M0,128L48,144C96,160,192,192,288,176C384,160,480,96,576,96C672,96,768,160,864,202.7C960,245,1056,267,1152,256C1248,245,1344,203,1392,181.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
    </path>
  </svg>
</div>`

    // <!-- PROJECTS END -->
  );
};

export default project;
