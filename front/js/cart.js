let cart = JSON.parse(localStorage.getItem('product') || "[]");
let totalQuantity = 0;
let totalPrice = 0;

async function getProductsCart(cart) {
    return await Promise.all(cart.map(async item => {
        const id = item.id;

        return await fetch(`http://localhost:3000/api/products/${id}`)
            .then(response => response.json())
            .then(data => { return { ...data, color: item.color, quantity: item.quantity, } });
    }));
}

cart = await getProductsCart(cart);


cart.map(product => displayItem(product)).join("");

function displayItem(product) {

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




function makeCartContent(product) {
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

function makeSettings(product) {

    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")

    quantityToSettings(settings, product)
    deletToSettings(settings, product)
    return settings

}
function deletToSettings(settings, product) {
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__delete")
    div.addEventListener("click", () => {
        deleteProduct(product.id, product.color);
        div.parentNode.parentNode.parentNode.remove(); 
        updatePrice();
    });
    

    const p = document.createElement("p")
    p.textContent = "Supprimer";
    div.appendChild(p)
    settings.appendChild(div)


}
function deleteProduct(id, color) {
    let cart = JSON.parse(localStorage.getItem('product') || "[]");


    // Trouve l'index du produit à supprimer dans le tableau du panier
    const index = cart.findIndex(item => item.id === id && item.color === color);
    // Supprime le produit du tableau du panier
    cart.splice(index, 1);

    // Mettre à jour le panier dans le stockage local
    localStorage.setItem("product", JSON.stringify(cart));
    location.reload(); //Permet de update le total 


}



function quantityToSettings(settings, product) {

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

        updateQuantity(product._id, parseInt(input.value), product.color)
        updatePrice()
    })

    quantity.appendChild(input)
    settings.appendChild(quantity)
    return settings
}


function updateQuantity(id, newQuantity, color) {

    const item = cart.find(item => item._id === id);
    item.quantity = newQuantity;
    totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector("#totalQuantity").textContent = totalQuantity;
    updateQuantityInLocalStorage(id, newQuantity, color)
}

function updateQuantityInLocalStorage(id, newQuantity, color) {
    let cart = JSON.parse(localStorage.getItem('product') || "[]");
    cart = cart.map(item => {
        if (item.id === id && item.color === color) {
            return {
                ...item,
                quantity: newQuantity
            }
        }
        return item
    });
    
    localStorage.setItem("product", JSON.stringify(cart));

}




function updatePrice() {
    totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0); //function accumulateur
    document.querySelector("#totalPrice").textContent = totalPrice;
}

function makeArticle(product) {
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



 //FORM
const orderButton = document.querySelector('#order'); 



orderButton.addEventListener("click", (e) => submit(e))

function submit(e) { 
    
    e.preventDefault()
    if (cart.length === 0) {
    alert("merci de sélectionner des produits dans votre panier avant de passer commande")
    return
    
    }
   
   if  (formInvalid()) return
   if (emailInvalid()) return


     const body = makeRequestBody() 

    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {

             "Content-Type": "application/json"
        } 
       
        
     })
     .then((res) => res.json())
     .then((data) => console.log(data))
    
    
    }

  function formInvalid() {
  const form = document.querySelector(".cart__order__form")
  const inputs = form.querySelectorAll("input");
  inputs.forEach((input) => {
    if (input.value === "") {

        alert("Veuillez remplir tous les champs")
        return true
    }
    return false
  })
  }


  function emailInvalid () { 
   const email = document.querySelector("#email").value
   const regex = /^[A-Za-z0-9+_.-]+@(.+)\.([A-Za-z]){1,}$/
   if (regex.test(email) === false) {
    alert("Veuillez saisir une adresse e-mail valide")
    return true
    
   }
   return false
   }


function makeRequestBody() { 

    const form = document.querySelector(".cart__order__form");

    const firstName = form.elements.firstName.value
    const lastName = form.elements.lastName.value
    const address = form.elements.address.value
    const city = form.elements.city.value
    const email = form.elements.email.value
    const body = {
        contact: {
           firstName: firstName,
           lastName: lastName, 
           address: address,
           city: city,
           email: email
        },
         products : cart.map(product => product._id)
    }
   
    return body
 }



