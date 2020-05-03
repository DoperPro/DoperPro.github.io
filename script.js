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

function fill_obj_2ndfl(){
    for (let i = 0; i < счётчик; i++) {
        obj_2ndfl.sun.append(+document.getElementById(`amount_of_income_${i+1}`).value);
        console.log("ау");
        
    }
}

function generate_json_file(add){  

}

function добавить_строчку() {                            //добавляет строчку с доходами 
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


function удалить_строчку() {                    //для первой таблици
    tabl.lastChild.remove();
    счётчик = счётчик - 1;
}
function удалить_строчку1() {                    //для второй таблици
    tabl1.lastChild.remove();
    счётчик1 = счётчик1 - 1;
}


add_b.onclick = function () {                     //при нажатии кнопки добавить
    if (счётчик == 1) {
        dell_b.removeAttribute("disabled");
    }
    счётчик = счётчик + 1;
    добавить_строчку();
}
dell_b.onclick = function () {                   //при нажатии кнопки удалить
    if (счётчик == 2) {
        dell_b.setAttribute("disabled", "disabled");
    }
    удалить_строчку();
}
add_b_2.onclick = function () {
    if (счётчик1 == 1) {
        dell_b_2.removeAttribute("disabled");
    }
    счётчик1 = счётчик1 + 1;
    добавить_строчку1();
}
dell_b_2.onclick = function () {
    if (счётчик1 == 2) {
        dell_b_2.setAttribute("disabled", "disabled");
    }
    удалить_строчку1();
}



let summ = 0;
let minn = 0;

function fill_preview_table() {             //вычисляет и заполняет таблицу в HTML
    summ = 0;                               //доход
    minn = 0;                               //вычет
    for (let i = 0; i < счётчик; i++) {
        summ = summ + +document.getElementById(`amount_of_income_${i+1}`).value;
    }
    for (let i = 0; i< счётчик1; i++){
        minn = minn + +document.getElementById(`the_amount_of_the_deduction_two_${i+1}`).value;
    }

    document.getElementById('cell_1').innerText = summ;
    document.getElementById('cell_2').innerText = summ-minn;
    document.getElementById('cell_3').innerText = (summ-minn)*(+document.getElementById('tax').value/100);
    document.getElementById('cell_4').innerText = (summ-minn)*(+document.getElementById('tax').value/100);
    document.getElementById('cell_5').innerText = (summ-minn)*(+document.getElementById('tax').value/100);
}
document.documentElement.addEventListener('keyup', fill_preview_table);
document.documentElement.addEventListener('click',fill_preview_table);

 let clicks = 1;
    function onClick() {
        clicks += 1;
        document.getElementById("clicks").innerHTML = clicks; //Счетчик нажатий
    };


