
fetch('http://localhost:3000/api/products/')
.then(response => response.json())
.then((data) => addProducts(data))

 

function addProducts(data) {
  
  /*const _id = data[0]._id; 
  const imageUrl = data[0].imageUrl;
  const altTxt = data[0].altTxt;
  const name = data[0].name;
  const description = data[0].description;*/
  
  
  data.forEach((kanap) => {                                 //Boucle 
    
  const { _id, imageUrl, altTxt, name, description} = kanap          //Destructuring  

  const image = makeImage(imageUrl,altTxt);
  const anchor = makeAnchor(_id);
  const article = document.createElement("article");
  const h3 = makeH3(name)
  const paragraph = makeParagraph(description)
  const items = document.getElementById('items');
  
  
  //appendchild
  article.appendChild(image)
  article.appendChild(h3)
  article.appendChild(paragraph) 

  items.appendChild(anchor);
  anchor.appendChild(article);

  }) 
  };

  //Mes fonctions 


  function makeAnchor (id) {                    
    const anchor = document.createElement('a');                                             
    anchor.href = "./product.html?id=" + id
    return anchor 
   }

  function makeImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl;
    image.alt = altTxt;
    return image
    
  }

  function makeH3 (name) {
      const h3 = document.createElement("h3");
      h3.textContent = name;
      h3.classList.add("productName");
      return h3 ; 
  }

   function makeParagraph(description) {

  const paragraph = document.createElement("p");
  paragraph.textContent = description ;
  paragraph.classList.add("productDescription");
  return paragraph;

 }


