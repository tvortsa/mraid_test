// контроллер gui_timer
const ID = "gui_timer";
const _elem = document.getElementById(ID);

export const gui_timer_cntrl = {
  element: init(),
  init: () => {
    console.log("GUI таймер инициализирован");
  },
  start: () => {
    console.log("gui timer -> start");
    console.log(gui_timer_cntrl.element.data);
  },
  update: (params) => {
    // console.log(_elem.data);
    // gui_timer_cntrl.element.data += .1 * delta_time;

    _elem.innerText = Math.trunc(params.time);
  },
};

function init() {
  const elem = document.getElementById(ID);
  return elem;
}
