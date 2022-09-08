var service = new Service();

function getEle(id) {
  return document.getElementById(id);
}

function fetchData() {
  // Pending
  // Show loader
  getEle("loading").style.display = "block";
  service
    .getListProduct()
    .then(function (result) {
      // Response
      renderHTML(result.data);

      // Hide loader
      getEle("loading").style.display = "none";
    })
    .catch(function (error) {
      console.log(error);
    });
}

fetchData();

function renderHTML(data) {
  var content = "";
  data.forEach(function (product) {
    content += `
      <div class="card">
              <div id="phoneImg" class="card-header text-center"><img class="img-fluid width-auto" src="${product.img}"></div>
              <div class="card-body text-center">
                <h5 id="phoneName" class="card-title">${product.name}</h5>
                <p id="phonePrice" class="card-text">Giá: ${product.price}</p>
                <p id="phoneScreen" class="card-text">Màn hình: ${product.screen}"</p>
                <p id="backCamera" class="card-text">Camera sau: ${product.backCamera}</p>
                <p id="frontCamera" class="card-text">Camera trước: ${product.frontCamera}</p>
                <p id="phoneDesc" class="card-text">Mô tả: ${product.desc}</p>
                <p id="phoneType" class="card-text">Hãng: ${product.type}</p>
              </div>
              <div class="card-footer">
                <button id="addToCart">Add to cart</button>
              </div>
            </div>
      `;
  });
  getEle("products__content").innerHTML = content;
}
