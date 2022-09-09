class Food {
  constructor(
    maMon,
    tenMon,
    loaiMon,
    giaMon,
    khuyenMai,
    tinhTrang,
    hinhMonAn,
    moTa
  ) {
    this.maMon = maMon;
    this.tenMon = tenMon;
    this.loaiMon = loaiMon;
    this.giaMon = giaMon;
    this.khuyenMai = khuyenMai;
    this.tinhTrang = tinhTrang;
    this.hinhMonAn = hinhMonAn;
    this.moTa = moTa;
  }
}

// danh sách dữ liệu thức ăn để hiển thị ra màn hình
let listFood = [];

document.querySelector("#btnThemMon").onclick = () => {
  // DOM tới input lấy giá trị
  let foodID = document.querySelector("#foodID").value;
  let tenMon = document.querySelector("#tenMon").value;
  let loai = document.querySelector("#loai").value;
  let giaMon = document.querySelector("#giaMon").value;
  let khuyenMai = document.querySelector("#khuyenMai").value;
  let tinhTrang = document.querySelector("#tinhTrang").value;
  let hinhMon = document.querySelector("#hinhMon").value;
  let moTa = document.querySelector("#moTa").value;

  // khai báo và gán dữ liệu đối tượng
  let food = new Food(
    foodID,
    tenMon,
    loai,
    giaMon,
    khuyenMai,
    tinhTrang,
    hinhMon,
    moTa
  );

  // cách viết ES5
  // listFood.push(food);

  // cách viết ES6
  listFood = [...listFood, food];

  // lưu dữ liệu vào local storage
  localStorage.setItem("foodList", JSON.stringify(listFood));

  saveData(data);

  showData();

  let showData = () => {
    // lấy dữ liệu từ local storage
    let getListFood = JSON.parse(localStorage.getItem("foodList"));

    let ketQua = "";

    if (getListFood) {
      getListFood.map((item) => {
        ketQua += `
    <tr>
        <td>${item.maMon}</td>
        <td>${item.tenMon}</td>
        <td>${item.loaiMon}</td>
        <td>${item.giaMon}</td>
        <td>${item.khuyenMai} %</td>
        <td>${(item.giaMon * (100 - item.khuyenMai)) / 100}</td>
        <td>${item.tinhTrang}</td>
        <td>
        <button
            class="btn btn-info"
            data-toggle="modal"
            data-target="#exampleModal"
        >
         Sửa
         </button>
        <button class="btn btn-danger">Xóa</button>
        </td>
    </tr>
    `;
      });
    }
    document.querySelector("#tbodyFood").innerHTML = ketQua;
  };

  let saveData = (data) => {
    localStorage.setItem("foodList", JSON.stringify(data));
  };

  window.onload = showData();
};
