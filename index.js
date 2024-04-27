let showProduct = document.querySelector("#show-products");
let searchInput = document.querySelector("#search");
let searchBtn = document.querySelector("#searchBtn");
let sortPrice = document.querySelector("#sort-price");
let selectCategory = document.querySelector("#category");

let data;
async function getData(URL){
    try {
        let res = await fetch(URL);
        let finalres = await res.json();
        showData(finalres);
        data = finalres;
    } catch (error) {
        console.log("error:",error);
    }
}
getData(`https://fakestoreapi.com/products`);

//=========================Function Show Data=========================//
function showData(products){
showProduct.innerHTML = "";
    products.forEach((ele, i) => {
        let card = document.createElement("div");
        card.className = "card";

        let imgDiv = document.createElement("div");
        imgDiv.className = "imgDiv"

        let image = document.createElement("img");
        image.src = ele.image;
        image.className = "image";

        let detailsDiv = document.createElement("div");
        detailsDiv.className = "detailsDiv";

        let title = document.createElement("h2");
        title.className = "title";
        title.textContent = `${ele.title}`;

        let price = document.createElement("p");
        price.className = "price";
        price.textContent = `Price: ${ele.price}`;

        imgDiv.append(image);
        detailsDiv.append(title, price);
        card.append(imgDiv, detailsDiv);
        showProduct.append(card);
    })
}

//=========================Function Search Item=========================//
function searchItem(){
    let value = searchInput.value;
   let arr = data.filter((ele) => {
        return value.toLowerCase() === ele.title.toLowerCase()
    })

    if(arr.length == 0){
        showProduct.innerHTML = `<h1>Product Not Found...</h1>`
    }else{
        showData(arr);
    }
}
searchBtn.addEventListener("click", searchItem);

//=======================Function Filter Category======================//
function filterCategory(){
    let arr;
    let value = selectCategory.value;

    arr = data.filter((ele)=>{
        return value == ele.category;
    })
    showData(arr);
}
selectCategory.addEventListener("change", filterCategory);

//=====================Function Sort Price======================//
function sorTPrice(){
    let arr;
    let value = sortPrice.value;

    if(value == "lowtohigh"){
        arr = data.sort((a,b) => {
            return a.price - b.price;
        })
    }else if(value == "hightolow"){
        arr = data.sort((a,b) => {
            return b.price - a.price;
        })
    }

    showData(arr)
}
sortPrice.addEventListener("change",sorTPrice);