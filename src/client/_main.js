// главный файл-модуль three клиента @deprecated

import { make_world } from "./world/world.js";


// получаем three приложение
const world = make_world(container)

// рендерим сцену
world.render();

export { world }