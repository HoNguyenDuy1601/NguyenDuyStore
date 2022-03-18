const carts = document.querySelectorAll(".add");
let products = [
  {
    name: "Truyện Doraemon",
    tag: "dochoi1",
    price: 1,
    inCart: 0,
  },
  {
    name: "Mặt nạ",
    tag: "dochoi2",
    price: 2,
    inCart: 0,
  },
  {
    name: "Bộ cờ tướng",
    tag: "dochoi3",
    price: 3,
    inCart: 0,
  },
  {
    name: "Bóng tenis",
    tag: "dochoi4",
    price: 4,
    inCart: 0,
  },
  {
    name: "Cờ tỉ phú",
    tag: "dochoi5",
    price: 5,
    inCart: 0,
  },
  {
    name: "Quạt",
    tag: "dochoi6",
    price: 6,
    inCart: 0,
  },
  {
    name: "Chó cứu hộ",
    tag: "dochoi7",
    price: 7,
    inCart: 0,
  },
  {
    name: "Bộ bài Uno",
    tag: "dochoi8",
    price: 8,
    inCart: 0,
  },
  {
    name: "Quạt Doraemon",
    tag: "dochoi9",
    price: 9,
    inCart: 0,
  },
  {
    name: "Guitar",
    tag: "dochoi10",
    price: 10,
    inCart: 0,
  },
  {
    name: "Quạt trái bắp",
    tag: "dochoi11",
    price: 11,
    inCart: 0,
  },
  {
    name: "Hình dán",
    tag: "dochoi12",
    price: 12,
    inCart: 0,
  },
  {
    name: "Con quay",
    tag: "dochoi13",
    price: 13,
    inCart: 0,
  },
  {
    name: "Xe robot",
    tag: "dochoi14",
    price: 14,
    inCart: 0,
  },
  {
    name: "Quạt/máy phun hơi nước",
    tag: "dochoi15",
    price: 15,
    inCart: 0,
  },
  {
    name: "Hình dán",
    tag: "dochoi16",
    price: 16,
    inCart: 0,
  },
  {
    name: "Bóng, con quay, lego",
    tag: "dochoi17",
    price: 17,
    inCart: 0,
  },
  {
    name: "Gậy như ý",
    tag: "dochoi18",
    price: 18,
    inCart: 0,
  },
  {
    name: "Cầu mút",
    tag: "dochoi19",
    price: 19,
    inCart: 0,
  },
  {
    name: "Cầu mút",
    tag: "dochoi20",
    price: 20,
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
