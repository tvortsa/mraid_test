// Добавление событий к кастомному объекту
//import * as THREE from "https://cdn.skypack.dev/three@0.134.0";
import * as THREE from "../../../../src/libs/threejs/src/Three.js";

// const THREE = window.THREE;

export class App_states extends THREE.EventDispatcher {
  init() {
    this.dispatchEvent({
      type: "init",
      message: "init",
    });
    return "init";
  }

  start() {
    this.dispatchEvent({
      type: "start",
      message: "start",
    });
    return "start";
  }

  update() {
    this.dispatchEvent({
      type: "update",
      message: "update",
    });
    return "update";
  }

  loaded() {
    this.dispatchEvent({
      type: "loaded",
      message: "loaded",
    });
    return "loaded";
  }
}
