let productList = [];
async function doGetRequest() {
  let res = await axios.get(
    "https://62ff793c9350a1e548df750f.mockapi.io/api/Phone"
  );

  productList = res.data;
  console.log(productList);

  return productList;
}

const data = doGetRequest();
console.log(data);
