import feathers, { socketio, authentication } from "@feathersjs/client";
import io from "socket.io-client";

const socket = io("/", {
    transports: ["websocket"]
});

const feathersClient = feathers()
    .configure(socketio(socket, { timeout: 50000 }))
    .configure(authentication({ storage: window.localStorage}));

export default feathersClient;
