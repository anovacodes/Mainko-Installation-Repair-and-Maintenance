export const handleMenuDropdown = event => {
    const { type } = event.target.dataset

    if (type !== "menu-button") {
        return null
    }

    const currentItem = event.target.parentElement.parentElement

    toggleActive(currentItem)
}

function toggleActive(item) {
    if (item.classList.contains("active")) {
        return item.classList.remove("active")
    }

    item.classList.add("active")
}

