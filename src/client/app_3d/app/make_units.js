// генерируем юнитов для сцены
import { make_unit } from "../prefab/things/unit.js";
import { app_consts } from "./data.js";
import { Group } from "../../../libs/threejs/src/Three.js";

// тестовая генерация юнитов
const units = new Group();
units.name = "group_units";
export function generate_units(scene, app) {
  for (let a = 0; a < 5; a++) {
    for (let i = 0; i < 5; i++) {
      const unit = make_unit(0, "test unit");
      unit.position.x += (i - 2) * app_consts.units_interspace;
      unit.position.z += (a - 2) * app_consts.units_interspace;
      units.add(unit);
    }
  }
  units.visible = false;
  app.units = units;
  scene.add(units);
}
