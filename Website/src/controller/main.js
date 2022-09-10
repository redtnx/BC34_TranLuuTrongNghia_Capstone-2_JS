let service = new Service();
var listProduct = [];
var cartListProduct = [];

getLocalStorage();
renderCart();

function fetchData() {
  service
    .getListProduct()
    .then((res) => {
      listProduct = res.data;
      renderListProduct(res.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
fetchData();

//Select Option Type Product
function selectedTypeProduct() {
  const value = document.querySelector("#search").value;
  if (value === "All") {
    renderListProduct(listProduct);
  } else {
    renderListProduct(listProduct.filter((item) => item.type === value));
  }
}

// Render list Product
function renderListProduct(data) {
  let content = "";
  data.forEach(function (product) {
    content += `
      <div class="card">
              <div id="phoneImg" class="card-header text-center" style="background-color:white; border-radius:25px"><img class="img-fluid" src="${product.img}"></div>
              <div class="card-body text-center">
                <h5 id="phoneName" class="card-title">${product.name}</h5>
                <p id="phonePrice" class="card-text">Giá: ${product.price}</p>
                <p id="phoneScreen" class="card-text">Màn hình: ${product.screen}"</p>
                <p id="backCamera" class="card-text">Camera sau: ${product.backCamera}</p>
                <p id="frontCamera" class="card-text">Camera trước: ${product.frontCamera}</p>
                <p id="phoneDesc" class="card-text">Mô tả: ${product.desc}</p>
              </div>
              <div class="card-footer text-center style="background-color:white"">
                <button class="btn btn-dark" style="width:100%" data-id=${product.id}><i class="fa fa-cart-plus"></i></button>
              </div>
            </div>
      `;
  });
  document.querySelector("#products__content").innerHTML = content;
  addToCart();
}

const handleTotalMoney = () => {
  let total = 0;
  let totalQuantity = 0;
  cartListProduct.forEach((item) => {
    total += item.quantity * item.price;
    totalQuantity += item.quantity;
  });
  document.getElementById("thanhToan").innerHTML = `<div>${total}$</div>`;
  document.querySelector(".quantity-of-cart-list").style.display = "block";
  document.querySelector(".quantity-of-cart-list").innerHTML = totalQuantity;
  setLocalStorage();
};

const findItemExist = (id) =>
  cartListProduct.find((product) => product.id == id);

const handleIncreaseQuantity = (id) => {
  const itemExist = findItemExist(id);
  if (itemExist) {
    itemExist.quantity += 1;
  }
  renderCart();
  handleTotalMoney();
};

const handleDecreaseQuantity = (id) => {
  const itemExist = findItemExist(id);

  if (itemExist) {
    if (itemExist.quantity > 1) itemExist.quantity -= 1;
  }
  renderCart();
  handleTotalMoney();
};

// Xóa item khỏi giỏ hàng
const deleteItem = (id) => {
  const index = cartListProduct.findIndex((item) => item.id == id);
  cartListProduct.splice(index, 1);
  renderCart(cartListProduct);
  setLocalStorage();
};

function renderCart(data) {
  let content = "";
  if (data) {
    let totalMoney = 0;
    let totalQuantity = 0;
    data.forEach((item) => {
      totalQuantity += item.quantity;
      totalMoney += item.quantity * item.price;
    });
    document.querySelector(".quantity-of-cart-list").style.display = "block";
    document.querySelector(".quantity-of-cart-list").innerHTML = totalQuantity;
    document.getElementById(
      "thanhToan"
    ).innerHTML = `<div>${totalMoney}$</div>`;
  }

  const newData = data || cartListProduct;
  newData.forEach(function (product) {
    content += `
      <div style="display:flex; align-items:center; justify-content:space-evenly" >
          <div style="width:15%; margin-bottom:10px">
            <img class="img-fluid" style="width:4rem" src="${product.img}">
          </div>
          <div style="width:40%; margin-bottom:10px">${product.name}</div>
          <div style="width:15%; margin-bottom:10px">
            <button style="border:none; background-color:white"  onclick="handleDecreaseQuantity(${
              product.id
            })"><i class="fa fa-caret-left"></i></button>
            ${product.quantity}
            <button style="border:none; background-color:white" onclick="handleIncreaseQuantity(${
              product.id
            })"><i class="fa fa-caret-right"></i></button>
          </div>
          <div style="width:15%; margin-bottom:10px">${
            product.price * product.quantity
          }$</div>
          <div style="width:15%"><button style="border:none; background-color:white" onclick="deleteItem(${
            product.id
          })"><i class="fa fa-trash"></i></button></div>
        
      </div>
      `;
  });
  document.querySelector(".modal-body").innerHTML = content;
}

// Add to cart
function addToCart() {
  const buttonElements = document.querySelectorAll(".card button");

  buttonElements.forEach((el) => {
    el.addEventListener("click", () => {
      const id = el.getAttribute("data-id");
      const item = listProduct.find((product) => product.id == id);
      if (!item) return;

      const itemExist = cartListProduct.find(
        (product) => product.id === item.id
      );

      if (!itemExist) {
        cartListProduct = [
          {
            quantity: 1,
            ...item,
          },
          ...cartListProduct,
        ];
      }

      renderCart();
      handleTotalMoney();
    });
  });
}

// Thanh toán
function payment() {
  if (cartListProduct !== []) {
    cartListProduct = [];
  }
  setLocalStorage();
  getLocalStorage();
}

// Clear giỏ hàng
function clearCart() {
  if (cartListProduct !== []) {
    cartListProduct = [];
  }
  setLocalStorage();
  getLocalStorage();
}

// Lưu giỏ hàng xuống local storage
function setLocalStorage() {
  // Convert từ JSON (cú pháp của JavaScript) => String
  var dataString = JSON.stringify(cartListProduct);
  // Lưu xuống local storage
  localStorage.setItem("CartList", dataString);
}

// Lấy lại data từ local storage để sử dụng
function getLocalStorage() {
  if (localStorage.getItem("CartList")) {
    // IMPORTANT: PHẢI KIỂM TRA DATA CÓ TỒN TẠI HAY KHÔNG RỒI MỚI CHO CHẠY LỆNH ĐỂ TRÁNH BỊ LỖI CODE
    var dataString = localStorage.getItem("CartList");
    // Convert từ String => JSON để sử dụng
    var dataJSON = JSON.parse(dataString);
    // Gọi lại hàm renderTable để nhập lại thông tin từ local storage ra table
    renderCart(dataJSON);
    // Thêm lại thông tin từ local storage vào arr
    cartListProduct = dataJSON;
  }
}
