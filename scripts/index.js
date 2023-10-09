const turnOnErrorView =(selector_input,selector_msg,msg_text)=>{
    document.querySelector(selector_input).classList.add("error")
    document.querySelector(selector_msg).classList.add("error")
    document.querySelector(selector_msg).innerHTML = msg_text
}

const turnOffErrorView =(selector_input,selector_msg,msg_text)=>{
    document.querySelector(selector_input).classList.remove("error")
    document.querySelector(selector_msg).classList.remove("error")
    document.querySelector(selector_msg).innerHTML = msg_text
}

const getUserData = ()=>{
    // let userName = prompt("Enter your name:") || alert("You haven`t inputed any data!")
    // let userAge = prompt("Enter your age:")
    // userAge>=18 || alert("You`re not adult") // - same res
    // userAge<18 && alert("You`re not adult") // - same res

    // get data
    let userName = document.querySelector(".form__name").value
    userName ? turnOffErrorView(".form__name",".form__name_error","") : turnOnErrorView(".form__name",".form__name_error","You haven`t inputed any data!")
}



// start
document.addEventListener("DOMContentLoaded",()=>{
    document.querySelector(".form").addEventListener("submit",(e)=>{
        e.preventDefault()
        getUserData()
    }) 
})