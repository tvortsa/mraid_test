// ТОЧКА ВХОДА в КЛИЕНТСКИЙ КОД (служебная)

// import { three } from "../../deps.ts";
// import * as THREE from "https://cdn.skypack.dev/three@0.134.0";
import * as THREE from "../libs/threejs/src/Three.js";
import { app_3d } from "./app_3d.js";
import { world } from "./_main.js";

console.log(`файл js_sources был прочитан`);

console.log("версия three.js: ");
console.log(THREE.REVISION);

console.log("app_3d start");

// window.THREE = THREE;

app_3d(window);
//world.main()
