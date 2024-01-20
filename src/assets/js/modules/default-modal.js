import { getScrollbarWidth } from "./slider-modal.js"

export const handleDefaultModal = event => {
    if (event.target.nodeName === "HTML") return

    const { type } = event.target.dataset

    if (type === "modal") {
        modal.setContent(`<iframe width="560" height="315" src="https://www.youtube.com/embed/jNQXAC9IVRw?si=OoRKtWOXZERJViy8" title="YouTube video player" allowfullscreen></iframe>`)
        modal.open()
    }
}

class Modal {
    isClosing = false

    constructor(modalSelector) {
        this.wrapper = document.querySelector(".wrapper")
        this.modal = document.querySelector(modalSelector)
        this.scrollbarWidth = getScrollbarWidth()
        this.content = null

        this.init()
    }

    init() {
        if (!this.modal) return null

        this.modal.addEventListener("click", event => {
            const { closable } = event.target.dataset

            if (closable) {
                this.close()
            }
        })
    }

    get isActive() {
        return this.modal.classList.contains("active")
    }

    onClose() {
        if (this.isClosing) return null

        this.isClosing = true

        this.modal.classList.add("hidden")

        setTimeout(() => {
            this.modal.classList.remove("hidden")
            this.isClosing = false
            
            document.body.style.overflow = 'unset'
            header.style.borderRight = 0
            this.wrapper.style.borderRight = 0
            this.remove()
        }, 500)
    }

    open() {
        if (window.innerWidth > 1200) {
            if (header && header.classList.contains("fixed")) {
                header.style.borderRight = `${this.scrollbarWidth}px solid #f1f1f1`
            }

            this.wrapper.style.borderRight = `${this.scrollbarWidth}px solid #f1f1f1`
        } 

        document.body.style.overflow = "hidden"

        this.modal.classList.add("active")
    }

    close() {
        this.onClose()
        this.modal.classList.remove("active")
    }

    remove() {
        const item = this.modal.querySelector(".modal__item")

        item.remove()
    }

    setContent(html) {
        const div = document.createElement("div")

        div.classList.add("modal__item", "modal__item_video")

        div.innerHTML = html

        this.modal.append(div)
    }
}

const modal = new Modal("#modal")