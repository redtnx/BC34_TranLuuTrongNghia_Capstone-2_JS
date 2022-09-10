let service = new Services();

function getEle(id) {
  return document.getElementById(id);
}

function fetchData() {
  service
    .getListProduct()
    .then(function (result) {
      renderHTML(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

fetchData();

function renderHTML(data) {
  let content = "";
  data.forEach(function (product) {
    content += `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price}</td>
            <td>${product.screen}</td>
            <td>${product.backCamera}</td>
            <td>${product.frontCamera}</td>
            <td>
            <img class="img-fluid" style="width:100px" src="${product.img}">
            </td>
            <td>${product.desc}</td>
            <td>${product.type}</td>
            <td>
            <button class="btn btn-info" onclick="editProduct(${product.id})" data-toggle="modal" data-target="#exampleModal">Edit</button>   
            <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Xóa</button>
            </td>
        </tr>
        `;
  });
  getEle("tbodyProduct").innerHTML = content;
}

// Xóa
function deleteProduct(id) {
  service
    .deleteProductApi(id)
    .then(function () {
      fetchData();
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Thêm
function addProduct() {
  let tenSP = getEle("tenSP").value;
  let giaSP = getEle("giaSP").value;
  let manHinh = getEle("manHinh").value;
  let cameraSau = getEle("cameraSau").value;
  let cameraTruoc = getEle("cameraTruoc").value;
  let hinhSP = getEle("hinhSP").value;
  let moTa = getEle("moTa").value;
  let loaiSP = getEle("loaiSP").value;

  // khai báo và gán dữ liệu đối tượng
  let product = new Product(
    "",
    tenSP,
    giaSP,
    manHinh,
    cameraSau,
    cameraTruoc,
    hinhSP,
    moTa,
    loaiSP
  );

  service
    .addProductApi(product)
    .then(function () {
      fetchData();
      // Tắt modal
      document.getElementsByClassName("close")[0].click();
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Sửa
function editProduct(id) {
  service
    .getProduct(id)
    .then(function (result) {
      getEle("productID").value = result.data.id;
      getEle("tenSP").value = result.data.name;
      getEle("giaSP").value = result.data.price;
      getEle("manHinh").value = result.data.screen;
      getEle("cameraSau").value = result.data.backCamera;
      getEle("cameraTruoc").value = result.data.frontCamera;
      getEle("hinhSP").value = result.data.img;
      getEle("moTa").value = result.data.desc;
      getEle("loaiSP").value = result.data.type;
    })
    .catch(function (error) {
      console.log(error);
    });
  getEle("productID").disabled = true;
}

// Update
function updateProduct(id) {
  let maSP = getEle("productID").value;
  let tenSP = getEle("tenSP").value;
  let giaSP = getEle("giaSP").value;
  let manHinh = getEle("manHinh").value;
  let cameraSau = getEle("cameraSau").value;
  let cameraTruoc = getEle("cameraTruoc").value;
  let hinhSP = getEle("hinhSP").value;
  let moTa = getEle("moTa").value;
  let loaiSP = getEle("loaiSP").value;

  // khai báo và gán dữ liệu đối tượng
  let product = new Product(
    maSP,
    tenSP,
    giaSP,
    manHinh,
    cameraSau,
    cameraTruoc,
    hinhSP,
    moTa,
    loaiSP
  );

  service
    .updateProductApi(product)
    .then(function () {
      fetchData();
      document.getElementsByClassName("close")[0].click();
    })
    .catch(function (error) {
      console.log(error);
    });
}
