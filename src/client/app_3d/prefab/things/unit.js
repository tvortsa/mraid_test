// "класс" генератор юнита
// я стараюсь не использовать ООП,
// так что слово "класс" использую чисто семантически

import * as THREE from "../../../../libs/threejs/src/Three.js";
import { unit_data } from "./unit_data.js";

export function make_unit(type, name) {
  const geometry = new THREE.BoxGeometry(
    unit_data.unit_default_size[0],
    unit_data.unit_default_size[1],
    unit_data.unit_default_size[2],
  );
  const material = new THREE.MeshBasicMaterial({
    color: unit_data.unit_default_color,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = "gizmo";
  const unit = new THREE.Group();
  unit.name = name;
  unit.userData.type = type;
  unit.add(mesh);
  mesh.callback = function () {
    console.log(this.name);
  };

  return unit;
}
