// three.js helpers

// import * as THREE from "https://cdn.skypack.dev/three@0.134.0";
import * as THREE from "../../../../src/libs/threejs/src/Three.js";

// const THREE = window.THREE;

export function _greed(size, divisions) {
  const gridHelper = new THREE.GridHelper(size, divisions);
  return gridHelper;
  // scene.add(gridHelper);
}

// просто замыкание - счетчик для "кефира"
export function tvr_make_counter() {
  let count = 0;
  return function () {
    return count++;
  };
}
