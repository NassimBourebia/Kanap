
const cart = [];

getItemFromLocalStorage ()
cart.forEach((item) => displayItem(item))


function getItemFromLocalStorage () {
    const numberItem  = localStorage.length
    for(let i = 0; i < numberItem; i ++) {

        const item = localStorage.getItem(localStorage.key(i))
        const itemToObject = JSON.parse(item) //JSON.parse permet de prendre la string du storage et la mettre en objet json (contraire de JSON.stingify)
        cart.push(itemToObject)
    }
}

function displayItem (item) {

    const article = makeArticle(item); 
    const divImage = makeDivImage(item);
    article.appendChild(divImage)

    const cardItemContent = makeCartContent(item);
    article.appendChild(cardItemContent)
    displayArticle(article)
}


function displayArticle(article) {

    document.querySelector("#cart__items").appendChild(article);     
}


function makeCartContent(item){
    const cardItemContent = document.createElement("div")
    cardItemContent.classList.add("cart__item__content")

    const description = makeDescription(item); 
    const settings = makeSettings(item); 

    cardItemContent.appendChild(description)
    cardItemContent.appendChild(settings)
    return cardItemContent
    
   
}

function makeDescription(item) {
    const description = document.createElement("div");
    description.classList.add("cart__item__content__description");
  
    const h2 = document.createElement("h2")
    h2.textContent = item.name;
    const p = document.createElement("p")
    p.textContent = item.color;
    let pPrice = document.createElement("p")
    pPrice.textContent = item.price + " €";
  
    description.appendChild(h2);
    description.appendChild(p);
    description.appendChild(pPrice);
    return description
}

function makeSettings(item){

    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")

    quantityToSettings(settings,item)
    return settings

}
function quantityToSettings(settings, item){

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
   input.value = item.quantity
   settings.appendChild(input)
   return settings
}


function makeArticle (item) {
    const article = document.createElement("article"); 
    article.classList.add("card__item")
    article.dataset.id = item.id;
    article.dataset.id = item.color;
    return article
}

function makeDivImage(item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__img")

    const image = document.createElement("img"); 
    image.src = item.imageUrl; 
    image.alt = item.altTxt;
    div.appendChild(image)
    return div 
}

