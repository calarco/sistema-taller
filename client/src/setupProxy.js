
const proxy = require("http-proxy-middleware");

module.exports = function(app) {
    app.use(proxy("/api/", { target: "http://localhost:3030/", ws: true }));
    app.use(proxy("/socket.io/", { target: "http://localhost:3030/", ws: true}));
};
