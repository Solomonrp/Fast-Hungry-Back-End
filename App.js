const express = require('express');
const {router} = require(`./routes`);
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session');
const {mongoConnect} = require(`./resources/mongo`);
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const server = http.createServer(app);

mongoConnect();
app.use(cors({
  credentials: true,
  origin: [ "http://localhost:3000" ]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(router);

const io = socketIo(server);
// const socket = require('./controllers/socket/socketConnection')
// socket.start(io);

io.on("connection", socket => {

  console.log("New client", socket.id);

  // Colocar uma função que o usuário chama quando finalizar o pedido e que manda o pedido para outra função que só a cozinha vai receber está ouvindo
  // exemplo https://www.freecodecamp.org/news/how-to-create-a-realtime-app-using-socket-io-react-node-mongodb-a10c4a1ab676/

  socket.on("log", (user) => {
    clients[socket.id] = user;
    const message = `Hello from ${clients[socket.id]}`
    socket.broadcast.emit('up', message);
  })

  socket.on("hello", (hello) => {
    console.log(`hello from server`);
    const message = `Hello from ${clients[socket.id]}`
    io.sockets.emit(`hello`, message);
  })

  socket.on("cart", (food) => {
    console.log(food);

  })


  socket.on("disconnect", () => {
    console.log("user disco");
  });

});

// server.listen(5000);

module.exports = {server};