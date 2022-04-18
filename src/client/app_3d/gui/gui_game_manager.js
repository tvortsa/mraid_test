// менеджер GUI игры
import { buttons_row } from "./gui_game/buttons_row.js";


export const gui_game_manager = {
    gui_controls: [
        buttons_row //,color_button, timer
    ],

    init: () => {
        gui_game_manager.gui_controls.forEach((ctrl, i) => {
            if (ctrl) {
                ctrl.init()
            }
        })
    },
start: () => {
    return "gui_manager was start";
},
    update: (params) => {
        gui_manager.gui_controls.forEach((block, i) => {
            block.forEach((ctrl, ind) => {
                ctrl.update(params);
            })
        });
    },
};