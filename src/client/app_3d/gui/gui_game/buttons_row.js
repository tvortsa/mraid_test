

const left_button_img = "/gui_btn_image?name=arrow_l.png"
const middle_button_img = "/gui_btn_image?name=button_light.png"
const rignt_button_img = "/gui_btn_image?name=arrow_l.png"

const buttons_block_id = "gui_buttons_block"

const id_btns_grp = "buttons_row_"
const id_buttons = ["01", "02", "03", "04"]

const the_event = new CustomEvent("gui_button_press", { bubbles: true, detail: { button_is: false } });

const icos = [
    '/gui_btn_image?name=ico_gun.png',
    '/gui_btn_image?name=ico_body.png',
    '/gui_btn_image?name=ico_legs.png',
    '/gui_btn_image?name=ico_bkgrnd.png'
]

export const buttons_row = {

    images: [
        {
            id: "buttons_row_01",
            imgs_src: [
                left_button_img,
                middle_button_img,
                rignt_button_img,
                icos[0]
            ]
        },
        {
            id: "buttons_row_02",
            imgs_src: [
                left_button_img,
                middle_button_img,
                rignt_button_img,
                icos[1]
            ]
        },
        {
            id: "buttons_row_03",
            imgs_src: [
                left_button_img,
                middle_button_img,
                rignt_button_img,
                icos[2]
            ]
        },
        {
            id: "buttons_row_04",
            imgs_src: [
                left_button_img,
                middle_button_img,
                rignt_button_img,
                icos[3]
            ]
        }
    ],
    init: init,
    // start: start,
    // update: update
}

const buttons_handlers = [
    buttons_weapon_handler,
    buttons_body_handler,
    buttons_legs_handler,
    buttons_bkgrnd_handler
]

function init(params) {
    const id_btn_grp_1 = id_btns_grp + id_buttons[0]
    const id_btn_grp_2 = id_btns_grp + id_buttons[1]
    const id_btn_grp_3 = id_btns_grp + id_buttons[2]
    const id_btn_grp_4 = id_btns_grp + id_buttons[3]
    const container = window.document.getElementById(buttons_block_id);
    const buttons_rows = container.querySelectorAll("uk-button-group");
    buttons_rows.forEach(btn_row => {
        const buttons = btn_row.querySelectorAll("button");
        switch (btn_row.id) {
            case id_btn_grp_1:
                buttons_weapon_handler(buttons)
                break;
            case id_btn_grp_2:
                buttons_body_handler(buttons)
                break;
            case id_btn_grp_3:
                buttons_legs_handler(buttons)
                break;
            case id_btn_grp_4:
                buttons_bkgrnd_handler(buttons)
                break;

            default:
                break;
        }
    });

};

function buttons_weapon_handler(buttons) {
    buttons[0].onclick = (params) => {
        the_event.detail.button_is = id_btns_grp + id_buttons[0] + "L"
        buttons[0].dispatchEvent(the_event)
    }
    buttons[2].onclick = (params) => {
        the_event.detail.button_is = id_btns_grp + id_buttons[0] + "R"
        buttons[0].dispatchEvent(the_event)
    }
}

function buttons_body_handler(buttons) {
    buttons[0].onclick = (params) => {
        the_event.detail.button_is = id_btns_grp + id_buttons[1] + "L"
        buttons[0].dispatchEvent(the_event)
    }
    buttons[2].onclick = (params) => {
        the_event.detail.button_is = id_btns_grp + id_buttons[1] + "R"
        buttons[0].dispatchEvent(the_event)
    }
}

function buttons_legs_handler(buttons) {
    buttons[0].onclick = (params) => {
        the_event.detail.button_is = id_btns_grp + id_buttons[2] + "L"
        buttons[0].dispatchEvent(the_event)
    }
    buttons[2].onclick = (params) => {
        the_event.detail.button_is = id_btns_grp + id_buttons[2] + "R"
        buttons[0].dispatchEvent(the_event)
    }
}

function buttons_bkgrnd_handler(buttons) {
    buttons[0].onclick = (params) => {
        the_event.detail.button_is = id_btns_grp + id_buttons[3] + "L"
        buttons[0].dispatchEvent(the_event)
    }
    buttons[2].onclick = (params) => {
        the_event.detail.button_is = id_btns_grp + id_buttons[3] + "R"
        buttons[0].dispatchEvent(the_event)
    }
}

