const sosmed = () => {
  const dataList1 = [
    {
      col: "3",
      link: "https://www.linkedin.com/mwlite/in/ricky-muhammad-ridwan-4545001a5",
      icon: "fa-linkedin-in",
    },
    { col: "5", link: "https://github.com/ricky03knowhere", icon: "fa-github" },
    {
      col: "2",
      link: "https://twitter.com/rickyackerman2",
      icon: "fa-twitter",
    },
    {
      col: "2",
      link: "https://www.youtube.com/channel/UCLQLvCI-WM-iQExTp9kdG4Q/",
      icon: "fa-youtube",
    },
  ];

  const dataList2 = [
    {
      col: "2",
      link: "https://t.me/ricky33tiedemann",
      icon: "fa-telegram-plane",
    },
    {
      col: "2",
      link: "https://facebook.com/edricky.infinitystones",
      icon: "fa-facebook-f",
    },
    {
      col: "3",
      link: "https://know7english.blogspot.com/",
      icon: "fa-blogger-b",
    },
    {
      col: "5",
      link: "https://www.instagram.com/ricky_ackerman07/",
      icon: "fa-instagram",
    },
  ];

  const HtmlGenerate = (data) =>
    data
      .map(
        (el) =>
          `<div class="col-md-${el.col}">
    <a href="${el.link}" target="_blank" class="link">
      <div class="card bg-success">
      <i class="fab ${el.icon}"></i>
      </div>
      </a>
  </div>`
      )
      .join("");

  return (
    // <!--SOSMED START-->
    `<div id="sosmed" class="pt-5">
      <h3 class="title text-center pt-5 text-white">Socials</h3>
      <div class="row m-3 pt-5 justify-content-center">
        ${HtmlGenerate(dataList1)}
      </div>
      <div class="row m-3 justify-content-around">
        ${HtmlGenerate(dataList2)}
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#e8e8e8" fill-opacity="1"
          d="M0,96L48,106.7C96,117,192,139,288,165.3C384,192,480,224,576,234.7C672,245,768,235,864,192C960,149,1056,75,1152,42.7C1248,11,1344,21,1392,26.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
        </path>
      </svg>
    </div>`
    // <!--SOSMED END-->
  );
};

export default sosmed;
