const express = require("express");
const http = require("http");
const mongo = require("mongoose");
const bodyParser = require("body-parser");
const mongoconnection = require("./config/mongoconnection.json");
const { add } = require("./controller/chatController");
var path = require("path");
mongo
  .connect(mongoconnection.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DataBase Connected");
  })
  .catch((err) => {
    console.log(err);
  });

var app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "twig");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const UserRouter = require("./routes/user");
const {
  addPartieSocket,
  attaqueSocket,
  afficherSocket,
} = require("./controller/joueurController");
app.use("/user", UserRouter);

const server = http.createServer(app);
const io = require("socket.io")(server);
io.on("connection", (socket) => {
  console.log("user connected");
  //socket.emit("msg", "user connected");

  socket.on("x", (data) => {
    socket.broadcast.emit("x", data);
  });

  socket.on("partie", (data) => {
    console.log(data);
    addPartieSocket(data);
    io.emit("msg", data);
  });

  socket.on("attaque", (data) => {
    console.log(data);
    attaqueSocket(data.id1, data.id2);
    io.emit("msg", data);
  });

  socket.on("afficher", async (data) => {
    console.log(data);
    r = await afficherSocket(data);
    console.log("afficher");
    console.log(r);
    io.emit("aff", r);
  });

  socket.on("disconnect", () => {
    io.emit("msg", "user diconnecter");
  });
});
server.listen(3000, () => console.log("server is run"));
