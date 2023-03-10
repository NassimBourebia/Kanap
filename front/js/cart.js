let cart = JSON.parse(localStorage.getItem('product') || "[]");
let totalQuantity = 0;
let totalPrice = 0;

// Récupère les produits du panier depuis l'API en utilisant l'ID stocké en localstorage
async function getProductsCart (cart) {
    return await Promise.all(cart.map(async item => {
        const id = item._id;
        // Fait une requête à l'API pour récupérer les informations sur le produit
        return await fetch(`http://localhost:3000/api/products/${id}`)
            .then(response => response.json())
            // Renvoie un objet avec les informations sur le produit, la couleur et la quantité
            .then(data => { return { ...data, color: item.color, quantity: item.quantity, } });
    }));
}

// Récupère les produits du panier et les affiche sur la page
cart = await getProductsCart (cart);

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

// Met à jour le total de la quantité et du prix pour tous les produits dans le panier
function displayTotalQuantity (product) {

    totalQuantity += product.quantity;
    totalPrice += product.price * product.quantity;
    document.querySelector("#totalQuantity").textContent = totalQuantity;
    document.querySelector("#totalPrice").textContent = totalPrice;
   
}

function makeCartContent (product) {
    const cardItemContent = document.createElement("div")
    cardItemContent.classList.add("cart__item__content")

    const description = makeDescription(product);
    const settings = makeSettings(product);

    cardItemContent.appendChild(description)
    cardItemContent.appendChild(settings)
    return cardItemContent


}
// Crée un élément div qui contiendra toutes les informations de l'élément du panier
function makeDescription (product) {
    const description = document.createElement("div");
    description.classList.add("cart__item__content__description");

    const h2 = document.createElement("h2")
    h2.textContent = product.name;
    const p = document.createElement("p")
    p.textContent = product.color;
    let pPrice = document.createElement("p")
    pPrice.textContent = product.price + "€";

    description.appendChild(h2);
    description.appendChild(p);
    description.appendChild(pPrice);
    return description
}
// Crée un élément div qui contiendra la description de l'élément du panier (nom, couleur, prix)
function makeSettings (product) {

    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")

    quantityToSettings(settings, product)
    deletToSettings(settings, product)
    return settings

}

// Crée un élément div qui contiendra les options de l'élément du panier (quantité, suppression)
function deletToSettings (settings, product) {
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__delete")
    div.addEventListener("click", () => {
        
        const totalCart = deleteProduct(product._id, product.color);
        div.parentNode.parentNode.parentNode.remove(); 
        
       
        document.querySelector("#totalPrice").textContent = totalCart.price;
        document.querySelector("#totalQuantity").textContent = totalCart.quantity;

    });
    
    const p = document.createElement("p")
    p.textContent = "Supprimer";
    div.appendChild(p)
    settings.appendChild(div)

}


function deleteProduct (id, color) {
    
    // Trouve l'index du produit à supprimer dans le tableau du panier
    const index = cart.findIndex(item => item._id === id && item.color === color);
  
    cart.splice(index, 1);
    
     const { quantity, price } = cart.reduce((total, product) => ({
        quantity: total.quantity + product.quantity,
        price: total.price + product.price * product.quantity
      }),
      { quantity: 0, price: 0 }
    );
     let newCart = cart.map(item => ({ _id: item._id, color : item.color, quantity : item.quantity}))
     localStorage.setItem("product", JSON.stringify(newCart));
    
    return { quantity, price };

}


function quantityToSettings (settings, product) {

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

        if(input.value<0 || input.value>100){
            input.value < 0 ? input.value = 1 : input.value > 100 ? input.value = 100 : input.value=product.quantity;
            return alert("The quantity must be between 0 and 100")
        }

        updateQuantity (product._id, parseInt(input.value), product.color)
        updatePrice ()
    })

    quantity.appendChild(input)
    settings.appendChild(quantity)
    return settings
}

