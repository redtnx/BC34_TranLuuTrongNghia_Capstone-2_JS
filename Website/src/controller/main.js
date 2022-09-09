let service = new Service();

function getEle(id) {
  return document.getElementById(id);
}

function fetchData() {
  // Pending
  // Show loader
  service
    .getListProduct()
    .then(function (result) {
      // Response
      renderHTMLContainer(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

fetchData();

function renderHTMLContainer(data) {
  let listProduct = [];

  let phoneType = (getEle("search").onchange =
    ("change",
    function (event) {
      return event.target.value;
    }));
  console.log(phoneType);

  data.forEach(function (product) {
    if (product.type === phoneType) {
      listProduct.push(product);
    }
    console.log(listProduct);
  });

  //   console.log(phoneType);

  renderHTML(listProduct);
}

function renderHTML(data) {
  var content = "";
  data.forEach(function (product) {
    content += `
      <div class="card">
              <div id="phoneImg" class="card-header text-center"><img class="img-fluid" src="${product.img}"></div>
              <div class="card-body text-center">
                <h5 id="phoneName" class="card-title">${product.name}</h5>
                <p id="phonePrice" class="card-text">Giá: ${product.price}</p>
                <p id="phoneScreen" class="card-text">Màn hình: ${product.screen}"</p>
                <p id="backCamera" class="card-text">Camera sau: ${product.backCamera}</p>
                <p id="frontCamera" class="card-text">Camera trước: ${product.frontCamera}</p>
                <p id="phoneDesc" class="card-text">Mô tả: ${product.desc}</p>
                <p id="phoneType" class="card-text">Hãng: ${product.type}</p>
              </div>
              <div class="card-footer text-center">
                <button class="btn btn-dark" id="addToCart" onclick=addToCart(${product.id})>Add to cart</button>
              </div>
            </div>
      `;
  });
  getEle("products__content").innerHTML = content;
}

// Add to cart
function addToCart(id) {}
