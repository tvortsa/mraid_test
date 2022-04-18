// менеджер источников света

import { HemisphereLight } from "../../../../libs/threejs/src/Three.js";

export const manager_lights = {
    make_light:  make_light

}

function make_light(params) {
    switch (params.light_type) {
        case 1:
            const hemiLight = new HemisphereLight(0xffffff, 0xffffff, 0.3);
            hemiLight.color.setHSL(0.6, 1, 0.6);
            hemiLight.groundColor.setHSL(0.095, 1, 0.75);
            hemiLight.position.set(0, 50, 0);
            return hemiLight
            break;

        default:
            break;
    }
}