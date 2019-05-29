$(document).ready(function() {
  getProducts();
  $("#products-div").on("click", ".btn-success", addToCart);
  $(".dropdown-item").on("click", sortByGenre);
});
let shoppingCart = [];
let totalSum = 0;
const sortByGenre = function() {
  const genre = $(this).attr("id");
  console.log("inside sortByGenre", genre);
  $.get(`/api/products/genre/${genre}`).then(function(data) {
    $("#products-div")
      .empty()
      .after(renderProducts(data));
  });
};
const addToCart = function() {
  const id = $(this).attr("data-id");
  console.log("inside addToCart", id);
  $.get(`/api/products/${id}`).then(function(id) {
    console.log("before updateCart", id);
    updateCart(id);
  });
};
const updateCart = function(product) {
  let qtyOrdered = $(`#qty-sel-${product.id}`).val();
  console.log("inside updateCart", product, qtyOrdered);

  if (qtyOrdered != ("" || 0) && qtyOrdered <= product.stock_quantity) {
    cartModal(product, qtyOrdered);
    $(`#qty-sel-${product.id}`).val("");
  } else if (qtyOrdered > product.stock_quantity) {
    alert("Not enough stock");
  }
};
// checkout
const cartModal = function(product, qty) {
  renderModal(product, qty);
  $("#cart-modal").modal();
  $("#confirm-purchase").on("click", function() {
    updateInventory(product, qty);
  });
};
// update inventory
const updateInventory = function(product, qty) {
  console.log("product =>", product.stock_quantity);
  const updateProd = {
    stock_quantity: (product.stock_quantity -= qty)
  };
  console.log("product =>", product.stock_quantity);
  $.ajax({
    method: "PUT",
    url: "/api/products/" + product.id,
    data: updateProd
  }).then(function() {
    console.log("update:", product);
    $("#products-div")
      .empty()
      .after(getProducts());
  });
};
// Get products
const getProducts = function() {
  $.get("/api/products", function(data) {
    const productList = data;
    renderProducts(productList);
  });
};
// render modal
const renderModal = function(data, qty) {
  $("#product-name").text(data.product_name);
  $("#product-qty").text(qty);
  $("#product-total").text(qty * data.price);
  $("#product-img").attr("src", data.img_url);
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
          <span>${data[i].product_name}</span><br>
          <span>${data[i].genre}</span>
        </div>
      </div>
      <div class="col-md col-sm border rounded">
        <div class="product-price">
          <span>$${data[i].price}</span>
        </div>
      </div>
      <div class="col-md col-sm border rounded">
        <div class="quantity-available">
          <span>${data[i].stock_quantity}</span>
        </div>
      </div>
      <div class="col-md col-sm border rounded">
        <div class="quantity-select">
          <input id= "qty-sel-${i +
            1}" type="number" name="quantity" min="0" max="100" />
        </div>
      </div>
      <div class="col-md col-sm border rounded">
        <div class="check-out">
        <button class = "btn btn-success" data-id=${
          data[i].id
        }>Check-Out</button>
        </div>
      </div>
    </div>
        `);
  }
};
