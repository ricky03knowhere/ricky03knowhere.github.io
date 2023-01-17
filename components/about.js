const about = () => {
  const dataList = [
    {
      title: [
        {
          icon: "fab fa-html5",
          name: "HTML",
        },
        {
          icon: "fab fa-css3-alt",
          name: "CSS",
        },
      ],
      name: "html",
      color: "danger",
      value: "100",
    },
    {
      title: [
        {
          icon: "fab fa-js",
          name: "JavaScript",
        },
        {
          icon: "fab fa-php",
          name: "PHP",
        },
      ],
      name: "php",
      color: "info",
      value: "100",
    },
    {
      title: [
        {
          icon: "fab fa-node-js",
          name: "Node.js",
        },
        {
          icon: "fab fa-php",
          name: "Express.js",
        },
      ],
      name: "node",
      color: "success",
      value: "85",
    },
    {
      title: [
        {
          icon: "fab fa-react",
          name: "React.js",
        },
      ],
      name: "react",
      color: "primary",
      value: "80",
    },
    {
      title: [
        {
          icon: "fa fa-fire",
          name: "Codeigniter",
        },
        {
          icon: "fab fa-laravel",
          name: "Laravel",
        },
      ],
      name: "laravel",
      color: "warning",
      value: "78",
    },
  ]
    .map(
      (el, i) =>
        `<h6 class="title-${i + 1}">
  ${el.title
    .map(
      (el, i) =>
        `${i === 1 ? '<i class="mx-2">|</i>' : ""} <i class="${
          el.icon
        } me-2"></i>${el.name}`
    )
    .join("")}
</h6>
<div class="progress mb-3 ${el.name}">
  <div class="progress-bar bg-${el.color}" role="progressbar" style="width: ${
          el.value
        }%" aria-valuemin="0" aria-valuemax="100"
    data-tooltip="${el.value}" data-skill="${el.name}">
  </div>
</div>`
    )
    .join("");

  // console.log("lenght  dataList ==>> ", dataList[1].title.length);

  return (
    // <!--ABOUT START-->
    `<div class="row p-4 bg-white justify-content-around" id="profile" style="z-index: 99">
      <div class="col-md-6 mb-5 pt-4">
        <h3 class="title">About Me</h3>
        <p class="about">
          An informatics engineering student who masters several programming
          languages, always follows technological developments, especially web
          programming, and has made several web projects that have been uploaded
          to
          <a href="https://github.com/ricky03knowhere" class="text-decoration-none" target="_blank">github.com</a>.
        </p>
      </div>
    
      <div class="col-md-5 pb-4">
        <h3 class="title mt-4">Skills</h3>
        ${dataList}
      </div>
    </div>
    `
    // <!--ABOUT END-->
  );
};

export default about;
