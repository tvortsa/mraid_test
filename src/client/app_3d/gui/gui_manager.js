// общий контроллер gui
import { gui_timer_cntrl } from "./gui_timer.js";
import { obj_info_card } from "./obj_info_card.js";
import { debug_info } from "./debug_gui.js";
import { gui_view_ctrl } from "./gui_view.js";

export const gui_manager = {
  gui_controls: [gui_timer_cntrl, obj_info_card, debug_info, gui_view_ctrl],
  init: () => {
    gui_manager.gui_controls.forEach((control, i) => {
      control.init();
    });
  },
  start: () => {
    return "gui_manager was start";
  },
  update: (params) => {
    gui_manager.gui_controls.forEach((control, i) => {
      control.update(params);
    });
  },
};
