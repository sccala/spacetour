// When somenoe clicks the hambeurger button
// if the nav is clossed, open it
// if the nav is open, close it

const nav = document.querySelector('.primary-navigation')
const navToggle = document.querySelector('.mobile-nav-toggle')

navToggle.addEventListener('click', () => {
  const visibility = nav.getAttribute('data-visible')
  if (visibility === 'false') {
    nav.setAttribute('data-visible', 'true')
    navToggle.setAttribute('aria-expanded', 'true')
  } else {
    nav.setAttribute('data-visible', 'false')
    navToggle.setAttribute('aria-expanded', 'false')
  }
})
