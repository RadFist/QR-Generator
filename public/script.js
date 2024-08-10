let button = document.querySelector("button");
let input = document.querySelector("input");
let img = document.querySelector("#img-section");

button.addEventListener("click",function(e){
    input.classList.add("red-border");
    button.classList.toggle("green");
})

if( visibleImg == true ){
    img.classList.remove("invisible");
}