const modalInit = () => {
    const modal = document.querySelector('#modal')
    const modalOpenButton = document.querySelector('#modal_open_button')
    const modalCloseButton = document.querySelector('#modal_close_button')

    modalOpenButton.addEventListener('click', () => {
        modal.style.display = 'flex'
    })

    modalCloseButton.addEventListener('click', () => {
        modal.style.display = 'none'
    })
}

window.onload = () => {
    modalInit()
}
