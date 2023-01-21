
// Fetch les produits depuis l'API
fetch('http://localhost:3000/api/products/')
  .then(response => response.json())
  .then((data) => addProducts(data))


// Fonction pour ajouter les produits à la page 
function addProducts(data) {
   
//Boucle sur chaque produit
  data.forEach ((kanap) => {                                 

    const { _id, imageUrl, altTxt, name, description } = kanap          //Destructuring  

    // Crée les éléments de la page en utilisant des fonctions dédiées
    const image = makeImage (imageUrl, altTxt);
    const anchor = makeAnchor (_id);
    const article = document.createElement ("article");
    const h3 = makeH3 (name)
    const paragraph = makeParagraph (description)
    const items = document.getElementById ('items');

    // Ajoute les éléments enfant à leur parent respectif
    article.appendChild (image)
    article.appendChild (h3)
    article.appendChild (paragraph)
    items.appendChild (anchor);
    anchor.appendChild (article);

  })
};

// Fonction pour créer un élément <a> avec un lien vers la page de produit
function makeAnchor (id) {
  const anchor = document.createElement('a');
  anchor.href = "./product.html?id=" + id
  return anchor
}

// Fonction pour créer un élément <img> avec une URL et un texte alternatif
function makeImage (imageUrl, altTxt) {
  const image = document.createElement("img")
  image.src = imageUrl;
  image.alt = altTxt;
  return image
}

// Fonction pour créer un élément <h3> avec le nom du produit
function makeH3 (name) {
  const h3 = document.createElement("h3");
  h3.textContent = name;
  h3.classList.add("productName");
  return h3;
}

// Fonction pour créer un élément <p> avec la description du produit
function makeParagraph (description) {

  const paragraph = document.createElement("p");
  paragraph.textContent = description;
  paragraph.classList.add("productDescription");
  return paragraph;

}


