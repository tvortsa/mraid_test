// точка входа в 3D приложение
// import * as THREE from "https://cdn.skypack.dev/three@0.134.0";
import * as THREE from "../libs/threejs/src/Three.js";
import { App_states } from "./app_3d/prefab/app_states.js";
import Kefir from "../libs/kefir.esm.js";
import { _greed } from "./app_3d/utils/helpers.js";
import { _CONSTANTS } from "./app_3d/data.js";
import { app_consts } from "./app_3d/app/data.js";

import { tvr_camera_move } from "./app_3d/api/camera_controls.js";
// import { OrbitControls } from "https://cdn.skypack.dev/three@0.134.0/examples/jsm/controls/OrbitControls.js";
import {
  OrbitControls,
} from "../../src/libs/threejs/examples/jsm/controls/OrbitControls.js";

import { gui_manager } from "./app_3d/gui/gui_manager.js";

import { rooms_manager } from "./app_3d/rooms_manager.js";

import { experiments } from "./app_3d/utils/experiments.js"; // тесты и эксперименты (// TODO: убрать в продакшне)
import { render_manager } from "./app_3d/app/components/render/render.js";
import { camera_manager } from "./app_3d/app/components/camera/camera.js";
import { scene_manager } from "./app_3d/app/components/scene/scene.js";
import { lights_manager } from "./app_3d/app/components/lights/lights.js";
import { background_manager } from "./app_3d/app/components/background/background.js";
import { gui_game_manager } from "./app_3d/gui/gui_game_manager.js";

import { init_load } from "./app_3d/app/scenes/models_loader.js";
import { Vector3 } from "../libs/threejs/build/three.module.js";

import { characters } from "./app_3d/app/components/characters/characters.js";

// pre-app code
const app_tick_clock = new THREE.Clock(false);
let eTime = 0;
const app_tick = {
  clock: app_tick_clock,
  tick: () => {
    // console.log(app_tick.clock.getElapsedTime());
    if (!app_tick.clock.running) {
      app_tick.clock.start();
    } else {
      // console.log("app_tick start");
      eTime = app_tick.clock.getElapsedTime();
      // console.log("app_tick elapsed time: ");
      // console.log(eTime);
      // console.log(app_consts.app_tick_time);
      if (app_consts.app_tick_time == undefined) {
        console.log("app_consts.app_tick_time не определено!");
      } else {
        if (eTime >= app_consts.app_tick_time) {
          console.log("тик");
          app_tick.clock.stop();
        }
      }
    }
  },
};

// app code

const _app = {};
_app.constants = _CONSTANTS;
_app.delta_time = 0;
_app.time = 0;
_app.updatable = [app_tick]; // массив объектов с функцией tick() для выполнения в цикле анимации
_app.cam_alpha = 0;

