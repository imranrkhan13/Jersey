     // Select DOM elements
     let cartIcon = document.querySelector("#cart-icon");
     let cart = document.querySelector(".cart");
     let closeCart = document.querySelector("#close-cart");
     let xButton = document.querySelector("#x-button");

     // Open cart
     cartIcon.onclick = () => {
         cart.classList.add("active");
     };

     // Close cart
     closeCart.onclick = () => {
         cart.classList.remove("active");
     };

     // Close cart with x button
     xButton.onclick = () => {
         cart.classList.remove("active");
     };

     // Check if DOM is loaded
     if (document.readyState == "loading") {
         document.addEventListener("DOMContentLoaded", ready);
     } else {
         ready();
     }

     // Function to initialize the cart
     function ready() {
         // Remove items from cart
         var removeCartButtons = document.getElementsByClassName('cart-remove');
         for (var i = 0; i < removeCartButtons.length; i++) {
             var button = removeCartButtons[i];
             button.addEventListener('click', removeCartItem);
         }

         // Quantity changes
         var quantityInputs = document.getElementsByClassName('cart-quantity');
         for (var i = 0; i < quantityInputs.length; i++) {
             var input = quantityInputs[i];
             input.addEventListener("change", quantityChanged);
         }

         // Add to cart
         var addCart = document.getElementsByClassName('add-cart');
         for (var i = 0; i < addCart.length; i++) {
             var button = addCart[i];
             button.addEventListener("click", addCartClicked);
         }

         // Buy button work
         document
             .getElementsByClassName('btn-buy')[0]
             .addEventListener('click', buyButtonClicked);
     }

     // Remove item from cart
     function removeCartItem(event) {
         var buttonClicked = event.target;
         buttonClicked.parentElement.remove();
         updatetotal();
     }

     // Quantity changes
     function quantityChanged(event) {
         var input = event.target;
         if (isNaN(input.value) || input.value <= 0) {
             input.value = 1;
         }
         updatetotal();
     }

     // Add to cart
     function addCartClicked(event) {
         var button = event.target;
         var shopProducts = button.parentElement;
         var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
         var price = shopProducts.getElementsByClassName('price')[0].innerText;
         var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
         addProductToCart(title, price, productImg);
         updatetotal();
     }

     // Add product to cart
     function addProductToCart(title, price, productImg) {
         var cartItems = document.getElementsByClassName('cart-content')[0];
         var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
         
         for (var i = 0; i < cartItemsNames.length; i++) {
             if (cartItemsNames[i].innerText.trim().toLowerCase() === title.trim().toLowerCase()) {
                 showNotification(title + " jersey is already in the cart");
                 return;
             }
         }

         var cartShopBox = document.createElement("div");
         cartShopBox.classList.add('cart-box');

         var cartBoxContent = `
         <img src="${productImg}" alt="Product Image" class="cart-img">
         <div class="detail-box">
                 <div class="cart-product-title">${title}</div>
                 <div class="cart-price">${price}</div>
                 <label for="size">Select Size:</label>
                 <select name="size" class="cart-size">
                     <option value="S">S</option>
                     <option value="M">M</option>
                     <option value="L">L</option>
                     <option value="XL">XL</option>
                 </select>
                 <input type="number" value="1" class="cart-quantity">
             </div>
             <i class='bx bxs-trash-alt cart-remove'></i>`;

         cartShopBox.innerHTML = cartBoxContent;
         cartItems.append(cartShopBox);
         cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
         cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);

         showNotification(title + " jersey had been added to cart");
     }

     // Buy button
     function buyButtonClicked() {
         var cartContent = document.getElementsByClassName('cart-content')[0];
         var cartBoxes = cartContent.getElementsByClassName("cart-box");
         
         if (cartBoxes.length === 0) {
             showNotification("Your cart is empty. Add items before proceeding.");
             return;
         }

         var purchaseItems = [];

         for (var i = 0; i < cartBoxes.length; i++) {
            var cartBox = cartBoxes[i];
            var titleElement = cartBox.getElementsByClassName("cart-product-title")[0];
            var priceElement = cartBox.getElementsByClassName("cart-price")[0];
            var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
            var sizeElement = cartBox.getElementsByClassName("cart-size")[0];
            var imgElement = cartBox.getElementsByClassName("cart-img")[0];
    
            var item = {
                title: titleElement.innerText,
                price: priceElement.innerText,
                quantity: quantityElement.value,
                size: sizeElement.value,
                productImg: imgElement.src  // This should now contain the full image path
            };
    
            purchaseItems.push(item);
        }

         localStorage.setItem('purchaseItems', JSON.stringify(purchaseItems));
         window.location.href = 'checkout.html';
     }

     // Update total
     function updatetotal() {
         var cartContent = document.getElementsByClassName("cart-content")[0];
         var cartBoxes = cartContent.getElementsByClassName("cart-box");
         var total = 0;
         for (var i = 0; i < cartBoxes.length; i++) {
             var cartBox = cartBoxes[i];
             var priceElement = cartBox.getElementsByClassName("cart-price")[0];
             var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
             var price = parseFloat(priceElement.innerText.replace("$", ""));
             var quantity = quantityElement.value;
             total = total + (price * quantity);
         }
         total = Math.round(total * 100) / 100;
         document.getElementsByClassName('total-price')[0].innerText = "$" + total;
     }

     // Show notification
     function showNotification(message) {
         const notification = document.createElement('div');
         notification.classList.add('notification');
         notification.textContent = message;
         document.body.appendChild(notification);

         setTimeout(() => {
             notification.classList.add('show');
         }, 10);

         setTimeout(() => {
             notification.classList.remove('show');
             setTimeout(() => {
                 notification.remove();
             }, 300);
         }, 3000);
     }
