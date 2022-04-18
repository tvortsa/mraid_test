// загрузчик 3D моделей

import { GLTFLoader } from '../../../../libs/threejs/examples/jsm/loaders/GLTFLoader.js';

const body_path = "/get_3d_body?name="
const legs_path = "/get_3d_leg?name="
const ext = ".glb"
const body_names = ["body_0", "body_1", "body_2", "body_3", "body_4", "body_5"]
const legs_names = ["Leg_0", "Leg_1", "Leg_2", "Leg_3", "Leg_4", "Leg_5",]

const loader = new GLTFLoader();

export async function init_load(app) {
	app.bodies = []
	app.legs = []
	body_names.forEach((_file, index) => {
		const file_path = body_path + _file + ext
		console.log("%c загрузка модели тела по адресу: ", "background: #7C219B; color: #AEB6BF");
		console.dir(file_path);
		const gltf = load(file_path, app, "bodies", index)
		console.log("%c gltf: ", "background: #138D75; color: #FDEBD0");
		console.dir(gltf);
	});
	legs_names.forEach((_file, index) => {
		const file_path = legs_path + _file + ext
		const gltf = load(file_path, app, "legs", index)
	});
	app.state = app.states.loaded(); // текущее состояние приложения
}

async function load(file_path, app, parts, index) {
	loader.load(file_path, function (gltf) {
		console.log("%c load gltf.scene: ", "background: #E59866; color: #85929E");
		console.dir(gltf.scene);
		gltf.scene.visible = false;
		switch (parts) {
			case "bodies":
				gltf.scene.name = "body_" + index 
				app.bodies.push(gltf.scene);
				break;
			case "legs":
				gltf.scene.name = "legs_" + index
				app.legs.push(gltf.scene);
				break;
		
			default:
				break;
		}
		

	}, undefined, function (error) {

		console.error(error);

	});
}

