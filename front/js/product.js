const idString = window.location.search            //Analyse
const urlParamss = new URLSearchParams(idString); //window.location.search peux être mis directement en parametre de la function 
const id = urlParamss.get("id")

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



  
