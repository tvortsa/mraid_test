// фон сцены

import { TextureLoader } from "../../../../../libs/threejs/src/Three.js";

const bg_img_files_url = "/bg_imgs";
const bg_images_url = "/get_bg_image"
const next_background = next();

const loader = new TextureLoader();

let bg_images = await get_bkgrnd_imgs(bg_img_files_url)
bg_images = await bg_images(bg_img_files_url)

export const background_manager = {
    init: init,
    make: make_background,
    next_background: next_background,
    count: 0
    // update: update
}

async function init(app) {
    document.addEventListener("gui_button_press", (event) => {
        switch (event.detail.button_is) {
            case "buttons_row_04L":
                console.log("кнопка 'предыдущий фон'");
                const step_pre = next_background(-1)
                set_bg_image(app.scene, step_pre)
                break;
            case "buttons_row_04R":
                console.log("кнопка 'следующий фон'");
                const step_next = next_background(1)
                set_bg_image(app.scene, step_next)
                break;

            default:
                break;
        }


    })
    if (!app.background) {
        app.background = {}
    }
    app.background.images = bg_images
    background_manager.count = bg_images.length
    return bg_images
}

async function make_background(params) {

    //const bgTexture = loader.load('https://r105.threejsfundamentals.org/threejs/resources/images/daikanyama.jpg');
    // let bg_images = await get_bkgrnd_imgs(bg_img_files_url)
    // console.log("bg_images : ");
    // console.dir(bg_images);

    const url = '/get_bg_image?name=' + bg_images[5]
    const bgTexture = loader.load(url);
    params.scene.background = bgTexture;

    function bg_update() {
        // Задаем свойства repeat и offset для background texture
        // чтобы сохранять соотношение сторон текстуры корректным.
        // изображение может быть еще не загруженым.
        if (params.app.renderer) {
            const _canvas = params.app.renderer.domElement
            const canvasAspect = _canvas.clientWidth / _canvas.clientHeight;
            const imageAspect = params.scene.background.image ? params.scene.background.image.width / params.scene.background.image.height : 1;
            const aspect = imageAspect / canvasAspect;

            params.scene.background.offset.x = aspect > 1 ? (1 - 1 / aspect) / 2 : 0;
            params.scene.background.repeat.x = aspect > 1 ? 1 / aspect : 1;

            params.scene.background.offset.y = aspect > 1 ? 0 : (1 - aspect) / 2;
            params.scene.background.repeat.y = aspect > 1 ? 1 : aspect;
        }
    }
    params.app.app_updatable("add", bg_update)
}

function next() {
    let current = 0;
    return (step) => {
        if (current >= background_manager.count-1 && step > 0) {
            return current = background_manager.count-1
        }

        if (current < background_manager.count-1 && step > 0) {
            return current += 1
        }
        if (current <= background_manager.count-1 && step < 0) {
            if (current > 0) {
                return current -= 1
            }

        }
        return current
    }

}

async function get_bkgrnd_imgs(url) {
    let img_files_names = 0
    console.log("img_files_names сейчас равно:");
    console.log(img_files_names);
    if (img_files_names == 0) {
        return async function (params) {
            const img_files = await fetch(url)
            console.log("get_bkgrnd_imgs(url)");
            console.log("файлы фонов: ")
            img_files_names = await img_files.json()
            console.dir(img_files_names);
            return img_files_names
        }
    } else {
        console.log("- memoize return -");
        return img_files_names
    }

}

async function set_bg_image(scene, nmbr) {
    console.log("bg_images[nmbr]");
    console.log(bg_images[nmbr]);
    console.log("nmbr");
    console.log(nmbr);
    const url = '/get_bg_image?name=' + bg_images[nmbr]
    try {
        const bgTexture = await loader.load(url);
        scene.background = bgTexture;
    } catch (error) {
        console.log("такого файла фона нет");
    }
    
    
}
