function Service() {
  this.getListProduct = function () {
    // Request
    return axios({
      url: "https://62ff793c9350a1e548df750f.mockapi.io/api/Phone",
      method: "GET",
    });
  };

  this.getProduct = function (id) {
    return axios({
      url: `https://62ff793c9350a1e548df750f.mockapi.io/api/Phone/${id}`,
      method: "GET",
    });
  };
}
