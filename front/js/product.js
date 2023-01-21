const idString = window.location.search             // Récupère les paramètres de l'URL
const urlParamss = new URLSearchParams(idString);   // Crée un objet URLSearchParams pour faciliter l'accès aux paramètres 
const id = urlParamss.get ("id")                    // Récupère l'ID du produit à partir des paramètres de l'URL
let priceForLocalStorage = 0;                       // Variable globale pour stocker le prix du produit
let imgUrl, altText, nameArticle;

const products = JSON.parse(localStorage.getItem('product') || '[]')      // Récupère les produits enregistrés dans le localStorage

fetch(`http://localhost:3000/api/products/${id}`)  // Fait une requête vers l'API pour récupérer les informations du produit 
    .then(response => response.json())
    .then(response => displayData(response));



function displayData (kanap) {            // Fonction pour afficher les données du produit sur la page

    //Ce code peux être écrit d'une maniére plus compact 

    const name = kanap.name;                //---> const {_id, name, imageUrl, description, colors, price, altTxt} = kanap ; 
    const imageUrl = kanap.imageUrl;
    const description = kanap.description;
    const colors = kanap.colors;
    const price = kanap.price;
    const altTxt = kanap.altTxt;
    priceForLocalStorage = price;
    imgUrl = imageUrl;
    altText = altTxt;
    nameArticle = name;

    makeImage (altTxt, imageUrl);        // Utilise les informations pour mettre à jour le contenu de la page
    makeTitle (name);
    makePrice (price);
    makeDescription (description);
    makeColors (colors);



}
function makeImage (altTxt, imageUrl) {                 // Fonction pour créer l'image du produit

    const image = document.createElement("img")
    image.src = imageUrl;
    image.alt = altTxt;
    const itemsImg = document.querySelector(".item__img").appendChild(image)
}

function makeTitle (name) {

    const h1 = document.querySelector("#title");
    h1.textContent = name;
}

function makePrice (price) {

    const span = document.querySelector("#price");
    span.textContent = price;
}

function makeDescription (description) {

    const paragraphDescrip = document.querySelector("#description");
    paragraphDescrip.textContent = description;
}

function makeColors (colors) {

    const select = document.querySelector("#colors")

    if (select != null) {
        colors.forEach((color) => {
            const option = document.createElement("option");
            option.value = color;
            option.textContent = color;
            select.appendChild(option)

        });
    }
}

//Ajout des EVENTS

const button = document.querySelector("#addToCart");

button.addEventListener("click", clickOnButton)




//Fonction exécutée lorsque le bouton est cliqué
function clickOnButton() {

    const selectColor = document.querySelector("#colors");
    const color = selectColor.value
    const quantity = document.querySelector("#quantity").value

    //Si l'utilisateur n'a pas sélectionné de couleur ou de quantité, une alerte est affichée et la fonction s'arrête
    if (orderValid(color, quantity)) return 
    //Sinon, la fonction "addOrder" est exécutée avec les valeurs sélectionnées pour la couleur et la quantité
    addOrder(color, quantity)
    //La page est redirigée vers la page "cart.html"
    goToCartPage()
}

//Fonction pour ajouter l'objet de commande au localStorage
function addOrder (color, quantity) {
    //Création d'un objet avec les données de la commande
    const objetData = {

        id: id,
        color: color,
        quantity: parseInt(quantity),
    }

    //Recherche de l'index de l'objet de commande existant dans le tableau de produits
    const index = products.findIndex((product) => product._id === objetData.id || product.color === objetData.color);
    if (index !== -1) {
        
        //Si l'objet existe déjà, la quantité est mise à jour
        products[index].quantity += objetData.quantity;

    } else {

        products.push(objetData);

    }

    localStorage.setItem('product', JSON.stringify(products));

    //  localStorage.setItem(id, JSON.stringify(objetData));   //Pour le localStorage il faut que les data soit en JSON 

}
function orderValid (color, quantity) {

    if (color == null || color == "" || quantity == 0 || quantity == "") {

        alert("Veuillez sélectionner une couleur et une quantité");
        return true    //Cette fonction return true pour que la valeurs soit récupérer plus haut
    }
}

function goToCartPage() { window.location.href = "cart.html"; }







