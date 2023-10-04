const getAllProducts=async()=>{
    return await fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then((json)=>{
                localStorage.setItem("products",JSON.stringify(json))
                return json
            })
            .catch(err=>console.log(err)) 
        
}

const showCounterCart=()=>{
    // get cart from LS
    const CART = localStorage.getItem("cart")
    if(CART){
        // get element
        const COUNTER = document.querySelector(".products__cart_counter")
        // calc qty products
        let allProductsQty = 0
        JSON.parse(CART).map((e)=>{
            allProductsQty +=e.qty
        })
        // display qty
        COUNTER.innerHTML = allProductsQty
    }
    else {
        return
    }
}

const showProductOnDOM = async(products,selector)=>{
    // create html
    let html = ''
    // check if elements are in array
    products.length > 0 ? (
    products.map((e)=>{
            const {title,description,category,id,price,image}=e
        html += `
            <div data-category="${category}" data-id="${id}" class="products__area_item">
                <img src="${image}" alt="">
                <h2>${title}</h2>
                <h4>${price}</h4>
                <p>${description}</p>
                <button class="add_to_cart" data-id="${id}">
                    Add to cart
                </button>
                <button class="del_from_card" data-id="${id}">
                    Delete from cart
                </button>
            </div>
        `   
    })
    ): html = "<h2>Products not found</h2>"
    // get element
    const AREA = document.querySelector(selector)
    // insert
    AREA.innerHTML = html
    const ADD_TO_CART_BTNS = document.querySelectorAll('.add_to_cart')
    const REMOVE_FROM_CART_BTNS = document.querySelectorAll('.del_from_card')
    ADD_TO_CART_BTNS.forEach((btn)=>{
        btn.addEventListener("click",(e)=>{ 
            const PRODUCT_ID = e.target.getAttribute("data-id")
            addProductToCart(PRODUCT_ID)
        })
    })
    REMOVE_FROM_CART_BTNS.forEach((btn)=>{
        btn.addEventListener("click",(e)=>{
            const PRODUCT_ID = e.target.getAttribute("data-id")
            removeProductFromCart(PRODUCT_ID)
        })
    })
}

const addNewProduct=async()=>{
    await fetch('https://fakestoreapi.com/products',{
            method:"POST",
            body:JSON.stringify(
                {
                    title: 'test product',
                    price: 13.5,
                    description: 'lorem ipsum set',
                    image: 'https://i.pravatar.cc',
                    category: 'electronic'
                }
            )
        })
            .then(res=>res.json())
            .then(json=>console.log(json))
            .catch(err=>console.log(err))
}

const sortProducts =(products,type,selector_area)=>{
    let sortedProducts
    if(type=='ASC'){
        sortedProducts = products.sort((a,b)=>a.price-b.price)
    }
    else{
        sortedProducts = products.sort((a,b)=>b.price-a.price)
    }
    showProductOnDOM(sortedProducts,selector_area)
}

const filterBySearchQuery=(products,query,selector_area)=>{
    let filtedProducts = products.filter(item=>item.title.toLowerCase().includes(query))
    localStorage.setItem("dynamic_products",JSON.stringify(filtedProducts))
    showProductOnDOM(filtedProducts,selector_area)
}

const addProductToCart=(product_id)=>{
    // get cart from LS
    let cart = localStorage.getItem("cart")
    // check if it exists
    cart ? cart = JSON.parse(cart) : cart = []
    // check if cart empty
    if(cart.length > 0){   
        // check if product in CART
        let index = cart.findIndex(product => product_id==product.id)
        console.log(index)
            // -1 - not in list (incrs qty)
        if(index!=-1){
            cart[index].qty++
        }
            // add new
        else{
            cart.push({
                id: product_id,
                qty: 1
            })
        }
    }
    else {
        cart.push({id: product_id, qty: 1})
    }
    // write to LS
    localStorage.setItem("cart",JSON.stringify(cart))
    // display counter
    showCounterCart()
}

