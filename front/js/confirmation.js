const orderId = getorderId()
displayOrderId(orderId)


function getorderId() {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    return urlParams.get("orderId")
  
}


function displayOrderId (orderId) {
   
    const orderIdElement = document.querySelector("#orderId")
    orderIdElement.textContent = orderId;
    window.localStorage.clear()

}

 