import { io } from "socket.io-client";

// Sirf ek baar initialize hoga
const SOCKET_URL = "https://khan-traders-api.onrender.com";

const socket = io(SOCKET_URL, {
  autoConnect: true,
  reconnection: true, // Connection toot jaye to khud reconnect karega
});

export default socket;