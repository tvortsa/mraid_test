// начальная сцена-комната предзагрузки
import { get_prefab_room } from "../../../../prefab/rooms/room.js";
import { data } from "./data.js";

/////// получаем prefab - часть, общую для всех комнат
const prefab = get_prefab_room();

////// собственный код комнаты
const gui_html_element = document.getElementById(data.gui_layer_id);
const button = document.getElementById(data.gui_layer_button);
const room_gui_elem = document.getElementById(data.gui_room_layer_id);
button.onclick = function () {
  room_gui_elem.removeAttribute("hidden");
  window.app.greed ? window.app.greed.visible = true : console.log("сетка сцены отсутствует");
  window.app.units ? window.app.units.visible = true : console.log("юнитов в сцене нет");
  window.app.bodies[0] ? window.app.bodies[0].visible = true : console.log("боди в сцене нет");
  window.app.legs[0] ? window.app.legs[0].visible = true : console.log("ног в сцене нет");
  window.app.parts_add()
  button.hidden = "true";
};
const room = {
  //TODO: GUI Лобби
  gui: {},
};
const _data = Object.assign(data, room);
////// объединяем prefab с уникальными данными лобби - комнаты
const room_lobby = Object.assign(prefab, _data);
console.log(" --> room_lobby init");
// console.dir(room_lobby);

export { room_lobby };
