const idString = window.location.search
const urlParams = new URLSearchParams(idString); 
const idProduct = urlParams.get("id")
console.log(idProduct);