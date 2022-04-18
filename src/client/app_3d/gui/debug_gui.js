// debug gui
// контроллер элемента информации об объекте
const id = "debug_gui";
const trigger_id = "debug_ico";
const cam_alpha_id = "cam_alpha";
const cam_pos_id = "cam_pos";
const _cam_alpha = init_element(cam_alpha_id);
const _cam_pos = init_element(cam_pos_id);
const _delta_time = init_element("delta_time");

export const debug_info = {
  element: init_element(id),
  cam_alpha: init_element(cam_alpha_id),
  trigger: init_trigger(),
  init: () => {
    return;
  },
  start: () => {
    return;
  },
  update: (params) => {
    _cam_alpha.innerText = params.cam_alpha.toFixed(2);
    _delta_time.innerText = params.delta_time.toFixed(3);
    _cam_pos.innerText = params.cam_pos.x.toFixed(2) + " " +
      params.cam_pos.y.toFixed(2) + " " +
      params.cam_pos.z.toFixed(2);
    return;
  },
};

function init_element(_id) {
  const elem = document.getElementById(_id);
  return elem;
}

function init_trigger() {
  const elem = document.getElementById(trigger_id);
  const elem_ico = elem.querySelector("svg");
  elem_ico.onclick = () => {
    console.log("- debug ico click -");
    debug_info.element.classList.remove("uk-invisible");
  };
  return elem;
}
