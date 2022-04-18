// import { compileFile, compileFileClient } from "https://deno.land/x/pug/mod.ts";
import { compileFile } from "../deps.ts"; // pug - конвертер
import { server_start } from "./server/server.js";
import { clrs } from "../deps.ts"; // цвета для консоли
// import style from "../../assets/uikit3/css/uikit.css";


// папка дистрибутивa бандла
const dist_path = "./dist";

// точка входа в проект
console.log(clrs.bgCyan(clrs.black(" deno main.js start ")));

// API задач сборки и запуска проекта

console.log("режим запуска: " + Deno.args[0]);

if (Deno.args[0] != "serv") {
  makeDistFolder(dist_path);
}else{
  server_start(clrs);
}


// предварительные настройки проекта

// сборка и настройка бэк-энда

/* сборка и настройка фронтэнда
 *  собрать все фронтэнд-зависимости в бандл
 */

// make_front();

// запуск бэкэнда и сервисов

// отчеты и логи

// функция чтения всех файлов по указанному пути

async function make_front() {
  // конвертируем все PUGs из ./src/pug во views/html
  await make_front_bundle();

  const _view = await compileFile("src/pug/index.pug");
  // console.log(_view());

  // console.log(compileFileClient("src/pug/index.pug"));
  try {
    console.log(
      clrs.cyan(`пробуем записать компиляцию index.pug в ./dist/index.html`),
    );
    await Deno.writeTextFile("./dist/index.html", _view());
  } catch (e) {
    console.log(clrs.cyan(`файл ./dist/index.html не записался: ${e}`));
  } finally {
    console.log(clrs.cyan('index.html создан'));
  }

  //старт сервера
  server_start(clrs);

}

// создаем папку /dist для бандла приложения
async function makeDistFolder(path) {
  // удаляем папку dist если она есть (вынести во внешнюю ф-цию)
  let result = true;
  try {
    await Deno.remove(path, {
      recursive: true,
    });
  } catch (e) {
    console.log(clrs.yellow(`отсутствует папка для удаления: ${path}`));
    console.log(e);
    result = e;
  } finally {
    if (result === true) {
      console.log(clrs.yellow(`удаление папки ${path} завершено`));
    } else {
      console.log(clrs.red(
        "удаление папки ${path} не удалось, скорее всего такой папки нет",
      ));
      console.log(clrs.red(`стек ошибки: ${result}`));
    }
    try {
      console.log(clrs.cyan(`создаю папку ${path}`));
      Deno.mkdirSync(path);
      Deno.mkdirSync(path + "/js");
      console.log(clrs.green("папка создана"));
    } catch (e) {
      console.log(
        clrs.red(`создать папку ${path} не получилось, вот почему: `),
      );
      console.log(clrs.red(e));
    } finally {
      console.log("\n");
      make_front();
    }
  }
}

// создаем бандл браузерного кода
async function make_front_bundle() {
  const {
    files,
  } = await Deno.emit("src/client/main.js", {
    bundle: "module",
  });
  console.log(clrs.bgGreen(clrs.yellow("фронт - bundle: ")));
  console.dir(files);
  const s = "deno:///";
  try {
    for (const [filename, text] of Object.entries(files)) {
      const _filename = filename.slice(s.length);
      console.log(`имя файла: ${_filename}`);
      Deno.writeTextFileSync("dist/js/" + _filename, text);
    }
  } catch (e) {
    console.error(
      clrs.red(`запись js-бандла фронта сломалась \n ошибка: ${e}`),
    );
  } finally {
    console.log("\n");
    console.log(clrs.green("создание бандла фронта завершено"));
  }
}
