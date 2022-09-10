let service = new Services();
let validation = new Validation();
let product = new Product();

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
getEle("btnThem").addEventListener("click", function () {
  // Sửa title
  document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm sản phẩm";
  // Tạo nút Add
  var btnAdd = `<button class = "btn btn-success" onclick="addProduct()">Add</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnAdd;
});

function addProduct() {
  let tenSP = getEle("tenSP").value;
  let giaSP = getEle("giaSP").value;
  let manHinh = getEle("manHinh").value;
  let cameraSau = getEle("cameraSau").value;
  let cameraTruoc = getEle("cameraTruoc").value;
  let hinhSP = getEle("hinhSP").value;
  let moTa = getEle("moTa").value;
  let loaiSP = getEle("loaiSP").value;

  // isValid = true => form hợp lệ
  var isValid = true;

  // Kiểm tra rỗng

  isValid &= validation.kiemTraRong(
    tenSP,
    "invalidTen",
    "(*) Vui lòng nhập tên sản phẩm"
  );

  isValid &= validation.kiemTraRong(
    giaSP,
    "invalidGia",
    "(*) Vui lòng nhập giá SP"
  );

  isValid &= validation.kiemTraRong(
    manHinh,
    "invalidManHinh",
    "(*) Vui lòng nhập cấu hình"
  );

  isValid &= validation.kiemTraRong(
    cameraSau,
    "invalidCameraSau",
    "(*) Vui lòng nhập camera sau"
  );

  isValid &= validation.kiemTraRong(
    cameraTruoc,
    "invalidCameraTruoc",
    "(*) Vui lòng nhập camera trước"
  );

  isValid &= validation.kiemTraRong(
    hinhSP,
    "invalidHinhSP",
    "(*) Vui lòng thêm hình ảnh"
  );

  isValid &= validation.kiemTraRong(
    moTa,
    "invalidMoTa",
    "(*) Vui lòng nhập mô tả"
  );

  isValid &= validation.kiemTraRong(
    loaiSP,
    "invalidLoaiSP",
    "(*) Vui lòng chọn loại SP"
  );

  if (!isValid) return null;

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
  // Sửa title
  document.getElementsByClassName("modal-title")[0].innerHTML =
    "Cập nhật sản phẩm";
  // Tạo nút Update
  var btnUpdate = `<button class="btn btn-info" onclick="updateProduct(${id})")>Update</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = btnUpdate;

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
    id,
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
