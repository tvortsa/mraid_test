// управление персонажами, кнопки смены частей

export const characters = {
    body: [],
    legs: [],
    init: init,
    next_legs: next(),
    next_body: next(),
    do_next: (direct, arr) => {
        let parts;
        let step;
        if (arr == "body") {
            parts = characters.body
            step = characters.next_body(direct)
        }
        if (arr == "legs") {
            parts = characters.legs
            step = characters.next_legs(direct)
        }
        
        console.log("pre " + arr + " : ");
        console.log(step[0]);
        console.log("pos " + arr + " : ");
        console.log(step[1]);
        parts[step[0]].visible = false
        parts[step[1]].visible = true
    }
}

function init(app) {
    app.scene.traverse((child) => {
        let s = child.name.slice(0, 4)
        switch (s) {
            case "body":
                characters.body.push(child)
                break;
            case "legs":
                characters.legs.push(child)
                break;
            default:
                break;
        }
    })

    document.addEventListener("gui_button_press", (event) => {
        switch (event.detail.button_is) {
            case "buttons_row_03L":
                console.log("кнопка 'предыдущие ноги'");
                characters.do_next(-1, "legs")
                break;
            case "buttons_row_03R":
                console.log("кнопка 'следующие ноги'");
                characters.do_next(1, "legs")
                break;
            case "buttons_row_02L":
                console.log("кнопка 'предыдущее тело'");
                characters.do_next(-1, "body")
                break;
            case "buttons_row_02R":
                console.log("кнопка 'следующее тело'");
                characters.do_next(1, "body")
                break;

            default:
                break;
        }


    })

} // end init()

function next() {
    let pos = 0
    return (direct) => {
        let pre = pos
        pos += direct
        if (pos <= 5 && pos > 0) {
            console.log("* " + pos);
            return [pre, pos]
        } else if (pos <= 0 ) {
            console.log("** " + pos);
            pos = 0
            return [pre, pos]
        } else if (pos > 5) {
            console.log("*** " + pos);
            pos = 5
            return [pre, pos]
        }
    }
}