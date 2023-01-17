const interests = () => {
  const dataList = [
    "technology",
    "philosophy",
    "psychology",
    "anime",
    "history",
    "islamic topic",
    "conspiracy",
    "physics",
    "movie",
    "astronomy",
    "programming",
    "qur'an & hadith",
  ]
    .map(
      (el, i) =>
        `<div class="card item-${i + 1}">
        <h5>${el}</h5>
      </div>`
    )
    .join("");

  return (
    // <!--INTERESTS START-->
    `    <div id="interests">
      <h3 class="title text-center mb-4 py-5">Interests</h3>
      <div class="cont mx-3 px-3">
      ${dataList}
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path fill="#e8e8e8" fill-opacity="1"
          d="M0,224L48,208C96,192,192,160,288,154.7C384,149,480,171,576,202.7C672,235,768,277,864,298.7C960,320,1056,320,1152,272C1248,224,1344,128,1392,80L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
        </path>
      </svg>
    </div>`

    // <!--INTERESTS END-->
  );
};

export default interests;
