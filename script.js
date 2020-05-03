"use strict"

let add_b = document.getElementById("add_button");      //кнопка добавить таблица доходов
let dell_b = document.getElementById("dell_button");    //кнопка удалить таблица доходов
let add_b_2 = document.getElementById("add_button1");
let dell_b_2 = document.getElementById("dell_button1");
let button_add = document.getElementById("button1");    // кнопка добавления 2НДФЛ
                                                        // должна отправить данные в .json

let счётчик = 1                                         //содержит колличество строк
let счётчик1 = 1

dell_b.setAttribute("disabled", "disabled");            //делает кнопку удаления неактивной для 1 таблицы
dell_b_2.setAttribute("disabled", "disabled");          //делает кнопку удаления неактивной для 2 таблицы
let tabl = document.getElementById("tabl_1");     //<-- id того класса таблицы
let tabl1 = document.getElementById("tabl_1.1");        //id второй таблицы


let obj_2ndfl = {       //объект данных 2 ндфл
    sun:[],                 //массив суммы для 1 табл
    mun:[],                 //массив вычита для 1 табл
    n:[]                    //массив вычита
}
let obj_fill = []        //массив данных для сервера

//!!!!!!!!!!!!!!!!!!!!!!  ВРЕМЕННЫЙ МАССИВ ДЛЯ ОТЛАДКИ !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
let obj_non_json = []   

function fill_obj_2ndfl(){                              //заполняет объект данных 2 ндфл
    for (let i = 0; i < счётчик; i++) {                 //заполняет массив суммы для 1 табл
        obj_2ndfl.sun.push(+document.getElementById(`amount_of_income_${i+1}`).value);
    }
    for (let i = 0; i < счётчик; i++) {                 //заполняет массив вычита для 1 табл
        obj_2ndfl.mun.push(+document.getElementById(`the_amount_of_the_deduction_${i+1}`).value);
    }
    for (let i = 0; i < счётчик1; i++) {                 //заполняет массив вычита
        obj_2ndfl.n.push(+document.getElementById(`the_amount_of_the_deduction_two_${i+1}`).value);
    }
}

function clear_obj_2ndfl(){                             //очищает объект данных 2 ндфл
    obj_2ndfl.sun = [];
    obj_2ndfl.mun = [];
    obj_2ndfl.n = [];
}

function generate_json_file(add){  

}


function добавить_строчку() {                            //добавляет строчку с доходами
    if (счётчик == 1) {
        dell_b.removeAttribute("disabled");
    }
    счётчик = счётчик + 1;
    let tmp = document.createElement('div');
    tmp.className = 'row justify-content-center';
    tmp.innerHTML = `
    <select name="month_${счётчик}" id="month_${счётчик}" class="col-1" form="main_form2">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
    </select>
    <input type="text" name="revenue_code_${счётчик}" id="revenue_code_${счётчик}" form="main_form2" maxlength="4" pattern="[0-9][0-9][0-9][0-9]" class="col-2">
    <input type="text" name="amount_of_income_${счётчик}" id="amount_of_income_${счётчик}" form="main_form2" class="col-3">
    <input type="text" name="deduction_code_${счётчик}" id="deduction_code_${счётчик}" form="main_form2" maxlength="3" pattern="[0-9][0-9][0-9][0-9]" class="col-2">
    <input type="text" name="the_amount_of_the_deduction_${счётчик}" id="the_amount_of_the_deduction_${счётчик}"form="main_form2" class="col-3">         
`;
    tabl.append(tmp);
   
}

function добавить_строчку1() {                            //добавляет строчку с вычитами
    if (счётчик1 == 1) {
        dell_b_2.removeAttribute("disabled");
    }
    счётчик1 = счётчик1 + 1;
    let tmp = document.createElement('div');
    tmp.className = 'row justify-content-center';
    tmp.innerHTML = `
    <input type="text" name="deduction_code_${счётчик1}" id="deduction_code_${счётчик1}" form="main_form2" maxlength="4"
    pattern="[0-9][0-9][0-9][0-9]" class="col-3">
<input type="text" name="the_amount_of_the_deduction_two_${счётчик1}" id="the_amount_of_the_deduction_two_${счётчик1}"
    form="main_form2" class="col-4">
    `;
    tabl1.append(tmp);
}


