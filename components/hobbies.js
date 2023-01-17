const hobbies = () => {
  const dataList1 = [
    {
      title: "Coding",
      icon: "fas fa-laptop-code",
      desc: "So passionate about programing especially web programming, cause Ilike solving problems with logic and designing web pages.",
    },
    {
      title: "Watching Anime & movies",
      icon: "fas fa-film",
      desc: "Watching science-fiction and time travel anime, movies or TV series.",
    },

    {
      title: "Learn something new",
      icon: "fas fa-lightbulb",
      desc: "Always open minded and curious to learn something new.",
    },
    {
      title: "Listening to music",
      icon: "fab fa-itunes-note",
      desc: "Music is not to be listened but to feel and understand what the lyrics mean.",
    },
  ]
    .map(
      (el, i) =>
        ` <div class="card ${i % 2 === 0 ? 'right"' : 'left"'} ${
          i === 0 ? 'code" data-aos-offset="300"' : ""
        }>
  <h3 class="card-title">${el.title}</h3>
  <i class="${el.icon}"></i>
  <p class="card-text">
    ${el.desc}
  </p>
</div>`
    )
    .join("");

  const dataList2 = ["Sundanese", "Indonesian", "English"]
    .map(
      (el, i) =>
        `<div class="bg ${i === 0 ? 'pt-1" data-aos-offset="300"' : '"'}>
  <img src="img/SeekPng.com_paint-png_34390.png" alt="pap" />
  <h2>${el}</h2>
</div>`
    )
    .join("");

  return (
    // <!--HOBBIES START-->
    `    <div id="hobbies">
      <div class="row m-3 pt-4">
        <div class="col-md-7">
          <h3 class="title ms-2 mb-5">Hobbies</h3>
          ${dataList1}
        </div>
        <div class="col-md-5 mb-3 lang">
          <h3 class="title ms-4">Languages</h3>
        ${dataList2}
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#fff" fill-opacity="1"
          d="M0,256L48,229.3C96,203,192,149,288,122.7C384,96,480,96,576,128C672,160,768,224,864,224C960,224,1056,160,1152,154.7C1248,149,1344,203,1392,229.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
        </path>
      </svg>
    </div>`

    // <!--HOBBIES END-->
  );
};

export default hobbies;
