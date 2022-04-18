// массив элементов структуры общих для всех типов юнитов
// например: ID, pivot, дата создания и т.п.

// отложено, пока реализуем юниты через threejs класс Object3D
// общий код теперь в папке prefab

import * as THREE from "../../../../../src/libs/threejs/src/Three.js";
import { unit_data } from "./unit_data.js";

// возвращает общую структуру для экземпляра юнита
export function get_item_structure(unit_type, name, coords) {
  const ID = THREE.Math.generateUUID();
  const type = get_unit_type(unit_type);
  const struct = {
    ID: ID,
    type: type,
    name: name,
  };
}
