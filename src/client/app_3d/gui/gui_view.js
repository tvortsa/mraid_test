import { tvr_camera_move } from "../api/camera_controls.js";
import { app_consts } from "../app/data.js";

// GUI управления видом (камерой)
const id_home_view_button = "home_view_button";

export const gui_view_ctrl = {
  init: () => {
    init_trigger(id_home_view_button, app);
    return;
  },
  start: () => {
    return;
  },
  update: (params) => {
  },
};

function init_element(_id) {
  const elem = document.getElementById(_id);
  return elem;
}

function init_trigger(_id, app) {
  const _app = app;
  const elem = init_element(_id);
  const elem_ico = elem.querySelector("svg");
  elem_ico.onclick = () => {
    console.log("- home ico click -");
    // debug_info.element.classList.remove("uk-invisible");
    // app.controls.reset();
    tvr_camera_move(
      _app,
      _app.camera,
      app_consts.home_camera_view,
      app_consts.origin_pos,
      app_consts.camera_move_speed,
    );
  };
  return elem;
}
