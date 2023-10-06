// $(document).ready(()=>{
//     alert('s')
// })

// document.addEventListener("DOMContentLoaded",(e)=>{
//     alert('r')
// })

// Click (1)
// $(".JQ_click").click((e)=>{
//      $("body").toggleClass("active")
//      console.log($(".JQ_click").data("id"))
// $("body").append("<h2>Hi!</h2>")
// })

const getAllProducts = async () => {
    return await fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then((json) => { return json })
        .catch(err => console.log(err))
}

const getAllCategories = async () => {
    return await fetch('https://fakestoreapi.com/products/categories')
        .then(res => res.json())
        .then((json) => { return json })
        .catch(err => console.log(err))

}

const showProductOnDOM = async (products, selector) => {
    // create html
    let html = ''
    // check if elements are in array
    products.length > 0 ? (
        products.map((e) => {
            const { title, description, category, id, price, image } = e
            html += `
            <div data-category="${category}" data-id="${id}" class="products__area_item">
                <img src="${image}" alt="">
                <h2>${title}</h2>
                <h4>${price}</h4>
                <p>${description}</p>
            </div>
        `
        })
    ) : html = "<h2>Products not found</h2>"
    // get element
    // insert
    $(selector).html(html)
}

const showCategoryOnDOM = async (categories, selector) => {
    // create html
    let html = '<option selected disabled>Choose category</option>'
    // check if elements are in array
    categories.length > 0 ? (
        categories.map((e) => {
            html += `
                <option value"${e}">${e}</option>
            `
        })
    ) : html = ""
    $(selector).append(html)
}

// (2)             event
// $(".JQ_click").on("click",()=>{
//     alert("d")
// })

// $("#JQ_form").submit((e)=>{
//     e.preventDefault()
//     const NAME = $("#name").val()
//     console.log(NAME)
// })

document.addEventListener("DOMContentLoaded", async (e) => {
    const PRODUCTS = await getAllProducts()
    const CATEGORIES = await getAllCategories()

    showProductOnDOM(PRODUCTS, ".products__area")
    showCategoryOnDOM(CATEGORIES, "#category")

    $("#category").on("change",(e)=>{
        const VALUE = $("#category").val()
        const FILTERED_PRODUCTS = PRODUCTS.filter(products => products.category==VALUE)
        showProductOnDOM(FILTERED_PRODUCTS, ".products__area")
    })
})