export async function app_3d(window) {
  // -------------- INIT state (metod)
  // ---------------------------------
  function init(do_start) {
    console.log("app_3d.js init");
    _app.states = new App_states(); // экземпляр класса состояний приложения
    _app.states.addEventListener("init", function (event) {
      // код функции события, например alert(event.message);
      console.log("e > init");
    });
    _app.states.addEventListener("start", function (event) {
      console.log("e > start");
      start(function(params) {
        _app.state = _app.states.update()
      });
    });
    _app.states.addEventListener("update", function (event) {
      console.log("e > update");
      update();
    });
    _app.states.addEventListener("loaded", function (event) {
      console.log("e > loaded");
      _app.bodies.forEach(body => {
        body.visible = false
        _app.scene.add(body)
      });
      _app.legs.forEach(leg => {
        leg.visible = false
        _app.scene.add(leg)
      });
      // _app.bodies[0].visible = true
    })

    _app.state = _app.states.init(); // текущее состояние приложения

    // console.log("window:");
    // console.dir(window);
    window.app = _app;

    _app.clock = new THREE.Clock();

    const scene = scene_manager.make_scene()
    const camera = camera_manager.make_camera()

    _app.scene = scene;

    const hemiLight = lights_manager.make_light({ light_type: "1" })
    _app.scene.add(hemiLight);

    _app.camera = camera;

    // background

    background_manager.init(_app) // app.background (сайд-эффект)
    gui_game_manager.init()

    // raycast mouse
    _app.raycaster = new THREE.Raycaster();
    _app.mouse = new THREE.Vector2();

    window.document.addEventListener("pointerdown", onPointerDown);

    function onPointerDown(event) {
      event.preventDefault();

      _app.mouse.x = (event.clientX / _app.renderer.domElement.clientWidth) * 2 - 1;
      _app.mouse.y = -(event.clientY / _app.renderer.domElement.clientHeight) * 2 +
        1;

      _app.raycaster.setFromCamera(_app.mouse, _app.camera);

      if (_app.units) {
        _app.intersects = _app.raycaster.intersectObjects(_app.units.children);

        if (_app.intersects.length > 0) {
          console.dir(_app.intersects);

          _app.intersects[0].object.callback();

          _app.gui_manager.gui_controls[1].click(_app.intersects[0].object);

          // перемещаем камеру к кликнутому объекту
          tvr_camera_move(
            _app,
            _app.camera,
            _app.intersects[0].object.parent.position,
            _app.intersects[0].object.parent.position,
            app_consts.camera_move_speed,
            app_consts.cam_offset,
          );
        }
      }
    }

    // end - raycast mouse

    _app.greed = _greed(15, 50);

    _app.greed.name = "main_greed";
    _app.greed.visible = false;
    _app.greed.material.transparent = true;
    _app.greed.material.opacity = 0.1;
    scene.add(_app.greed);

    camera.position.set(0.0, 2.0, 5.0);

    _app.renderer = render_manager.make_render();

    const controls = new OrbitControls(camera, _app.renderer.domElement);
    controls.target.set(0, 0.5, 0);
    camera.position.set( 1, 3, 7 );
    controls.update();
    _app.controls = controls;

    // document.body.appendChild(renderer.domElement);
    const html_canvas_container = document.getElementById(
      "threejs_canvas_container",
    );

    const three_canvas = _app.renderer.domElement;

    // three_canvas.classList.add("uk-width-1-1");
    three_canvas.classList.add("uk-container-expand");
    three_canvas.classList.add("uk-height-viewport");

    html_canvas_container.appendChild(three_canvas);

    // GUI manager
    _app.gui_manager = gui_manager;
    _app.gui_manager.init();

    // window resize
    window.addEventListener("resize", onWindowResize);

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      _app.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    console.log("%c app_3D init_load", "background: blue; color: #bada55");
    init_load(_app)

    do_start()
    // start(); // хардкод! заменить вызовом из апп-стэйта

  } // end - init()

  _app.rooms_manager = rooms_manager;

  // -------------- START state (metod)
  // ---------------------------------
  async function start(do_update) {
    console.log("app_3D start()");

    // const stream_beep = Kefir.interval(1000, "Бип");
    // stream_beep.log();

    const stream = Kefir.later(_CONSTANTS.start_delay, "kefir ->> update");
    stream.onValue((x) => {
      console.log("kefir value:", x);
      //_app.state = _app.states.update();
    });

    console.log("делОем фончеГ - ");
    await background_manager.make({ app: _app, scene: _app.scene })

    // добавляем gltf bodies и legs к сцене
    _app.parts_add = () => {
     _app.bodies.forEach(bdy => {
       _app.scene.add(bdy)
       bdy.rotateX(1.5)
     }); 
     _app.legs.forEach(leg => {
       _app.scene.add(leg)
       leg.rotateX(1.6)
       leg.rotateZ(3)
       leg.position.y = -2
       leg.scale.x = 20
       leg.scale.y = 20
       leg.scale.z = 20
     }); 
     characters.init(_app)
     _app.characters = characters
    }
    
    do_update()
  } // end start()

  // -------------- UPDATE state (metod)
  // ---------------------------------

  function update() {
    console.log("app ->> update");

    function animate() {
      _app.delta_time = _app.clock.getDelta();
      _app.time = _app.clock.getElapsedTime();
      // console.log(_app.delta_time);
      requestAnimationFrame(animate);
      _app.controls.update();
      _app.updatable.forEach((item, i) => {
        if (typeof item == "function") {
          item();
        } else {
          item.tick();
        }
      });

      _app.gui_manager.update({
        delta_time: _app.delta_time,
        time: _app.time,
        cam_alpha: _app.cam_alpha,
        cam_pos: _app.camera.position,
      });
      _app.renderer.render(_app.scene, _app.camera);
    }
    animate();
  }

  init(function() {
    {
      _app.state = _app.states.start();
    }
  });
}

// добавить/удалить функцию к app.updatable
_app.app_updatable = (flag, fn) => {
  if (flag == "add") {
    // добавить fn к updatable
    let fn_index = _app.updatable.push(fn);
    return fn_index;
  } else { // если не "add" то индекс функции в массиве updatable
    // убрать fn из updatable
    _app.updatable.splice(flag, 1);
    // console.log("функция перемещения камеры удалена из updatables");
  }
};
