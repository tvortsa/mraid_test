// API функции управления видом и камерой
import { Clock, Vector3 } from "../../../libs/threejs/src/Three.js";

/**
 * tvr_camera_move - перемещение камеры
 *
 * @param  {object} app         объект приложения
 * @param  {THREE.camera} cam   камера
 * @param  {THREE.Vector3} to_pos целевая позиция
 * @param  {THREE.Vector3} target_pos позиция цели камеры
 * @param  {number} time        скорость переноса
 * @param  {THREE.Vector3} v_offset - вектор смещения от целевой позиции
 * @return {type}               description
 */

export function tvr_camera_move(app, cam, to_pos, target_pos, time, v_offset) {
  const _step = time / 100;
  let _alpha = 0;
  let fn_index = 0;
  let _v_offset = new Vector3(0, 0, 0);
  const _clock = new Clock(false);
  app.controls.saveState(); // фиксируем текущее положение камеры
  app.controls.enabled = false; // отключаем controls камеры на время анимации перехода
  if (v_offset) _v_offset = v_offset.clone();
  const v_cam = cam.position.clone();
  const v_to_pos = to_pos.clone();
  // const v2 = v_target_pos.clone().sub(v_offset);
  const v2 = v_to_pos.clone().add(_v_offset);
  const v_controls_target = app.controls.target.clone();
  const dist = v_cam.distanceTo(v2);
  // console.log("target_pos: ");
  // console.dir(target_pos);
  // console.log("v2: ");
  // console.log(v2.x + " " + v2.y + " " + v2.z);
  // console.log(v2);
  // cam_move.id = THREE.MathUtils.generateUUID();

  function cam_move() {
    if (!_clock.running) _clock.start();
    // if (cam.position.distanceTo(v2) > 1) {
    // console.log(_clock.getElapsedTime().toFixed(2));
    if (_clock.getElapsedTime().toFixed(2) * 1 < time) {
      _alpha = ((_clock.getElapsedTime().toFixed(3) * 1) * 100 / time) / 100; // * app.delta_time;
      _alpha = _alpha.toFixed(5) * 1;
      console.log(_alpha);

      // cam.position.set(v_cam.lerp(v2, _alpha));
      cam.position.x = (v_cam.lerp(v2, _alpha * app.delta_time)).x;
      if (cam.position.y > 1.0) {
        cam.position.y = (v_cam.lerp(v2, _alpha * app.delta_time)).y;
      }
      cam.position.z = (v_cam.lerp(v2, _alpha * app.delta_time)).z;

      app.controls.target.x =
        (v_controls_target.lerp(target_pos, _alpha * app.delta_time)).x;
      app.controls.target.y =
        (v_controls_target.lerp(target_pos, _alpha * app.delta_time)).y;
      app.controls.target.z =
        (v_controls_target.lerp(target_pos, _alpha * app.delta_time)).z;
      // cam.translateOnAxis(v2, .1);

      // cam.position.set(v_test_pos);
      cam.updateProjectionMatrix();
      // console.log("lerp alpha:");
      // console.log(_alpha);
      // _alpha += dist * (time * app.delta_time);
      // _alpha += _step * app.delta_time;
    } else {
      // удалить cam_move из app.updatable
      // console.log("удаляем cam_move из updatables");
      // console.log("fn_index: " + fn_index);
      app.app_updatable(fn_index - 1);
      app.controls.enabled = true;
    }
    app.cam_alpha = _alpha;
  }
  // добавить ф-цию cam_move в app.updatable
  fn_index = app.app_updatable("add", cam_move);
  // console.log("fn_index: ");
  // console.log(fn_index);
}
