class Product {
  constructor(
    _maSP,
    _tenSP,
    _giaSP,
    _manHinh,
    _cameraSau,
    _cameraTruoc,
    _hinhSP,
    _moTa,
    _loaiSP
  ) {
    this.maSP = _maSP;
    this.tenSP = _tenSP;
    this.giaSP = _giaSP;
    this.manHinh = _manHinh;
    this.cameraSau = _cameraSau;
    this.cameraTruoc = _cameraTruoc;
    this.hinhSP = _hinhSP;
    this.moTa = _moTa;
    this.loaiSP = _loaiSP;
  }
}

// // danh sách dữ liệu sản phẩm để hiển thị ra màn hình
// let listProduct = [];

// document.querySelector("#btnThemSP").onclick = () => {
//   // DOM tới input lấy giá trị
//   let maSP = document.querySelector("#productID").value;
//   let tenSP = document.querySelector("#tenSP").value;
//   let giaSP = document.querySelector("#giaSP").value;
//   let manHinh = document.querySelector("#manHinh").value;
//   let cameraSau = document.querySelector("#cameraSau").value;
//   let cameraTruoc = document.querySelector("#cameraTruoc").value;
//   let hinhSP = document.querySelector("#hinhSP").value;
//   let moTa = document.querySelector("#moTa").value;
//   let loaiSP = document.querySelector("#loaiSP").value;

//   // khai báo và gán dữ liệu đối tượng
//   let product = new Product(
//     maSP,
//     tenSP,
//     giaSP,
//     manHinh,
//     cameraSau,
//     cameraTruoc,
//     hinhSP,
//     moTa,
//     loaiSP
//   );

//   // cách viết ES6
//   listProduct = [...listProduct, product];

//   // lưu dữ liệu vào local storage
//   localStorage.setItem("productList", JSON.stringify(listProduct));

//   saveData(data);

//   showData();

//   let showData = () => {
//     // lấy dữ liệu từ local storage
//     let getListProduct = JSON.parse(localStorage.getItem("productList"));

//     let ketQua = "";

//     if (getListProduct) {
//       getListProduct.map((item) => {
//         ketQua += `
//     <tr>
//         <td>${item.maSP}</td>
//         <td>${item.tenSP}</td>
//         <td>${item.giaSP}</td>
//         <td>${item.manHinh}</td>
//         <td>${item.cameraSau}</td>
//         <td>${item.cameraTruoc}</td>
//         <td>${item.hinhSP}</td>
//         <td>${item.moTa}</td>
//         <td>${item.loaiSP}</td>
//         <td>
//         <button
//             class="btn btn-info"
//             data-toggle="modal"
//             data-target="#exampleModal"
//         >
//          Sửa
//          </button>
//         <button class="btn btn-danger">Xóa</button>
//         </td>
//     </tr>
//     `;
//       });
//     }
//     document.querySelector("#tbodyFood").innerHTML = ketQua;
//   };

//   let saveData = (data) => {
//     localStorage.setItem("productList", JSON.stringify(data));
//   };

//   window.onload = showData();
// };
