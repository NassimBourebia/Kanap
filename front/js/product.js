const idString = window.location.search            //Analyse
const urlParamss = new URLSearchParams(idString); //window.location.search peux être mis directement en parametre de la function 
const id = urlParamss.get("id")

fetch(`http://localhost:3000/api/products/${id}`) // Utiliser String interpolation avec `` 
.then(response => response.json())
.then(response => console.log(response));
