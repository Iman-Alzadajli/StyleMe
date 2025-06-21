let cart = JSON.parse(localStorage.getItem("cart")) || [];
let cartList = document.getElementById("cartList");
let totalPriceEl = document.getElementById("totalPrice");


function updateCartView() { // Function to update the cart display
  cartList.innerHTML = ""; // Clear current cart
  let total = 0; // Total price tracker

  cart.forEach((item, index) => { 
    total += item.price * item.quantity; // Calculate total price

    // Add HTML for each item in the cart
    cartList.innerHTML += ` 
      <div class="cart-item">
        <img src="${item.image}" alt="${item.title}">
        <h3>${item.title}</h3>
        <p>Price: $${item.price}</p>
        <p>
          Quantity:
          <input type="number" id="qty-${index}" value="${item.quantity}" min="1" max="100">
        </p>
        <button onclick="applyQuantity(${index})">Update Quantity</button>
        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });

  // Show total price
  totalPriceEl.textContent = `Total: $${total.toFixed(2)}`;
}


//update 
function updateQuantity(index) {
    // 
    let quantityInput = document.getElementById("qty-" + index); // get it of your quantity
    let value = quantityInput.value; // your current quantity but its text 

    // turn it to number 
    let newQty = parseInt(value);

    //checking 
    if (newQty >= 1 && newQty <= 100) {
        cart[index].quantity = newQty; // update quantity 
        localStorage.setItem("cart", JSON.stringify(cart)); // save it to local 
        updateCartView(); //show 


    } else {
        alert("quantity can be between 1 to 100");
    }
}

function removeItem(index) {
  cart.splice(index, 1); // Remove product from array
  localStorage.setItem("cart", JSON.stringify(cart)); // save 
  updateCartView(); 
}

//delete all 
 function clearCart() {
  if (confirm("Are you sure you want to clear the cart?")) {
    localStorage.removeItem("cart");
    cart = []; // make it empty 
    updateCartView();
  }
}

// Run this when the page first loads
updateCartView();
