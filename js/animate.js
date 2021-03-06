gsap.registerPlugin(TextPlugin);

//<<--- NAVBAR --->>

gsap.from(".navbar", {
  duration: 2,
  y: '-150%',
  opacity: 0,
  ease: 'bounce'
});

gsap.from(".navbar-brand", {
  duration: 1.5,
  delay: 2,
  y: 30,
  opacity: 0,
  ease: 'back'
});



// <<--- CAROUSEL --->

const titles = ['<span>Web</span> Programmer', '<span>Music</span> and <span>Movie</span> enthusiast',
  '<span>Tech</span> and <span>Gadget</span> enthusiast', 'Keep <span>Coding</span> Stay <span>Awesome</span>',
  'No <span>Drama</span> Just <span>Learn</span>',
]

titles.forEach((title, i) => {
  gsap.to(".carousel-item.item-" + (i + 1) + " h5", {
    duration: 2.5,
    delay: 5.5 * (i + 1),
    text: title
  });
});

titles.forEach((title, i) => {
  gsap.from(".carousel-item.item-" + (i + 1) + " p", {
    duration: 2,
    delay: 6.5 * (i + 1),
    y: 30,
    opacity: 0,
    ease: 'back'
  })
});




// <<--- ABOUT --->

const about = document.querySelector('.about')

about.dataset.aos = 'fade-up'
about.dataset.aosDelay = 800
about.dataset.aosDuration = 1000



// <<--- SKILLS --->

const skillTitles = document.querySelectorAll('#profile h6')

skillTitles.forEach((skill, i) => {
  skill.dataset.aos = 'fade-right'
  skill.dataset.aosDelay = i * 500
  skill.dataset.aosDuration = 1000
});



// <<---  PROJECT --->

const project = document.querySelector('#projects .carousel-inner')

project.dataset.aos = 'flip-right'
project.dataset.aosEasing = 'ease-in-sine'
project.dataset.aosDuration = 1000
project.dataset.aosDelay = 200
project.dataset.aosOffset = 450



// <<---  SOCIALS --->

const certififcates = document.querySelectorAll('#certificates .contain .card')
console.log(certififcates);
certififcates.forEach((certi, i) => {
  certi.dataset.aos = 'fade-down'
  certi.dataset.aosEasing = 'ease-in-sine'
  certi.dataset.aosDuration = 550
  certi.dataset.aosDelay = 300 * i
})



// <<---  SOCIALS --->

const socials = document.querySelectorAll('#sosmed .row>div')

socials.forEach((social, i) => {
  social.dataset.aos = 'fade-up'
  social.dataset.aosEasing = 'ease-in-sine'
  social.dataset.aosDuration = 700
  social.dataset.aosDelay = 300 * i
})



// <<---  HOBBIES --->

const hobbiesR = document.querySelectorAll('#hobbies .card')

hobbiesR.forEach((hobbs, i) => {

  hobbs.dataset.aosDuration = 1200
  hobbs.dataset.aosDelay = 200 * i


  if ((i % 2) == 0) {
    hobbs.dataset.aos = 'fade-right'
  } else {
    hobbs.dataset.aos = 'fade-left'
  }
})


AOS.init()