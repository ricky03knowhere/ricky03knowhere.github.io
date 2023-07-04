const carousel = () => {
  let experience = new Date().getFullYear() - 2018
  const dataList = [
    {
      picture: "img/carousel/ilya-pavlov-OqtafYT5kTw-unsplash.jpg",
      desc: `Front-end developer, ${experience} years experienced & continues learning web programming`,
    },
    {
      picture: "img/carousel/nikolay-tarashchenko-551722-unsplash.jpg",
      desc: "So interesting to sci-fi and time travel movies, Enjoy with Edm and pop-alternative music",
    },
    {
      picture: "img/carousel/akrales_190424_3301_0426.0.jpg",
      desc: "Always abreast of technological developments",
    },
    {
      picture: "img/carousel/kevin-bhagat-343433-unsplash.jpg",
      desc: "No day without coding and always be awesome",
    },
    {
      picture: "img/carousel/raul-varzar-749952-unsplash.jpg",
      desc: " Live without drama, always open minded & be curious to learn something new",
    },
  ].map(
    (el, i) =>
      `<div class="carousel-item ${i === 0 ? " active" : ""} item-${i + 1}">
    <img class="d-block w-100" src="${el.picture}" />
    <div class="carousel-caption">
      <h5></h5>
      <p class="d-none d-md-block">
        ${el.desc}
      </p>
    </div>
  </div>`
  );

  return (
    // <!--CAROUSEL START-->
    `<div id="carouselExampleFade" class="carousel cap slide carousel-fade b-5" data-bs-ride="carousel">
  <div class="carousel-inner">
  ${dataList}
  </div>
</div>`
    // <!--CAROUSEL END-->
  );
};

export default carousel;
