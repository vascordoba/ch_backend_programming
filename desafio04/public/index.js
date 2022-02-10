let form = document.getElementById("newProdForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let formData = {
    title: document.getElementById("title").value,
    price: parseFloat(document.getElementById("price").value).toFixed(2),
    thumbnail: document.getElementById("thumbnail").value,
  };

  let response = await fetch("./api/products", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  let result = await response.json();

  alert("New product created with id " + result.created_id);
  await refreshProductos();
});

const refreshProductos = async () => {
  const response = await fetch("./api/products");
  const prods = await response.json();
  if (prods.length === 0) {
    document.getElementById(
      "productsTable"
    ).innerHTML = `<tr><td colspan="4">No products found</td></tr>`;
  } else {
    let prodsTable = [];
    for (const prod of prods) {
      prodsTable.push(
        `<tr><td>${prod.id}</td><td>${prod.title}</td><td>$${parseFloat(
          prod.price
        ).toFixed(2)}</td><td><a href="${
          prod.thumbnail
        }" target="_blank">View thumbnail</a></td></tr>`
      );
    }
    document.getElementById("productsTable").innerHTML = prodsTable.join(" ");
  }
};

const main = async (e) => {
  await refreshProductos();
};

main();
