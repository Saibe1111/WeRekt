import { io } from "socket.io-client";

const URL = process.env.VUE_APP_API_URL;
const socket = io(URL, { autoConnect: false });

export default socket;