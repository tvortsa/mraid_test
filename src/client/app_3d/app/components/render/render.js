// модуль рендера

import { WebGLRenderer } from "../../../../../libs/threejs/src/Three.js";

function make_render(params) {
    const renderer = new WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xEEEEEE);
    return renderer    
} 

export const render_manager = {
    make_render: make_render
}