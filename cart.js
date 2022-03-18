const carts = document.querySelectorAll(".add");
let products = [
  {
    name: "Bút bi Thiên Long-027",
    tag: "but1",
    price: 1,
    inCart: 0,
  },
  {
    name: "Bút bi Thiên Long-079",
    tag: "but2",
    price: 2,
    inCart: 0,
  },
  {
    name: "Bút bi Thiên Long-08",
    tag: "but3",
    price: 3,
    inCart: 0,
  },
  {
    name: "Bút bi Thiên Long-062",
    tag: "but4",
    price: 4,
    inCart: 0,
  },
  {
    name: "Bút mực nước",
    tag: "but5",
    price: 5,
    inCart: 0,
  },
  {
    name: "Bút mực nước",
    tag: "but6",
    price: 6,
    inCart: 0,
  },
  {
    name: "Viết chì ngòi",
    tag: "but7",
    price: 7,
    inCart: 0,
  },
  {
    name: "Viết chì 2B",
    tag: "but8",
    price: 8,
    inCart: 0,
  },
  {
    name: "Viết dạ quang",
    tag: "but9",
    price: 9,
    inCart: 0,
  },
  {
    name: "Viết xóa",
    tag: "but10",
    price: 10,
    inCart: 0,
  },
  {
    name: "Viết lông",
    tag: "but11",
    price: 11,
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
let listOfItems = [];
let listOfPrice = [];
let listOfQuantity = [];
function displayCart() {
  listOfItems = [];
  listOfPrice = [];
  listOfQuantity = [];
  let cartCost = localStorage.getItem("totalCost");
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".products");
  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      listOfItems.push(item.tag);
      let duy = item.inCart * item.price;
      listOfPrice.push(duy);
      listOfQuantity.push(item.inCart);
      productContainer.innerHTML += `
        <div class="product">
            <div class="product-title">
              <ion-icon name="close-circle-outline" class="remove"></ion-icon>
              <img src="imgs/${item.tag}.jpg"/>
              <span class="name">${item.name}</span>
            </div>
            <div class="price">${item.price}</div>
            <div class="quantity">${item.inCart}</div>
            <div class="total">$${item.inCart * item.price}</div>
        </div>
        `;
    });
    if (cartCost != "0") {
      productContainer.innerHTML += `
        <div class="basketTotalContainer">
            <h4 class="basketTotalTitle">Tổng cộng: $${cartCost}</h4>
            <button class="dat_hang">Mua ngay</button>
        </div>
        <div class="popUp tat_popUp" id="popUp">
          <div class="popUp-header">
            <h4>Tổng giá trị đơn hàng của bạn là $${cartCost}</h4>
            <button class="close-button">&times;</button>
          </div>
          <div class="popUp-body">
              <form id="contact-form">
                  <div class="input">
                    <label>Họ và tên:</label>
                    <input type="text" name="user_name"><br>
                  </div>
                  <div class="input">
                    <label>Email:</label>
                    <input type="email" name="user_email"><br>
                  </div>
                  <div class="input">
                    <label>Số điện thoại:</label>
                    <input type="number" name="user_phone"><br>
                  </div>
                  <button class="send_email">Đặt hàng</button>
              </form>
          </div>
        </div>;
        <div class="overlay tat_popUp"></div>`;
      document.querySelector(".dat_hang").addEventListener("click", () => {
        let overlay = document.querySelector(".overlay");
        overlay.classList.remove("tat_popUp");
        let popUp = document.querySelector(".popUp");
        popUp.classList.remove("tat_popUp");
      });
      document.querySelector(".close-button").addEventListener("click", () => {
        let overlay = document.querySelector(".overlay");
        overlay.classList.add("tat_popUp");
        let popUp = document.querySelector(".popUp");
        popUp.classList.add("tat_popUp");
      });
      document.querySelector(".overlay").addEventListener("click", () => {
        let overlay = document.querySelector(".overlay");
        overlay.classList.add("tat_popUp");
        let popUp = document.querySelector(".popUp");
        popUp.classList.add("tat_popUp");
      });
      document.querySelector(".send_email").addEventListener("click", (e) => {
        document.querySelector()
        console.log("Duy dep trai");
      });
    }
  }

  let removeButton = document.querySelectorAll(".remove");

  for (let i = 0; i < removeButton.length; i++) {
    removeButton[i].addEventListener("click", () => {
      removeItems(i);
    });
  }
  function removeItems(i) {
    let cartItems = localStorage.getItem("productsInCart");
    let price = localStorage.getItem("totalCost");
    let quantity = localStorage.getItem("cartNumbers");
    price = JSON.parse(price);
    if (cartItems) {
      cartItems = JSON.parse(cartItems);
      delete cartItems[listOfItems[i]];
      localStorage.setItem("productsInCart", JSON.stringify(cartItems));
      listOfItems.splice(i);
      price = price - listOfPrice[i];
      quantity = quantity - listOfQuantity[i];
      let productNumbers = localStorage.getItem("cartNumbers");
      productNumbers = parseInt(productNumbers);
      localStorage.setItem("totalCost", JSON.stringify(price));
      localStorage.setItem("cartNumbers", JSON.stringify(quantity));
    }
    displayCart();
    onLoadCartNumbers();
  }
}
onLoadCartNumbers();
displayCart();
