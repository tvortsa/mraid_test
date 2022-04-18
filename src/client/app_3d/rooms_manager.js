// менеджер комнат инициализирует, заполняет, переключает, очищает и т.д. комнаты
import { rooms } from "./app/make_rooms.js";

let _rooms = rooms;

const rooms_manager = {
  rooms: _rooms,
};

export { rooms_manager };
