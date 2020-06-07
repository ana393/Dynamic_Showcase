//Array of arrays
const Products = [
  {
    id: "apricot",
    name: "Apricot",
    price: "1.76",
    img: "apricot.png",
    amount: "1",
  },
  {
    id: "broccoli",
    name: "Broccoli",
    price: "2.50",
    img: "broccoli.png",
    amount: "1",
  },
  {
    id: "cherrie",
    name: "Cherrie",
    price: "3.50",
    img: "cherries.png",
    amount: "1",
  },
  {
    id: "orange",
    name: "Orange",
    price: "1.55",
    img: "orange.png",
    amount: "1",
  },
  {
    id: "potato",
    name: "Potato",
    price: "0.50",
    img: "potato.png",
    amount: "1",
  },
  {
    id: "radish",
    name: "Radish",
    price: "1.20",
    img: "radish.png",
    amount: "1",
  },
  {
    id: "tomatoe",
    name: "Tomatoe",
    price: "1.99",
    img: "tomato.png",
    amount: "1",
  },
  { id: "pear", name: "Pear", price: "1.99", img: "pear.png", amount: "1" },
];

const pathImg = "./assets/img";
//HTML display  Products Collection
const htmlProduct = Products.map(
  (product) =>
    (document.querySelector(".products-center").innerHTML += `
      <article class="product">
          <div class="img-container">
            <img
              id="${product.id}"
              class="product-img"
              src="${pathImg}/${product.img}"
 
              alt="${product.name}"
            />
          </div>
            <h3>${product.name}</h3>
            <h4>${product.price}€</h4>
        </article> 
    `)
);

//drag and Drop
const dragImgs = document.querySelectorAll(".product-img");
const dropTarget = document.querySelector("#cart-btn");
const cartContent = document.querySelector(".cart-content");
const cartItem = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const clearCartBtn = document.querySelector(".clear-cart-btn");

let cart = [];

for (let i = 0; i < dragImgs.length; i++) {
  let item = dragImgs[i];
  item.setAttribute("draggable", "true");
  item.addEventListener("dragstart", dragStart);
}
//drag events
function dragStart(event) {
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.setData("text/plain", event.target.id);
  //console.log("start Dragging");
}
dropTarget.addEventListener("dragover", dragOver);
dropTarget.addEventListener("drop", dragDrop);
//drop events
function dragOver(event) {
  event.preventDefault();
  event.stopPropagation();
}

function dragDrop() {
  event.preventDefault();
  const id = event.dataTransfer.getData("text/plain", event.target.id);
  //compare and get the product from Products, according to its id
  let cartImg = Products.find((product) => product.id === id);
  //add product to the empty cart array
  cart = [...cart, cartImg];
  //update cart Values
  setCartValues(cart);
  //display HTML cart item
  addCartItem(cartImg);
  //remove each item,  clear cart, update the cart items nr.,close the cart Window
  cartActions();
  event.stopPropagation();
  return false;
}

function setCartValues(cart) {
  let tempTotal = 0;
  let itemsTotal = 0;
  cart.map((product) => {
    tempTotal += product.price * product.amount;
    itemsTotal += parseInt(product.amount);
  });
  cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
  cartItem.innerText = itemsTotal;
}
function addCartItem(product) {
  const div = document.createElement("div");
  div.classList.add("cart-item");
  div.innerHTML += `
       <img id="${product.id}" src="${pathImg}/${product.img}" alt="" />
              <div>
                <h4>${product.name}</h4>
                <h5 id="price ">${product.price}€</h5>
                <span class="remove-item" data-id=${product.id}>Remove</span>
              </div>
              <div>
                <h4 class="Quantity">Amount</h4>
                <p class="item-amount">${product.amount}</p>
                <i class="fas fa-shopping-basket"></i>
              </div>
    `;
  cartContent.appendChild(div);
  //Show cart Window
  document.querySelector(".cartWindow").style.visibility = "visible";
}
//cart  remove and clear funcionality
function cartActions() {
  clearCartBtn.addEventListener("click", () => {
    clearCart();
  });
  //cart  remove and clear funcionality
  cartContent.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-item")) {
      let removeItem = event.target;
      let id = removeItem.dataset.id;
      removeItems(id);
      cartContent.removeChild(removeItem.parentElement.parentElement);
    }
  });
}
function clearCart() {
  let cartItems = cart.map((product) => product.id);
  //loop through id´s
  cartItems.forEach((id) => removeItems(id));
  while (cartContent.children.length > 0) {
    cartContent.removeChild(cartContent.children[0]);
  }
  document.querySelector(".cartWindow").style.visibility = "hidden";
}
function removeItems(id) {
  cart = cart.filter((item) => item.id !== id);
  setCartValues(cart);
}
//open cart Window
document.querySelector("#cart-btn").addEventListener("click", function () {
  const cartW = document.getElementById("cart");
  cartW.style.visibility = "visible";
});
//close cart Window
const closeBtn = document.querySelector(".close-cart");
closeBtn.addEventListener("click", function () {
  const cartW = document.getElementById("cart");
  cartW.style.visibility = "hidden";
});
