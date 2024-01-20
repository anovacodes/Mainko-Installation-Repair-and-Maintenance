import SlimSelect from "slim-select"
import Swiper from "swiper"
import { Pagination, Autoplay, EffectFade, Navigation, Parallax } from "swiper/modules"

import { burgerMenu } from "./modules/burger.js"
import { handleMenuDropdown } from "./modules/mobile-menu-dropdown.js"
import { handleSliderModal } from "./modules/handle-slider-modal.js"
import { handleDefaultModal } from "./modules/default-modal.js"
import { handleReviewsSlider } from "./modules/reviews-slider.js"
import { handleAccordion } from "./modules/accordion.js"

export const header = document.getElementById("header")

burgerMenu("burger-menu", "mobile-menu")

export function initSwiper(selector, options) {
    if (document.querySelector(selector)) {
        return new Swiper(selector, options)
    }
}

new SlimSelect({
    select: "#select-1",
    settings: {
        showSearch: false
    }
})

initSwiper("#hero-slider", {
    modules: [ Pagination, Autoplay, EffectFade ],
    effect: "fade",
    loop: true,
    autoplay: {
        delay: 6000
    },
    pagination: {
        el: "#hero-slider__pagination",
        clickable: true,
        renderBullet: (index, className) => {
            return `
                <div class="${className}">
                    <span>${index + 1}</span>
                </div>
            `
        }
    }
})

initSwiper("#logos-slider", {
    slidesPerView: 1,
    spaceBetween: 18,
    breakpoints: {
        991: {
            slidesPerView: 5
        },
        768: {
            slidesPerView: 4
        },
        545: {
            slidesPerView: 3
        },
        320: {
            slidesPerView: 2
        }
    }
})

initSwiper("#testimonial-slider", {
    modules: [ Pagination ],
    spaceBetween: 50,
    pagination: {
        el: "#testimonial-slider__pagination",
        clickable: true
    }
})

initSwiper("#domestic-services__slider", {
    modules: [ Navigation ],
    spaceBetween: 45,
    slidesPerView: 1,
    centeredSlides: true,
    loop: true,
    navigation: {
        nextEl: "#domestic-services__arrow_right",
        prevEl: "#domestic-services__arrow_left",
    },
    breakpoints: {
        768: {
            slidesPerView: 2
        }
    }
})  

initSwiper("#repair-slider", {
    modules: [ Navigation, Parallax ],
    parallax: true,
    speed: 1000,
    initialSlide: 1,
    navigation: {
        nextEl: "#repair__next",
        prevEl: "#repair__prev",
    }
})

initSwiper("#engineers-slider", {
    modules: [ Autoplay ],
    autoplay: {
        delay: 5000
    },
    slidesPerView: 1,
    spaceBetween: 80,
    breakpoints: {
        991: {
            slidesPerView: 3
        },
        640: {
            slidesPerView: 2
        }
    }
})

initSwiper("#coupons-slider", {
    modules: [ Navigation ],
    spaceBetween: 80,
    loop: true,
    navigation: {
        nextEl: "#coupons-slider__next",
        prevEl: "#coupons-slider__prev",
    }
})

export const reviewsSlider = initSwiper("#reviews-slider", {
    modules: [ Pagination ],
    spaceBetween: 80,
    pagination: {
        el: "#reviews-slider__pagination",
        clickable: true
    }
})

const fixHeader = () => {
    const offset = window.scrollY
    const isFixed = header.classList.contains("fixed")

    if (window.innerWidth <= 545 & !isFixed) {
        return header.classList.add("fixed")
    }

    if (offset >= 400 && header && !isFixed && window.innerWidth > 545) {
        header.classList.add("animate")

        setTimeout(() => {
            header.classList.remove("animate")
        }, 15)

        header.classList.add("fixed")
    } else if (offset < 400 && header && isFixed && window.innerWidth > 545) {
        header.classList.remove("fixed")
    }
}

fixHeader()

window.addEventListener("scroll", fixHeader)
window.addEventListener("click", event => {
    handleMenuDropdown(event)
    handleSliderModal(event)
    handleDefaultModal(event)
    handleReviewsSlider(event)
    handleAccordion(event)
})