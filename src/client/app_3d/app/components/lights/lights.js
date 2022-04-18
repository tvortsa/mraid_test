// модуль источников света

import { HemisphereLight } from "../../../../../libs/threejs/src/Three.js";

export const lights_manager = {
    make_light: make_light
}

function make_light(params) {
    switch (params.light_type) {
        case "1":
            const light1 = new HemisphereLight (0xffffff, 0xffffff,1.2);
            light1.color.setHSL(0.6, 1, 0.6);
            light1.groundColor.setHSL(0.095, 1, 0.75);
            light1.position.set(0, 3, -10);
            return light1
            break;

        default:
            const light = new HemisphereLight (0xffffff, 0xffffff, 0.3);
            light.color.setHSL(0.6, 1, 0.6);
            light.groundColor.setHSL(0.095, 1, 0.75);
            light.position.set(0, 10, 40);
            return light
            break;
            break;
    }
}