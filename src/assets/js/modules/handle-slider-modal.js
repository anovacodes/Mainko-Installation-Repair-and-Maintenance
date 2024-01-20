import { SliderModal } from "./slider-modal.js"

const modal = new SliderModal("#instagram-modal")
const modal2 = new SliderModal("#gallery-modal")

export const handleSliderModal = event => {
    if (event.target.nodeName === "HTML") return

    const { type } = event.target.parentElement.dataset
    const { id: initialSlide } = event.target.dataset

    if (!initialSlide) return

    switch (type) {
        case "instagram":
            modal.open(initialSlide, {
                sliderSelector: "#instagram-modal-slider",
                navigation: {
                    prevEl: "#instagram-modal-left",
                    nextEl: "#instagram-modal-right"
                }
            })
            
            break
        case "gallery":
            modal2.open(initialSlide, {
                sliderSelector: "#gallery-modal-slider",
                navigation: {
                    prevEl: "#gallery-modal-left",
                    nextEl: "#gallery-modal-right"
                }
            })
            
            break
    }
}


