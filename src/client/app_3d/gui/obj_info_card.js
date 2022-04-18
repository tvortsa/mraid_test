// контроллер элемента информации об объекте
const id = "obj_name";

export const obj_info_card = {
  element: init(),
  init: () => {
    return;
  },
  start: () => {
    return;
  },
  update: () => {
    return;
  },
  click: (obj) => {
    console.log("произошел клик по объекту: ");
    console.dir(obj);
    obj_info_card.element.classList.remove("uk-invisible");
    obj_info_card.element.innerText = obj.name;
  },
};

function init() {
  const elem = document.getElementById(id);
  return elem;
}