//Mise à jour la quantité de l'article dans le tableau "cart" en utilisant la méthode "find" 
function updateQuantity (id, newQuantity, color) {

    const item = cart.find(item => item._id === id);
    item.quantity = newQuantity;
    totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelector("#totalQuantity").textContent = totalQuantity;
    updateQuantityInLocalStorage(id, newQuantity, color)
    
}

function updateQuantityInLocalStorage (id, newQuantity, color) {
    let product = JSON.parse(localStorage.getItem("product"));
    product = product.map(item => {
        if (item._id === id && item.color === color) {
            return {
                ...item,
                quantity: newQuantity
            }
        }
        return item
    });
    
    localStorage.setItem("product", JSON.stringify(product));

}




//Mise à jour du prix total de la commande en utilisant la méthode "reduce" sur le tableau "cart"
function updatePrice () {
    totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0); //function accumulateur
    document.querySelector("#totalPrice").textContent = totalPrice;
}

function makeArticle (product) {
    const article = document.createElement("article");
    article.classList.add("cart__item")
    article.dataset.id = product.id;
    article.dataset.id = product.color;
    return article
}

function makeDivImage (product) {
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
    alert("merci de sélectionner des produits dans votre panier avant de passer commande") // Affiche un message d'erreur si le panier est vide et arrête l'exécution de la fonction
    return
    
    }
   // Vérifie si les différents champs du formulaire sont valides. Si un des champs n'est pas valide, la fonction s'arrête
    
   if  (formInvalid ()) return
   if (emailInvalid ()) return
   if (firstNameInvalid ()) return
   if (lastNameInvalid ()) return
   if (cityInvalid ()) return
   
  

     const body = makeRequestBody() 
//Envoi la requête HTTP "POST" à l'URL 
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {

             "Content-Type": "application/json"
        }     
     })
     .then((res) => res.json())
     .then((data) => {
        const orderId = data.orderId
        window.location.href = "/front/html/confirmation.html" + "?orderId=" + orderId
       return console.log(data)

     })
     .catch((err) => console.log(err));
}
//Vérifie si tous les champs du formulaire sont remplis.
  function formInvalid () {
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

//Vérifie si l'email, prénom, nom, ville saisi est valide


  function emailInvalid () { 
    
   const emailError = document.querySelector("#emailErrorMsg"); 
   const email = document.querySelector("#email").value
   const regex = /^[A-Za-z0-9+_.-]+@(.+)\.([A-Za-z]){1,}$/;

   if (regex.test(email) === false) {

    emailError.textContent = "L'email n'est pas correctement saisie"
    return regex.test(email) === false

   }   
 }


   function firstNameInvalid () {
     
    const firstNameError = document.querySelector("#firstNameErrorMsg")
    const firstName = document.querySelector("#firstName").value
    const regex = /^[A-Za-z]+$/; 

    if(regex.test(firstName) === false){

     firstNameError.textContent = "Le prénom ne doit pas contenir de chiffres";
     return regex.test(firstName) === false

    }   
   }


   function lastNameInvalid () {

    const lastNameError = document.querySelector("#lastNameErrorMsg")
    const lastName = document.querySelector("#lastName").value
    const regex = /^[A-Za-z]+$/; 

    if(regex.test(lastName) === false) {

     lastNameError.textContent = "Le nom ne doit pas contenir de chiffres"; 
     return regex.test(lastName) === false

    }
   }
   
   function cityInvalid () {
    
    const cityError = document.querySelector("#cityErrorMsg");
    const city = document.querySelector("#city").value
    const regex = /^[A-Za-z]+$/; 

    if(regex.test(city) === false){

      cityError.textContent ="La ville ne doit pas contenir de chiffres"; 
      return regex.test(city) === false  
    }
    

   }

  //Création de l'objet "body" qui contient les informations de contact de la commande
function makeRequestBody () { 

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