const fetchDataButton = document.getElementById('fetchDataButton')
const productDataDiv = document.getElementById('productData')

fetchDataButton.addEventListener('click', () => {
    //make a fetch request to /api/v1/products
    fetch('/api/v1/products')
    .then((response) => {
        if(response.ok){
            return response.json();
        }else{
            throw new Error('Network response was not ok');
        }
    })
    .then((data) => {
        //clear the div
        productDataDiv.innerHTML = '';
        //loop through the products and display them 
        data.forEach((p) => {
            const productElement = document.createElement("div")
            productElement.innerHTML =`
            <h3> ${p.name}</h3>
            <p> Price : $${p.price}</p>
            <img src="${p.image}" alt="${p.name}" style="max-width:200px">
            <p>${p.desc}`;
            productDataDiv.appendChild(productElement);
        });
    })
    .catch((error) => {
        console.log('Error : ', error)
    })
})
    