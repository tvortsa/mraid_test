// Начнинаем прослушивание порта локального хоста.
import { coder } from "https://deno.land/x/coder/mod.ts";
import { walk } from "https://deno.land/std@0.132.0/fs/mod.ts";

const assets_path = "./assets"
const images_path = "/images"
const bkgrnds_path = "/bkgrnds"
const path_3d = "/data"
const body_path = "/bodies"
const leg_path = "/legs"
const port = 3001;
const server = Deno.listen({
  port: port,
});

export async function server_start(clrs) {
  console.log(`\n`);
  console.log(clrs.bgBrightMagenta(clrs.black(`            server `)));
  console.dir(server.addr);

  console.log(clrs.brightMagenta(`HTTP вебсервер запущен, доступ на: http://localhost:${port}/`));
  // Соединения с сервером будут обрабатываться как async iterable.
  for await (const conn of server) {
    // Чтобы не блокировать, нам нужно обрабатывать каждое соединение индивидуально
    // не дожидаясь функции
    console.log("произошло соединение с сервером");

    serveHttp(conn);
  }

  async function serveHttp(conn) {
    // Это «обновляет» сетевое соединение до HTTP-соединения.
    const httpConn = Deno.serveHttp(conn);
    // Каждый запрос, отправленный через HTTP-соединение, будет обработан как
    // асинхронный итератор из HTTP-соединения.
    for await (const requestEvent of httpConn) {
      // Собственный HTTP-сервер использует веб-стандартные объекты Request и Response.

      // const body = `Your user-agent is:\n\n${
      //   requestEvent.request.headers.get(
      //     "user-agent",
      //   ) ?? "Unknown"
      // }`;

      // создаем на базе url - url объект:
      const u = new URL(requestEvent.request.url);
      console.log("requestEvent.request.url: ");
      console.log(requestEvent.request.url);

      // console.log("requestEvent.request:");
      // console.dir(`${requestEvent.request}`);
      // if (requestEvent.request.bodyUsed) {
      //   console.log(requestEvent.request.body);
      // } else {
      //   console.log("в запросе нет тела");
      //   console.log(requestEvent.request.headers);
      // }

      let body;
      const decoder = new TextDecoder();
      let _content_type = "text/javascript";
      switch (u.pathname) {
        case "/":
          {
            const _file = Deno.readFileSync("./dist/index.html");
            // const html_str = _view();
            // body = coder.encode(html_str);
            body = _file;
            _content_type = "text/html; charset=utf-8";
            console.log("body: ");
            console.dir(body);
            // "<!DOCTYPE html><html><body><h1>My Site</h1><p>Welcome to my super lame site.</p></body></html>";
            // const decoder = new TextDecoder();
            // const body = decoder.decode(_file);
            // Метод requestEvent `.respondWith ()` - это то, как мы отправляем ответ
            // обратно к клиенту.
          }
          break;
        case "/get_bg_image":
          {
            let file_name = u.searchParams.get('name')
            let path_name = assets_path + images_path + bkgrnds_path + "/" + file_name
            console.log("- N A M E -");
            console.log(file_name);
            const imageBuf = await Deno.readFile(path_name);
            body = imageBuf;
            _content_type = 'image/png';
          }
          break;
        case "/bg_imgs":
          {
            let img_files = await get_bg_images_files("./assets/images/bkgrnds/")
            img_files = JSON.stringify(img_files)
            console.log("server - файлы бэкграундов: ");
            console.dir(img_files);
            body = img_files
            _content_type = 'image/png';
          }
          break;
        case "/gui_btn_image":
          {
            const img_name = u.searchParams.get('name')
            const path_name = assets_path + images_path + "/GUI/buttons/" + img_name
            try {
              const imageBuf = await Deno.readFile(path_name);
              body = imageBuf;
              _content_type = 'image/png';
            } catch (error) {
              console.log("********************");
              body = "can`t read the image"
            }
          }
          break;
        case "/fetch_port":
          {
            const _file = await Deno.readFile("./assets/test.txt");

            body = decoder.decode(_file);
            // body = _file;
          }
          break;
        case "/uikit.css":
          {
            const _file = await Deno.readFile(
              "./assets/uikit3/css/uikit.min.css",
            );

            body = decoder.decode(_file);
            _content_type = "text/css";
            // body = _file;
          }
          break;
        case "/tvr_custom.css":
          {
            const _file = await Deno.readFile(
              "./assets/uikit3/css/tvr_custom.css",
            );

            body = decoder.decode(_file);
            _content_type = "text/css";
            // body = _file;
          }
          break;
        case "/uikit.js":
          {
            const _file = await Deno.readFile(
              "./assets/uikit3/js/uikit.js",
            );

            body = decoder.decode(_file);
            // body = _file;
          }
          break;
        case "/uikit-icons":
          {
            const _file = await Deno.readFile(
              "./assets/uikit3/js/uikit-icons.js",
            );

            body = decoder.decode(_file);
            // body = _file;
          }
          break;
        case "/dist/js/bundle.js":
          {
            const _file = await Deno.readFile("./dist/js/bundle.js");
            body = decoder.decode(_file);
            // requestEvent.respondWith(
            //   new Response(body, {
            //     headers: {
            // "content-type": _content_type,
            // },
            // status: 200,
            // }),
            // );
          }
          // return;
          break;
        case "/get_3d_body":
          {
            let file_name = u.searchParams.get('name')
            let path_name = assets_path + path_3d + body_path + "/" + file_name
            console.log("- 3D Body get -");
            console.log(file_name);
            const _file = await Deno.readFile(path_name);
            body = _file;
            _content_type = 'model/gltf-binary';
          }
          break;
        case "/get_3d_leg":
          {
            let file_name = u.searchParams.get('name')
            let path_name = assets_path + path_3d + leg_path + "/" + file_name
            console.log("- 3D Leg get -");
            console.log(file_name);
            const _file = await Deno.readFile(path_name);
            body = _file;
            _content_type = 'model/gltf-binary';
          }
          break;
        default:
          body = "URL не найден!";
          break;
      }
      requestEvent.respondWith(
        new Response(body, {
          headers: {
            "content-type": _content_type,
          },
          status: 200,
        }),
      );
    }
  }
}

async function get_view(view_name) {
  const _file = await Deno.readFile(view_name);
  return _file;
}

async function get_bg_images_files(_path) {
  let entry_test = 0
  let bg_imgs = [];
  for await (const entry of walk("./" + _path)) {
    console.log(entry.path);
    if (entry.isFile) {
      bg_imgs.push(entry.name);
    }
    entry_test = entry
  }
  console.log(" - E N T R Y -");
  console.dir(entry_test);
  return bg_imgs
} 
