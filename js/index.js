import navbar from "../components/navbar.js";
import carousel from "../components/carousel.js";
import about from "../components/about.js";
import education from "../components/education.js";
import project from "../components/project.js";
import certificate from "../components/certificate.js";
import sosmed from "../components/sosmed.js";
import hobbies from "../components/hobbies.js";
import interests from "../components/interests.js";
import contact from "../components/contact.js";
import footer from "../components/footer.js";

const support = (() => {
  if (!window.DOMParser) return false;
  var parser = new DOMParser();
  try {
    parser.parseFromString("x", "text/html");
  } catch (err) {
    return false;
  }
  return true;
})();

const stringToHTML = (str) => {
  // If DOMParser is supported, use it
  if (support) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(str, "text/html");
    return doc.body;
  }

  // Otherwise, fallback to old-school method
  var dom = document.createElement("div");
  dom.innerHTML = str;
  return dom;
};

const body = document.getElementById("page-top");
const merge =
  navbar() +
  carousel() +
  about() +
  education() +
  project() +
  certificate() +
  sosmed() +
  hobbies() +
  interests() +
  contact() +
  footer();

body.before(stringToHTML(merge));
