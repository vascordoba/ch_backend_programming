const socket = io();
let user;

//registro helper para manejar los valores de los precios
Handlebars.registerHelper("toFloat", (val) => parseFloat(val).toFixed(2));
Handlebars.registerHelper("tsFormat", (val) =>
  dayjs(val).format("DD/MM/YYYY hh:mm:ss")
);

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

Swal.fire({
  title: "User email sign in",
  input: "text",
  text: "Input ypur email",
  inputValidator: (val) => {
    if (val.trim() === "") {
      return "You need to identify youtself";
    } else if (validateEmail(val) === null) {
      return "You need to input a valid email";
    }
    return false;
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
      ts: Date.now(),
      msg,
    };
    socket.emit("new-message", newMessage);
  }
  return false;
};
