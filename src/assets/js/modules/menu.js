export class Menu {
    isClosing = false

    constructor(options = {}) {
        this.sidemenu = document.getElementById(options.menuId)
        this.burger = options.burger

        this.init()
    }

    init() {
        if (!this.sidemenu) return null

        this.sidemenu.addEventListener("click", event => {
            const { type } = event.target.dataset
            
            if (type === "sidemenu") {
                this.close()
            }
        })
    }

    get isActive() {
        return this.sidemenu.classList.contains("active")
    }

    toggle() {
        if (!this.sidemenu) return null

        if (this.isActive) {
            this.close()
        } else {
            this.open()
        }
    }

    onClose() {
        if (this.isClosing) return null

        this.isClosing = true

        this.sidemenu.classList.add("hidden")
        this.burger.classList.remove("active")

        setTimeout(() => {
            this.sidemenu.classList.remove("hidden")
            this.isClosing = false
        }, 500)
    }

    open() {
        document.body.style.overflow = "hidden"
        this.sidemenu.classList.add("active")
    }

    close() {
        this.onClose()
        document.body.style.overflow = 'unset'
        this.sidemenu.classList.remove("active")
    }
}