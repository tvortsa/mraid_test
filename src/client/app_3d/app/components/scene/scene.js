// модуль сцены

import { Scene } from "../../../../../libs/threejs/src/Three.js";

export const scene_manager = {
    make_scene: make_scene
}


function make_scene(params) {
    const scene = new Scene();
    return scene
}