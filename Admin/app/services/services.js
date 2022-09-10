function Services() {
  this.getListProduct = function () {
    return axios({
      url: "https://62ff793c9350a1e548df750f.mockapi.io/api/Phone",
      method: "GET",
    });
  };

  this.deleteProductApi = function (id) {
    return axios({
      url: `https://62ff793c9350a1e548df750f.mockapi.io/api/Phone/${id}`,
      method: "DELETE",
    });
  };

  this.addProductApi = function (product) {
    return axios({
      url: "https://62ff793c9350a1e548df750f.mockapi.io/api/Phone",
      method: "POST",
      data: product,
    });
  };

  this.getProduct = function (id) {
    return axios({
      url: `https://62ff793c9350a1e548df750f.mockapi.io/api/Phone/${id}`,
      method: "GET",
    });
  };

  this.updateProductApi = function (product) {
    return axios({
      url: `https://62ff793c9350a1e548df750f.mockapi.io/api/Phone/${product.id}`,
      method: "PUT",
      data: product,
    });
  };
}
