// @ts-nocheck
const buttonList = document.querySelector('[role="tablist"]')
const buttons = document.querySelectorAll('[role="tab"]')

buttonList.addEventListener('keydown', changeButtonFocus)

buttons.forEach((button) => {
  button.addEventListener('click', changeButtonPanel)
})

let buttonFocus = 0
function changeButtonFocus(e) {
  const keydownLeft = 37
  const keydownRight = 39
  if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
    buttons[buttonFocus].setAttribute('tabindex', -1)
  }
  if (e.keyCode === keydownLeft) {
    buttonFocus++
    if (buttonFocus >= buttons.length) {
      buttonFocus = 0
    }
  } else if (e.keyCode === keydownRight) {
    buttonFocus--
    if (buttonFocus < 0) {
      buttonFocus = buttons.length - 1
    }
    buttons[buttonFocus].setAttribute('tabindex', 0)
    buttons[buttonFocus].focus()
  }
}

function changeButtonPanel(e) {
  const targetButton = e.target
  const targetPanel = targetButton.getAttribute('aria-controls')
  const targetImage = targetButton.getAttribute('data-image')

  const buttonContainer = targetButton.parentNode
  const mainContainer = buttonContainer.parentNode

  buttonContainer
    .querySelector('[aria-selected="true"]')
    .setAttribute('aria-selected', false)

  targetButton.setAttribute('aria-selected', true)

  hideContent(mainContainer, '[role="tabpanel"]')
  showContent(mainContainer, [`#${targetPanel}`])
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
