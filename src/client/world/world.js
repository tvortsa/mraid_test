import { createCamera } from "./components/camera.js";
import { createCube } from "./components/greed.js";
import { createScene } from "./components/scene.js";

import { createRenderer } from "./utils/render.js";
import { resizer } from "./utils/resizer.js";


const world = {}
/**
 * @description создает world
 * @param {Object} params - объект параметров 
 */
export function make_world(params) {

    world.render = ()=>{}
    return world
}