function удалить_строчку() {                        //для первой таблици
    tabl.lastChild.remove();
    if (счётчик == 2) {
        dell_b.setAttribute("disabled", "disabled");
    }
    счётчик = счётчик - 1;
}
function удалить_строчку1() {                       //для второй таблици
    tabl1.lastChild.remove();
    if (счётчик1 == 2) {
        dell_b_2.setAttribute("disabled", "disabled");
    }
    счётчик1 = счётчик1 - 1;
}


add_b.onclick = добавить_строчку;                   //при нажатии кнопки добавить (1 таблица)
dell_b.onclick = удалить_строчку;                   //при нажатии кнопки удалить(1 таблица)
    
add_b_2.onclick = добавить_строчку1;                //при нажатии кнопки добавить (1 таблица)
dell_b_2.onclick = удалить_строчку1;                //при нажатии кнопки удалить(2 таблица)


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[вычисление первью таблицы]~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
let summ = 0;                               //доход
let minn = 0;                               //вычет

function fill_preview_table() {             //вычисляет и заполняет таблицу в HTML
    summ = 0;                               //доход
    minn = 0;                               //вычет
    for (let i = 0; i < счётчик; i++) {
        summ = summ + +document.getElementById(`amount_of_income_${i+1}`).value;
    }
    for (let i = 0; i< счётчик1; i++){
        minn = minn + +document.getElementById(`the_amount_of_the_deduction_two_${i+1}`).value;
    }

    document.getElementById('cell_1').innerText = summ;                                                     //ячейка 1
    document.getElementById('cell_2').innerText = summ-minn;                                                //ячейка 2
    document.getElementById('cell_3').innerText = (summ-minn)*(+document.getElementById('tax').value/100);  //ячейка 3
    document.getElementById('cell_4').innerText = (summ-minn)*(+document.getElementById('tax').value/100);  //ячейка 4
    document.getElementById('cell_5').innerText = (summ-minn)*(+document.getElementById('tax').value/100);  //ячейка 5
}
document.documentElement.addEventListener('keyup', fill_preview_table); //тригер поднятия клавиши
//document.documentElement.addEventListener('click',fill_preview_table);  //тригер клика
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


 let clicks = 1;
    function onClick() {
        clicks += 1;
        document.getElementById("clicks").innerHTML = clicks; //Счетчик нажатий

        fill_obj_2ndfl();                                       //заполнить obj
        obj_fill.push(JSON.stringify(obj_2ndfl));               //записать как JSON 
        clear_obj_2ndfl();                                      //очистить obj
        let tmp = счётчик;
        for (let i = 1;i < tmp;i++){
            удалить_строчку();
        }
        tmp = счётчик1;
        for (let i = 1;i < tmp;i++){
            удалить_строчку1();
        }
        
        // console.log(obj_fill);                                      // ◄ ДЛЯ ОТЛАДКИ
        obj_non_json.push(JSON.parse(obj_fill[obj_fill.length-1])); // ◄ ДЛЯ ОТЛАДКИ
        // console.log(obj_non_json);                                  // ◄ ДЛЯ ОТЛАДКИ
        
        
        
        let all_input = document.querySelectorAll('input:not([type="button"])');
        for(let i = 0; i < all_input.length; i++){
            all_input[i].value = "";
        }
    };

    $(window).scroll(function() {
    var height = $(window).scrollTop();
    if (height > 100) {
        $('#button1').fadeIn();
    } else {
        $('#button1').fadeOut();
    }
});
$(document).ready(function() {
    $("#button1").click(function(event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "slow");
        return false;
    });

});


