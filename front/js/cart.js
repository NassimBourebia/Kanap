let cart = JSON.parse(localStorage.getItem('product') || "[]");
console.log(cart.map(item => item));
let totalQuantity = 0; 
let totalPrice = 0; 

async function getProductsCart(cart) {
    return await Promise.all(cart.map(async item => {
        const id = item.id;

         return await fetch(`http://localhost:3000/api/products/${id}`)
                        .then(response => response.json())
                        .then(data => { return { ...data, color: item.color, quantity: item.quantity, } } );
    }));
}

cart = await getProductsCart(cart);


cart.map(product => displayItem(product)).join("");

function displayItem (product) {

    const article = makeArticle(product); 
    const divImage = makeDivImage(product);
    article.appendChild(divImage)

    const cardItemContent = makeCartContent(product);
    article.appendChild(cardItemContent)
    document.querySelector("#cart__items").appendChild(article);

    displayTotalQuantity(product)

}


function displayTotalQuantity(product) {
    
    totalQuantity += product.quantity; 
    totalPrice += product.price * product.quantity; 
    document.querySelector("#totalQuantity").textContent = totalQuantity; 
    document.querySelector("#totalPrice").textContent = totalPrice; 
     
  }




function makeCartContent(product){
    const cardItemContent = document.createElement("div")
    cardItemContent.classList.add("cart__item__content")

    const description = makeDescription(product); 
    const settings = makeSettings(product); 

    cardItemContent.appendChild(description)
    cardItemContent.appendChild(settings)
    return cardItemContent
    
   
}

function makeDescription(product) {
    const description = document.createElement("div");
    description.classList.add("cart__item__content__description");
  
    const h2 = document.createElement("h2")
    h2.textContent = product.name;
    const p = document.createElement("p")
    p.textContent = product.color;
    let pPrice = document.createElement("p")
    pPrice.textContent = product.price;
  
    description.appendChild(h2);
    description.appendChild(p);
    description.appendChild(pPrice);
    return description
}

function makeSettings(product){

    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")

    quantityToSettings(settings,product)
    deletToSettings(settings)
    return settings

}
function deletToSettings(settings){
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__delete")
    const p = document.createElement("p")
    p.textContent = "Supprimer"; 
    div.appendChild(p)
    settings.appendChild(div)


}


function quantityToSettings(settings, product){

    const quantity = document.createElement("div")
   quantity.classList.add("cart__item__content__settings__quantity")
   const p = document.createElement("p")
   p.textContent = "Qté :"; 
   quantity.appendChild(p); 

   const input = document.createElement("input")
   input.type = "number"
   input.classList.add("itemQuantity")
   input.name = "itemQuantity"; 
   input.min = "1"
   input.max = "100"
   input.value = product.quantity
   
   input.addEventListener("input", () => {

    updateQuantity( product._id, parseInt(input.value)) 
        updatePrice()
    })
   
   quantity.appendChild(input)
   settings.appendChild(quantity)
   return settings
}


function updateQuantity(id, newQuantity) {

    const item = cart.find(item => item._id === id);
    item.quantity = newQuantity;
   
    totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector("#totalQuantity").textContent = totalQuantity; 
    updateQuantityInLocalStorage(id, newQuantity)
}

function updateQuantityInLocalStorage(id, newQuantity) {
    let cart = JSON.parse(localStorage.getItem('product') || "[]");
    cart = cart.map(item => {
        if (item._id === id) {
            item.quantity = newQuantity;
        }
        return item;
    });
    localStorage.setItem("product", JSON.stringify(cart));
}




function updatePrice() {
    totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0); //function accumulateur
     document.querySelector("#totalPrice").textContent = totalPrice;
}

function makeArticle (product) {
    const article = document.createElement("article"); 
    article.classList.add("card__item")
    article.dataset.id = product.id;
    article.dataset.id = product.color;
    return article
}

function makeDivImage(product) {
    const div = document.createElement("div")
    div.classList.add("cart__item__img")

    const image = document.createElement("img"); 
    image.src = product.imageUrl; 
    image.alt = product.altTxt;
    div.appendChild(image)
    return div 
}
