let service = new Service();
var listProduct = [];
var cartListProduct = [];

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

function renderCart() {
  let content = "";
  console.log(cartListProduct);
  cartListProduct.forEach(function (product) {
    content += `
      <div style="display:flex; align-items:center; justify-content:space-evenly" >
          <div style="width:15%; margin-bottom:10px">
            <img class="img-fluid" style="width:4rem" src="${product.img}">
          </div>
          <div style="width:40%; margin-bottom:10px">${product.name}</div>
          <div style="width:15%; margin-bottom:10px">
            <button id="addQ" style="border:none; background-color:white"  data-id=${product.id}><i class="fa fa-caret-left"></i></button>
            ${product.quantity}
            <button id="minusQ" style="border:none; background-color:white" data-id=${product.id}><i class="fa fa-caret-right"></i></button>
          </div>
          <div style="width:15%; margin-bottom:10px">${product.price}</div>
          <div style="width:15%"><button style="border:none; background-color:white"><i class="fa fa-trash"></i></button></div>
        
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

      if (itemExist) {
        itemExist.quantity += 1;
      } else
        cartListProduct = [
          {
            quantity: 1,
            ...item,
          },
          ...cartListProduct,
        ];
      renderCart();
      document.querySelector(".quantity-of-cart-list").style.display = "block";
      document.querySelector(".quantity-of-cart-list").innerHTML =
        cartListProduct.length;
    });
  });
}
