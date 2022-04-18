import { WebGLRenderer } from "../../../libs/threejs/src/Three.js";


function createRenderer() {
  const renderer = new WebGLRenderer()

  return renderer;
}

export { createRenderer };