const removeProductFromCart=(product_id)=>{
    // get cart from LS
    let cart = localStorage.getItem("cart")
    // check if it exists
    cart ? cart = JSON.parse(cart) : cart = []
    // check if cart empty
    if(cart.length > 0){   
        // check if product in CART
        let index = cart.findIndex(product => product_id==product.id)
        console.log(index)
            // -1 - not in list (incrs qty)
        if(index!=-1){
            if(cart[index].qty>1){
                cart[index].qty--
            }
            else{
                cart.pop(index)
            }
        }
        else{
            alert('Not in cart!')
        }
    }
    else {
        alert('Cart is empty!')
    }
    // write to LS
    localStorage.setItem("cart",JSON.stringify(cart))
    // display counter
    showCounterCart()
}

// LS CLEANER
document.addEventListener("DOMContentLoaded",()=>{
    localStorage.removeItem('dynamic_products')
})
// start
document.addEventListener("DOMContentLoaded",async()=>{
    // interval
    let counter = 0 
    const Interval = setInterval((e)=>{
        console.log(counter)
        counter++
        if(counter==3){
            clearInterval(Interval)
        }
        else{
        }  
    }, 2000)
    // time out
    // setTimeout(()=>{
    //     console.log("test set time out.")
    // }, 10000)

    showCounterCart()
    // get elements DOM
    const INPUT_SELECT = document.querySelector(".products__sort")
    const INPUT_SEARCH = document.querySelector("#filter_search")
    const INPUT_FILTER = document.querySelector("#products__filter")
    const CLEAR_CART_BTN = document.querySelector(".products_clear")
    const REFRESH_PAGE_BTN = document.querySelector(".refresh_page")
    const ADD_Q_BTN = document.querySelector(".add_q_params")
    const READ_Q_BTN = document.querySelector(".read_q_params")
    const SCROLL_BTN = document.querySelector(".scroll_to")
    // get products
    const PRODUCTS = await getAllProducts()
    // show products
    showProductOnDOM(PRODUCTS,".products__area")
    // await addNewProduct()
    
    // add event listener
    INPUT_SELECT.addEventListener("change",(e)=>{
        let current_products
        const DYNAMIC_PRODUCTS = localStorage.getItem("dynamic_products")
        DYNAMIC_PRODUCTS ? current_products = JSON.parse(DYNAMIC_PRODUCTS) : current_products = PRODUCTS
        const TYPE = e.target.value
        sortProducts(current_products,TYPE,".products__area")
    })
    INPUT_SEARCH.addEventListener("input",(e)=>{
        filterBySearchQuery(PRODUCTS,e.target.value,".products__area")
    })
    // adding listener 'click'
    CLEAR_CART_BTN.addEventListener("click",(e)=>{
        e.preventDefault()
        // removing cart
        localStorage.removeItem("cart")
        // reload page to fix html cart qty translation
        location.reload()
    })
    
    REFRESH_PAGE_BTN.addEventListener("click",(e)=>{
        // --- reload
        //window.location.reload()

        // --- links
        // location.href = "link" - change currect page
        // window.open("link","_blank") - open new page

        // !!! not working !!! window.resizeTo(600, 400)

        // window.close()
    })
    ADD_Q_BTN.addEventListener("click",(e)=>{
        const url = new URL(location.href)
        const queryParams = url.searchParams
        queryParams.set("name","Jane")
        queryParams.set("age",18)
        window.open(`${url.href}`,"_self")
    })
    READ_Q_BTN.addEventListener("click",(e)=>{
        const url = new URL(location.href)
        const queryParams = url.searchParams
        const name = queryParams.get("name")
        const age = queryParams.get("age")
        console.log(name,age)
    })
    SCROLL_BTN.addEventListener("click",(e)=>{
        const Target = document.querySelector(".footer")
        Target.scrollIntoView({
            behavior:"auto"
        })
    })
})