import { Navigation } from "swiper/modules"
import { header, initSwiper } from "../index.js"

export class SliderModal {
    isClosing = false

    constructor(modalSelector) {
        this.wrapper = document.querySelector(".wrapper")
        this.modal = document.querySelector(modalSelector)
        this.scrollbarWidth = getScrollbarWidth()

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
            this.swiper.destroy()
            
            document.body.style.overflow = 'unset'
            header.style.borderRight = 0
            this.wrapper.style.borderRight = 0
        }, 500)
    }

    open(initialSlide = 1, options) {
        if (window.innerWidth > 1200) {
            if (header && header.classList.contains("fixed")) {
                header.style.borderRight = `${this.scrollbarWidth}px solid #f1f1f1`
            }

            this.wrapper.style.borderRight = `${this.scrollbarWidth}px solid #f1f1f1`
        } 
        document.body.style.overflow = "hidden"

        this.swiper = initSwiper(options.sliderSelector, {
            modules: [ Navigation ],
            spaceBetween: 100,
            initialSlide: initialSlide - 1,
            navigation: options.navigation
        })

        this.modal.classList.add("active")
    }

    close() {
        this.onClose()
        this.modal.classList.remove("active")
    }
}

export function getScrollbarWidth() {
    const scrollDiv = document.createElement("div")

    scrollDiv.style.overflow = "scroll"

    document.body.append(scrollDiv)

    const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth

    scrollDiv.remove()
    
    return scrollbarWidth
}