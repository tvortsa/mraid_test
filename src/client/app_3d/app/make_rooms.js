// создание комнат

import { room_lobby } from "./scenes/rooms/lobby/lobby_room.js";
const rooms = [];
const rooms_types_count = 1;
let room = { descript: "комната лобби" };
room = Object.assign(room_lobby, room);
// TODO:

export { rooms };
