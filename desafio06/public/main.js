const socket = io();
let user;

//registro helper para manejar los valores de los precios
Handlebars.registerHelper("toFloat", (val) => parseFloat(val).toFixed(2));

Swal.fire({
  title: "User sign in",
  input: "text",
  text: "Input ypur name",
  inputValidator: (val) => {
    return !val && "You need to identify yourself";
  },
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;
  socket.emit("login");
});

//levanto templates dinamicos
let tableTemplate;
fetch("./table.hbs")
  .then((resp) => resp.text())
  .then((html) => (tableTemplate = html));

let chatTemplate;
fetch("./chatMessages.hbs")
  .then((resp) => resp.text())
  .then((html) => (chatTemplate = html));

//defino metodos de render que corren en los eventos
const renderProducts = (data) => {
  let template = Handlebars.compile(tableTemplate);
  let rendered = template({ products: data });
  document.getElementById("productsTbl").innerHTML = rendered;
};

const renderMessages = (data) => {
  let template = Handlebars.compile(chatTemplate);
  let rendered = template({ user, messages: data });
  document.getElementById("messagesTbl").innerHTML = rendered;
};

//se dispara cuando el usuario ingresa su nombre
socket.on("newUser", (data) => {
  console.log("new user connected");
  renderProducts(data.products);
  renderMessages(data.messages);
});

//actualizacion de mensajes
socket.on("messages", (data) => {
  renderMessages(data);
});

//actualizacion de prodcutos
socket.on("products", (data) => {
  renderProducts(data);
});

//post nuevo producto
const postNewProduct = (e) => {
  const title = document.getElementById("title").value.trim();
  const price = parseFloat(document.getElementById("price").value).toFixed(2);
  const thumbnail = document.getElementById("thumbnail").value.trim();

  if (title !== "" && price !== "" && thumbnail !== "") {
    let newProd = {
      title,
      price,
      thumbnail,
    };
    socket.emit("new-product", newProd);
    document.getElementById("title").value = "";
    document.getElementById("price").value = "";
    document.getElementById("thumbnail").value = "";
  }
  return false;
};

//post nuevo mensaje
const postMessage = (e) => {
  const msg = document.getElementById("chat").value.trim();
  if (msg !== "") {
    let newMessage = {
      user,
      msg,
    };
    socket.emit("new-message", newMessage);
  }
  return false;
};
