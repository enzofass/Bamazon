$(document).ready(function() {
  getProducts();
  $("#products-div").on("click", ".btn-success", addToCart);
});
let shoppingCart = [];
let totalSum = 0;
const addToCart = function() {
  const id = $(this).attr("data-id");
  console.log("inside addToCart", id);
  $.get(`/api/products/${id}`).then(updateCart);
};
const updateCart = function(product) {
  const qtyOrdered = $(`#qty-sel-${product.id}`).val();
  console.log("inside updateCart", product, qtyOrdered);

  if (qtyOrdered != "" && qtyOrdered <= product.stock_quantity) {
    console.log("product =>", product.stock_quantity);
    product.stock_quantity -= qtyOrdered;
    console.log("product =>", product.stock_quantity);
    shoppingCart.push(product);
    console.log(shoppingCart);
    alert("Items added to cart");
    $("#products-div").empty();
    getProducts();

    $(`#qty-sel-${product.id}`).val("");
  } else if (qtyOrdered > product.stock_quantity) {
    alert("Not enough stock");
  }
};
// Get products
const getProducts = function() {
  $.get("/api/products", function(data) {
    const productList = data;
    renderProducts(productList);
  });
};

// render HTML
const renderProducts = function(data) {
  console.log("Products", data);

  for (let i = 0; i < data.length; i++) {
    $("#products-div").append(`
      <div class="row">
      <div class="col-2 border rounded">
        <div class="product-img img-fluid">
          <img
            src="${data[i].img_url}"
            alt="No image available"
          />
        </div>
      </div>
      <div class="col-5 border rounded">
        <div class="product-description">
          <span>${data[i].product_name}</span>
        </div>
      </div>
      <div class="col border rounded">
        <div class="product-price">
          <span>$${data[i].price}</span>
        </div>
      </div>
      <div class="col border rounded">
        <div class="quantity-available">
          <span>${data[i].stock_quantity}</span>
        </div>
      </div>
      <div class="col border rounded">
        <div class="quantity-select">
          <input id= "qty-sel-${i +
            1}" type="number" name="quantity" min="0" max="100" />
        </div>
      </div>
      <div class="col border rounded">
        <div class="check-out">
        <button class = "btn btn-success" data-id=${
          data[i].id
        }>Add to Cart</button>
        </div>
      </div>
    </div>
        `);
  }
};
