function Validation() {
  this.kiemTraRong = function (value, errorId, message) {
    if (value === "") {
      // Error
      getEle(errorId).style.display = "block";
      getEle(errorId).innerHTML = message;
      return false;
    }

    getEle(errorId).style.display = "none";
    getEle(errorId).innerHTML = "";
    return true;
  };

  this.kiemTraTonTai = function (value, errorId, message, list) {
    var status = list.some(function (product) {
      return value === product.name;
    });

    if (status) {
      getEle(errorId).style.display = "block";
      getEle(errorId).innerHTML = message;
      return false;
    }
    getEle(errorId).style.display = "none";
    getEle(errorId).innerHTML = "";
    return true;
  };
}
