// @ts-nocheck
const indicatorList = document.querySelector('[role="indicatorlist"]')
const indicators = indicatorList.querySelectorAll('[role="indicator"]')

indicatorList.addEventListener('keydown', changeIndicatorFocus)
indicators.forEach((indicator) => {
  indicator.addEventListener('click', changeIndicatorItems)
})

let indicatorFocus = 0
function changeIndicatorFocus(e) {
  const keydownLeft = 37
  const keydownRight = 39
  if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
    indicators[indicatorFocus].setAttribute('tabindex', -1)

    if (e.keyCode === keydownRight) {
      indicatorFocus++
      if (indicatorFocus >= indicators.length) {
        indicatorFocus = 0
      }
    } else if (e.keyCode === keydownLeft) {
      indicatorFocus--
      if (indicatorFocus < 0) {
        indicatorFocus = indicators.length - 1
      }
    }

    indicators[indicatorFocus].setAttribute('tabindex', 0)
    indicators[indicatorFocus].focus()
  }
}

function changeIndicatorItems(e) {
  const targetIndicator = e.target
  const targetItem = targetIndicator.getAttribute('aria-controls')
  const targetImage = targetIndicator.getAttribute('data-image')

  const indicatorContainer = targetIndicator.parentNode
  const mainContainer = indicatorContainer.parentNode

  indicatorContainer
    .querySelector('[aria-selected="true"]')
    .setAttribute('aria-selected', false)

  targetIndicator.setAttribute('aria-selected', true)

  hideContent(mainContainer, '[role="indicatoritem"]')
  showContent(mainContainer, [`#${targetItem}`])
  hideContent(mainContainer, 'picture')
  showContent(mainContainer, [`#${targetImage}`])
}

function hideContent(parent, content) {
  parent
    .querySelectorAll(content)
    .forEach((item) => item.setAttribute('hidden', true))
}

function showContent(parent, content) {
  parent.querySelector(content).removeAttribute('hidden')
}
