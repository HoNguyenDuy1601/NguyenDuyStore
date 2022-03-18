const carts = document.querySelectorAll(".add");
let products = [
  {
    name: "Thẻ cào Viettel mệnh giá 10.000đ đến 100.000đ",
    tag: "card1",
    price: 1,
    inCart: 0,
  },
  {
    name: "Thẻ cào Vina mệnh giá 10.000đ đến 100.000đ",
    tag: "card2",
    price: 2,
    inCart: 0,
  },
  {
    name: "Thẻ cào Mobi mệnh giá 10.000đ đến 100.000đ",
    tag: "card3",
    price: 3,
    inCart: 0,
  },
];
for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}
function onLoadCartNumbers() {
  let cartCost = localStorage.getItem("totalCost");
  let productNumbers = localStorage.getItem("cartNumbers");
  if (productNumbers) {
    document.querySelector(
      "#numberProducts"
    ).textContent = `(${productNumbers})`;
  }
}
function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers");
  productNumbers = parseInt(productNumbers);
  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector("#numberProducts").textContent = `(${
      productNumbers + 1
    })`;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector("#numberProducts").textContent = 1;
  }
  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product,
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
  let cartCost = localStorage.getItem("totalCost");
  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

function displayCart() {
  let cartCost = localStorage.getItem("totalCost");
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".products");
  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
        <div class="product">
            <ion-icon name="close-circle-outline"></ion-icon>
            <img src="imgs/${item.tag}.jpg"/>
            <span>${item.name}</span>
            <div class="price">${item.price}</div>
            <div class="quantity">${item.inCart}</div>
            <div class="total">$${item.inCart * item.price}</div>
        </div>
        `;
    });
    productContainer.innerHTML += `
    <div class="basketTotalContainer">
        <h4 class="basketTotalTitle">Tổng cộng: $${cartCost}</h4>
    </div>
    `;
  }
}
onLoadCartNumbers();
displayCart();
