// параметры и константы приложения

import { Vector3 } from "../../../libs/threejs/src/Three.js";

export const app_consts = {
  units_interspace: 2, // коэффициент расстояния между юнитами
  camera_units_offset_pos: new Vector3(.2, .2, .2), // точка зависания камеры над выделенным юнитом
  app_tick_time: 5.0,
  // camera_move_speed: .001,
  camera_move_speed: 4,
  home_camera_view: new Vector3(.76, 5, 7),
  cam_offset: new Vector3(1, 0.5, 1),
  origin_pos: new Vector3(0, 0, 0),
};
