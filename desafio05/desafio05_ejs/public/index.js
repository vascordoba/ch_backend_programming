let addProductBtn = document.getElementById("addProductBtn");
if (addProductBtn !== undefined) {
  addProductBtn.addEventListener("click", (e) => {
    document.location.replace("/addProducto");
  });
}
