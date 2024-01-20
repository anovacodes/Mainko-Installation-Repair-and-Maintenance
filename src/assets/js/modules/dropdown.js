const FILTER_LIST_HEIGHT = "100px"

const accordionItems = document.querySelectorAll("[data-type='accordion-item']")

defaultActive(accordionItems)

export const handleAnimatedDropdown = event => {
    const { type, filter, accordion } = event.target.dataset
    
    if (type !== "dropdown") return 
    
    const item = event.target.parentElement

    const list = item.lastElementChild
    const listHeight = list.scrollHeight
    
    const isFilter = !!filter

    if (accordion) {
        return toggleAccordionActive(item, list, listHeight)
    }

    toggleActive(item, list, listHeight, isFilter)
}

function toggleActive(item, list, listHeight, isFilter) {
    if (item.classList.contains("active")) {
        item.classList.remove("active")

        if (isFilter) {
            return list.style.setProperty("max-height", FILTER_LIST_HEIGHT)
        }

        list.style.setProperty("max-height", `0px`)
    } else {
        item.classList.add("active")
        list.style.setProperty("max-height", `${listHeight}px`)
    }
}

function toggleAccordionActive(item, content, contentHeight) {
    if (item.classList.contains("active")) {
        item.classList.remove("active")
        return content.style.setProperty("max-height", `0px`)
    } 

    for (let key of accordionItems) {
        key.classList.remove("active")
        key.lastElementChild.style.setProperty("max-height", `0px`)
    }

    item.classList.add("active")
    content.style.setProperty("max-height", `${contentHeight}px`)
}

function defaultActive(accordionItems) {
    for (let item of accordionItems) {
        if (item.classList.contains("active")) {
            const content = item.querySelector("[data-type='accordion-body']")

            content.style.setProperty("max-height", `${content.scrollHeight}px`)
        }
    }
}
