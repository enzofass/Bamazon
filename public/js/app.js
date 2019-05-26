$(document).ready(function() {
  console.log("inside js");

  function renderProducts() {
    $.get("/api/products", function(data) {
      console.log("Products", data[0].product_name);

      for (let i = 0; i < data.length; i++) {
        $("#products-div").append(`
      <div class="row">
      <div class="col-3 bg-secondary">
        <div class="product-img img-fluid">
          <img
            src="${data[i].img_url}"
            alt="No image available"
          />
        </div>
      </div>
      <div class="col-6 bg-primary">
        <div class="product-description">
          <span>${data[i].product_name}</span>
          <!--lol-->
        </div>
      </div>
      <div class="col bg-success">
        <div class="product-price">
          <span>$${data[i].price}</span>
        </div>
      </div>
      <div class="col bg-warning">
        <div class="quantity-available">
          <span>${data[i].stock_quantity}</span>
        </div>
      </div>
      <div class="col bg-danger">
        <div class="quantity-select">
          <input type="number" name="quantity" min="0" max="100" />
        </div>
      </div>
    </div>
        `);
      }
    });
  }

  renderProducts();
});
