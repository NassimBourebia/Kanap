const idString = window.location.search            //Analyse
const urlParamss = new URLSearchParams(idString); //window.location.search peux être mis directement en parametre de la function 
const id = urlParamss.get("id")
let priceForLocalStorage = 0;    //Variable globale pour le prix 
let imgUrl,altText; 
fetch(`http://localhost:3000/api/products/${id}`) // Utiliser String interpolation avec `` 
.then(response => response.json())
.then(response => displayData(response));


function displayData (kanap) {

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
   

    makeImage(altTxt, imageUrl); 
    makeTitle(name);
    makePrice(price); 
    makeDescription(description);
    makeColors(colors);
   
   

}
    function makeImage(altTxt, imageUrl) {
    
    const image = document.createElement("img")
    image.src = imageUrl;
    image.alt = altTxt;
    const itemsImg = document.querySelector(".item__img").appendChild(image);
   
    }

    function makeTitle (name) {
       
        const h1 = document.querySelector("#title");
        h1.textContent = name ; 
    }

    function makePrice(price) {

        const span = document.querySelector("#price");
        span.textContent = price;
    }

    function makeDescription (description) {

        const paragraphDescrip = document.querySelector("#description"); 
        paragraphDescrip.textContent = description; 
    }

    function makeColors(colors) { 

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
     if (button != null) {
        button.addEventListener("click", (e) => {
     
            const color = document.querySelector("#colors").value
            const quantity = document.querySelector ("#quantity").value
            if (orderValid(color, quantity)) return //Fonction si l'utilisateur ne sélectionne pas d'options
            addCart(color, quantity)

            window.location.href = "cart.html"; 
    
         })
     }
     
     function addCart(color, quantity) {
        const objetData = {
    
            id : id, 
            color : color,
            quantity : Number (quantity),
            price : Number(priceForLocalStorage),
            imgeUrl : imgUrl,
            altTxt : altText
        }

        localStorage.setItem(id, JSON.stringify(objetData));   //Pour le localStorage il faut que les data soit en JSON 

     }
     function orderValid(color, quantity) {

        if (color == null || color == "" || quantity == 0 || quantity == "") {
           
           alert("Veuillez sélectionner une couleur et une quantité"); 
           return true    //Cette fonction return true pour que la valeurs soit récupérer plus haut
        }
       }  
       
   






  
