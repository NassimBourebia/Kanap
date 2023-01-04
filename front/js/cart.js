 

const cart = JSON.parse(localStorage.getItem('product') || "[]");

cart.forEach(item => {
    const id = item.id;

 fetch(`http://localhost:3000/api/products/${id}`)
  .then(response => response.json())
  .then(data => {
    const product = { ...data, color: item.color, quantity: item.quantity } 

    displayItem(product); 
  });
});


function displayItem (product) {

    const article = makeArticle(product); 
    const divImage = makeDivImage(product);
    article.appendChild(divImage)

    const cardItemContent = makeCartContent(product);
    article.appendChild(cardItemContent)
    displayArticle(article)

    function displayArticle() {

        document.querySelector("#cart__items").appendChild(article);
              
    }
    displayTotalQuantity(product)
}

function displayTotalQuantity(product) {
    const totalQuantity = document.querySelector("#totalQuantity"); 
    totalQuantity.textContent = product.quantity
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
    pPrice.textContent = product.price + " €";
  
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


    p.addEventListener('click', function () {
        
    })

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
   input.value = parseInt(product.quantity)
   quantity.appendChild(input)
   settings.appendChild(quantity)
   return settings
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

