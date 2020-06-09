const modal = document.querySelector("#modal")

const buttonSearch = document.querySelector("#page-home main a")
const modalClose = document.querySelector("#modal .header a")


buttonSearch.addEventListener('click', modalHide)
modalClose.addEventListener('click', modalHide)

function modalHide(event) {
    event.preventDefault()
    modal.classList.toggle('hide')
}