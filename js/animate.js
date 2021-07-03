gsap.registerPlugin(TextPlugin);

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