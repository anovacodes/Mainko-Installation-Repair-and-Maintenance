import { reviewsSlider } from "../index.js"

export const handleReviewsSlider = event => {
    const { type, index } = event.target.dataset

    if (window.innerWidth <= 768 || !reviewsSlider || type !== "slider-button") return

    reviewsSlider.slideTo(index)
}