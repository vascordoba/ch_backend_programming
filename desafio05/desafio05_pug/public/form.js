let form = document.getElementById("newProdForm");
if (form !== undefined) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let newProd = {
      title: document.getElementById("title").value,
      price: parseFloat(document.getElementById("price").value).toFixed(2),
      thumbnail: document.getElementById("thumbnail").value,
    };

    let response = await fetch("/productos", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newProd),
    });

    let result = await response.json();

    alert("New product created with id " + result.created_id);

    document.location.replace("/productos");
  });
}

let cancelBtn = document.getElementById("cancelBtn");
if (cancelBtn !== undefined) {
  cancelBtn.addEventListener("click", (e) => {
    document.location.replace("/productos");
  });
}
