// камера

import { PerspectiveCamera } from "../../../../../libs/threejs/src/Three.js";

export const camera_manager = {
    make_camera: make_camera
}

function make_camera(params) {
    const camera = new PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
      );
        camera.position.z = -15
    return camera
}
