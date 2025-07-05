const fastify = require("fastify");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("@fastify/cors");

const app = fastify();
app.register(cors, {
    origin: "*"
});

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const pedidos = [];

io.on("connection", (socket) => {
    console.log("Cliente conectado (cardapio)", socket.id);
    socket.emit("pedidosAtualizados", pedidos);

    socket.on("novoPedido", (pedido) => {
        console.log("📦 Novo pedido recebido:", pedido)

        io.emit("pedidoRecebido", pedido);
    });

    socket.on("disconnect", () => {
        console.log("Cliente desconectado(cardapio):", socket.id);
    });
});

const PORT = 4000;
server.listen(PORT, () => {
    console.log(`✅ WebSocket rodando em http://localhost:${PORT}`)
})