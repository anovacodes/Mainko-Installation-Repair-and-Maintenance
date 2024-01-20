export const handleAccordion = event => {
    const { type } = event.target.dataset

    if (type !== "accordion-header") return

    const item = event.target.parentElement
    const body = item.querySelector("[data-type='accordion-body']")
    const accordion = item.parentElement.parentElement
    const accordionItems = accordion.querySelectorAll("[data-type='accordion-item']")

    toggleActive(item, accordionItems, body)
}

function toggleActive(item, accordionItems, body) {
    if (item.classList.contains("active")) {
        item.classList.remove("active")
        return body.style.setProperty("max-height", "0px")
    }

    for (const item of accordionItems) {
        item.classList.remove("active")
        item.lastElementChild.style.setProperty("max-height", "0px")
    }

    item.classList.add("active")
    body.style.setProperty("max-height", `${body.scrollHeight}px`)
}

function handleDefaultActive() {
    const accordions = document.querySelectorAll("[data-type='accordion']")

    for (const accordion of accordions) {
        const accordionItems = accordion.querySelectorAll("[data-type='accordion-item']")

        for (const item of accordionItems) {
            if (item.classList.contains("active")) {
                const body = item.querySelector("[data-type='accordion-body']")

                body.style.setProperty("max-height", `${body.scrollHeight}px`)
            }
        }
    }
}

handleDefaultActive() 