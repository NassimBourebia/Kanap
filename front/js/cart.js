
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
    displayArticle(article)
    console.log(article);
    const div = makeDivImage(item);
    article.appendChild(div)
}
function displayArticle(article) {

    document.querySelector("#cart__items").appendChild(article); 
    
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

function makeArticle (item) {
    const article = document.createElement("article"); 
    article.classList.add("card__item")
    article.dataset.id = item.id;
    article.dataset.id = item.color;
    return article
}
