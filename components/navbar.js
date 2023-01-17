const navbar = () => {
  const dataList = [
    { title: "education", link: "education" },
    { title: "projects", link: "projects" },
    { title: "certificates", link: "certificates" },
    { title: "socials", link: "sosmed" },
  ]
    .map(
      (el) =>
        `<li class="nav-item shad">
    <a class="nav-link scroll ${el.link}" href="#${el.link}">
      ${el.title}
    </a>
  </li>`
    )
    .join("");
    
  return (
    // <!--NAVBAR START-->
    ` <nav class="navbar sticky-top navbar-expand-md navbar-dark">
    <div class="container">
    <a class="navbar-brand shad" href="#profile">
    {ricky03knowhere}
    </a>
    <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          >
          <span class="navbar-toggler-icon"></span>
          </button>
          
          <div
          class="collapse navbar-collapse d-xl-flex justify-content-end"
          id="navbarSupportedContent"
          >
          <ul class="navbar-nav">
          ${dataList}
          <li class="nav-item">
            <a class="nav-link btn scroll contact" href="#contact">
              Contact
            </a>
          </li>
          </ul>
        </div>
      </div>
    </nav>`

    // <!--NAVBAR END-->
  );
};
export default navbar;
