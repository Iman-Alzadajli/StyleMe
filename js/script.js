// API LINKS 
const baseUrl = "https://fakestoreapi.com"; // fake Api
const productUrl = baseUrl + "/products";   // product url 

//define variables 
let productList; // will save products from API here after beinging them  using featch
let htmlProductList = document.getElementById("productList"); // bring the one who have the same id in the html file
let htmlCategoryList = document.getElementById("categoryList"); // being too 
let searchInput = document.getElementById("search"); // //bring too 


// bring product from the api 
async function fetchProducts() {
    try {
        let response = await fetch(productUrl); // try to get the products from the API
        let data = await response.json();       // turn it to JSON format

        productList = data;     // save data in the productList variable
                        
    } catch (error) {
        console.error("Error fetching products:", error); // if somthing wrong 
    }
}

//

//display cards for products
async function displayProducts(filter = '') { 
    await fetchProducts(); // wait for products to be fetched
    htmlProductList.innerHTML = ""; //for now its empty from html so no doublcateproduvt come twice happens 

    // filter products based on search input
    productList
        .filter(product =>
            product.title.toLowerCase().includes(filter) || //search of what include in filter title and cat came from json file of the api 
            product.category.toLowerCase().includes(filter)
        )
        .forEach(product => { 
            //Bootstrap for each care   // this down code each time make new care and dont delete the old one ( htmlProductList.innerHTML += ` )
            htmlProductList.innerHTML += ` 
        <div class="card">
            <div>
                <div>
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div>
                    <div class="card-body"> 
                        <h4>${product.title}</h4>
                        <p class="card-text">$${product.price}</p>
                        <p class="card-text"><small class="text-muted">${product.category}</small></p>
                        <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>`;
        });
}


//show categories in the page
function renderCategories() {
    const categories = [...new Set(productList.map(p => p.category))]; //  get categories then use set to remove duplicates
    // clear previous categories
    htmlCategoryList.innerHTML = "";

    categories.forEach(cat => {
        let btn = document.createElement("button");
        btn.className = "category-btn"; // give class name so we can use it in css 
        btn.textContent = cat; // set the text of the button to the category name
        btn.onclick = () => displayProducts(cat.toLowerCase()); // when clicked, filter products by category
        htmlCategoryList.appendChild(btn); // add the button to the categorylist 
    });
}



let cart = []; // cart to store products added 

function addToCart(productId) { 
    let cart = JSON.parse(localStorage.getItem("cart")) || []; // get cart from local storage or initialize it as an empty array
    //check if the product is already in the cart
    let existing = cart.find(p => p.id === productId);

    if (existing) {
       // if yes you can add more but not more than 100
        if (existing.quantity <= 100) {
            existing.quantity += 1; // you can added one 
        }
    } else {
        // if no product add it to the cart
        const product = productList.find(p => p.id === productId);
        if (product) {
            cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
    }

    // save the cart to local storage when you add product it get saved in the local storage
    localStorage.setItem("cart", JSON.stringify(cart));

    alert("added to cart ✅"); //if got adeed to cart show this message
}




// عند الكتابة في مربع البحث
searchInput.addEventListener("input", e => {
    displayProducts(e.target.value.toLowerCase());
});

// عند تحميل الصفحة: نعرض المنتجات والتصنيفات
window.addEventListener("DOMContentLoaded", async () => {
    await displayProducts();
    renderCategories();
});
