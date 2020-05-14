function отладка() {
    first_page_save();
    console.log('Данные с первой страницы сохраненны');
    ref_1();
    fill(current_buffer);
}
function отладка1() {
    first_page_object = JSON.parse('{\"date\":\"2019-12-04\",\"ENN\":\"744773859993\",\"surname\":\"Жуков\",\"name\":\"Пётр\",\"dad\":\"Иваненко\",\"id_doc\":\"18\",\"taxpayer\":\"1\",\"location\":\"12345678901234567890\",\"series_number\":\"8838442312\",\"date_of_issue\":\"2020-04-28\",\"issued_by\":\"дядей мишей\",\"phone\":\"475384758345\"}');
    ref_1();
    fill(current_buffer);
}

let button_back; // кнопка второй страницы

//всё содержимое body без скриптов
const body_content = document.getElementById('body_content');
//обЪект с данными для заполнения pdf
let obj = {};
//обЪект с данными первой страницы
let first_page_object = {};
function first_page_save() {
    first_page_object = {
        date: document.getElementById('date').value,
        ENN: document.getElementById('ENN').value,
        surname:  document.getElementById('surname').value,
        name: document.getElementById('name').value,
        dad: document.getElementById('dad').value,
        id_doc: document.getElementById('id_doc').value,
        taxpayer: document.getElementById('taxpayer').value,
        location: document.getElementById('location').value,
        series_number: document.getElementById('series_number').value,
        date_of_issue: document.getElementById('date_of_issue').value,
        issued_by: document.getElementById('issued_by').value,
        phone: document.getElementById('phone').value,
    }
}

function first_page_fill() {
    for (let index in first_page_object) {
        document.getElementById(index).value = first_page_object[index];
    }
}
//функция наполнения объекта данными с первой страницы
function ref_1() {
    // let all_input = document.querySelectorAll("input")


    // for (let i = 0; i < all_input.length; i++) {
    //     obj[all_input[i].id] = [all_input[i].value];
    // }
    obj['surname'] = [first_page_object.surname];
    obj['name'] = [first_page_object.name];
    obj['dad'] = [first_page_object.dad];

    obj['location'] = [first_page_object.location.slice(0,17)] ; //место рождения
    obj['location2'] = [first_page_object.location.slice(17,57)]; //место рождения

    obj['date1'] = [first_page_object.date.split('-')[2]];   //Дата рождения день
    obj['date2'] = [first_page_object.date.split('-')[1]];   //Дата рождения месяц
    obj['date3'] = [first_page_object.date.split('-')[0]];   //Дата рождения год

    obj['year'] = [Date().split(' ')[3]];
    obj['ENN'] = [first_page_object.ENN];
    obj['id_doc'] = [first_page_object.id_doc];
    obj['taxpayer'] = [first_page_object.taxpayer];

    console.log(obj);
}
// document.documentElement.addEventListener('click', ref);

//заполняет PDF файл
//buf - буфер с исходным pdf файлом
function fill(buf) {

    var filled_pdf;
    try {
        filled_pdf = pdfform().transform(buf, obj);
    } catch (e) {
        return on_error(e);
    }

    var blob = new Blob([filled_pdf], { type: 'application/pdf' });
    saveAs(blob, '3ndfl.pdf');
}


// буфер с исходным pdf файлом
var current_buffer;


// загружает in.pdf с сервера и отправляет его в буфер
//=================================================================================================
var url = 'in.pdf';

var xhr = new XMLHttpRequest();
xhr.open('GET', url, true);
xhr.responseType = 'arraybuffer';

xhr.onload = function () {
    if (this.status == 200) {
        current_buffer = this.response;
    } else {
        console.log('EEEEEEEEEEEERRRRRRRRRRROOOR');
    }
};

xhr.send();
//=================================================================================================

function second_page() {
    body_content.innerHTML = `
	<main>
		<form action="#" method="get" id="main_form2">
			<p id="form">Бланк № <a id="clicks">1</a></p>
			<div class="income">
				<h1>Доходы полученные в РФ<h1>
			</div>
			<div class="section2.1">
				<ul>
					<li>
						<div class="tax"><span>Налоговая ставка</span><input type="tel" pattern="[0-9]{2}" maxlength="2"
								name="tax" id="tax"><span>%</span>
					</li>
			</div>
			<li>
				<div class="ENN_2"><span>ИНН </span><input type="tel" pattern="[0-9]{12}" maxlength="12" name="ENN">
					<span>КПП</span><input type="tel" pattern="[0-9]{9}" maxlength="9" name="KPP">
					<span>Код по ОКТМО</span><input type="tel" pattern="[0-9]{11}" maxlength="11" name="OKTMO">
			</li>
			</div>
			<li>
				<div class="source_of_payment"><span>Наименование источника выплаты дохода</span><input type="text"
						name="source_of_payment" id="source_of_payment" pattern="^[А-Яа-яЁё]+$"></div>
			</li>
			</ul>
			</div>
			<div class="payment">
				<h1>Расчет налоговой базы и суммы налога по доходам, облагаемым по ставке<h1>
			</div>
			<div class="rate_of_return">
				<h2>1. Доходы облагаемые по ставке</h2>
				<div class="tabl" id="tabl_1">
					<div class="row justify-content-center">
						<div class="col-1" name="month" form="main_form2">Месяц</div>
						<div class="col-2" name="revenue_code" form="main_form2">Код дохода</div>
						<div class="col-3" name="amount_of_income" form="main_form2">Сумма дохода</div>
						<div class="col-2" name="deduction_code" form="main_form2">Код вычета</div>
						<div class="col-3" name="the_amount_of_the_deduction" form="main_form2">Сумма вычета</div>
					</div>
					<!-- Месяц -->
					<div class="row justify-content-center">
						<select name="month_1" id="month_1" class="col-1" form="main_form2">
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
						<!-- Код дохода -->
						<input type="tel" name="revenue_code_1" id="revenue_code_1" form="main_form2" pattern="[0-9]{4}"
							maxlength="4" class="col-2">
						<!-- Сумма дохода -->
						<input type="number" name="amount_of_income_1" id="amount_of_income_1" form="main_form2"
							class="col-3">
						<input type="tel" name="deduction_code_1" id="deduction_code_1" form="main_form2"
							pattern="[0-9]{3,4}" maxlength="4" class="col-2">
						<input type="number" name="the_amount_of_the_deduction_1" id="the_amount_of_the_deduction_1"
							form="main_form2" class="col-3">
					</div>
				</div>
				<div class="row justify-content-center">
					<div class="button1">
						<input type="button" id="add_button" value="Добавить строчку"></div>
					<div class="button2">
						<input type="button" disabled="disabled" id="dell_button" value="Удалить строчку"></div>
				</div>
			</div>

			<div class="tax_deductions">
				<h2>2. Стандартные, социальные и имущественные налоговые вычеты</h2>
				<div class="tabl_1" id="tabl_1.1">
					<div class="row justify-content-center">
						<div class="col-3" name="deduction_code_one">Код вычета</div>
						<div class="col-4" name="the_amount_of_the_deduction_one">Сумма вычета</div>
					</div>
					<div class="row justify-content-center">
						<input type="tel" name="deduction_code_two_1" id="deduction_code_two_1" form="main_form2"
							pattern="[0-9]{3,4}" maxlength="4" class="col-3">
						<input type="number" name="the_amount_of_the_deduction_two_1"
							id="the_amount_of_the_deduction_two_1" form="main_form2" class="col-4">
					</div>
				</div>
				<div class="row justify-content-center">
					<div class="button1">
						<input type="button" id="add_button1" value="Добавить строчку"></div>
					<div class="button2">
						<input type="button" disabled="disabled" id="dell_button1" value="Удалить строчку"></div>
				</div>
			</div>

			<div class="total_revenue">
				<h2>3. Общие суммы дохода и налога по итогам налогового периода по ставке</h2>
			</div>
			<table>
				<tr>
					<td>Общая сумма дохода</td>
					<td id="cell_1"></td>
				</tr>
				<tr>
					<td>Налоговая база</td>
					<td id="cell_2"></td>
				</tr>
				<tr>
					<td>Сумма налога исчисленная</td>
					<td id="cell_3"></td>
				</tr>
				<tr>
					<td>Сумма налога удержанная</td>
					<td id="cell_4"></td>
				</tr>
				<tr>
					<td>Сумма налога перечисленная</td>
					<td id="cell_5"></td>
				</tr>
				<tr>
					<td>Сумма налога, излишне удержанная налоговым агентом</td>
					<td id="cell_6"></td>
				</tr>
				<tr>
					<td>Сумма налога, не удержанная налоговым агентом</td>
					<td id="cell_7"></td>
				</tr>
			</table>
			<div class="search">
				<a href="index.html" class="button-back"> Назад</a>
				<button type="button" id="button1" onClick="onClick()">Добавить</button>
				<button type="button" id="button2">Отправить</button>
			</div>
		</form>
	</main>
`;
}
function first_page() {
    body_content.innerHTML = `
    <form action="income.html" method="get" id="main_form">
    <div class="taxpayer">
        <h1>Данные о налогоплательщике<h1>
    </div>
    <div class="section1">
        <ul>
            <li>
                <div class="ENN"><span>ИНН </span><input type="tel" pattern="[0-9]{12}" maxlength="12" id="ENN"
                        name="ENN"></div>
            </li>
            <div class="surname"><span>Фамилия </span><input type="text" name="surname" id="surname"
                    pattern="^[А-Яа-яЁё]+$">
                <span>Имя </span><input type="text" name="name" id="name" pattern="^[А-Яа-яЁё]+$">
                <span> Отчество* </span><input type="text" name="dad" id="dad" pattern="^[А-Яа-яЁё]+$"></div>
            <li>
                <div class="data_location"><span>Дата рождения </span><input type="date" name="date" id="date">
                    <span>Место рождения </span><input type="text" name="location" id="location"></div>
            </li>
        </ul>
    </div>
    <div class="section2">
        <ul>
            <li>
                <div class="id_doc"><span>Код вида документа </span><select name="id_doc" id="id_doc"
                        form="main_form">
                        <option value="18">18 — Свидетельство о предоставлении временного убежища на территории
                            Российской Федерации</option>
                        <option value="21">21 — Паспорт гражданина Российской Федерации</option>
                        <option value="23">23 — Свидетельство о рождении, выданное уполномоченным органом
                            иностранного государства</option>
                    </select></div>
            </li>
            <li>
                <div class="series_number"><span>Серия и номер </span><input type="tel" pattern="[0-9]{10}"
                        maxlength="10" name="series_number" id="series_number">
                    <span>Дата выдачи </span><input type="date" name="date_of_issue" id="date_of_issue"></div>
                <div class="issued_by"><span>Кем выдан </span><input type="text" name="issued_by"
                        id="issued_by"></div>
            </li>
        </ul>
    </div>
    <div class="section3">
        <ul>
            <li>
                <div class="taxpayer1"><span>Код статуса налогоплательщика </span><select name="taxpayer"
                        id="taxpayer" form="main_form">
                        <option value="1">1 — налоговый резидент Российской Федерации</option>
                        <option value="2">2 — лицо, не являющееся налоговым резидентом Российской Федерации
                        </option>
                    </select></div>
            </li>
            <li>
                <div class="phone"><span>Номер контакного телефона </span><input type="tel" pattern="[0-9]{12}"
                        maxlength="12" name="phone" id="phone"></div>
            </li>
        </ul>
    </div>
    <div class="search">
        <button type="submit">Продолжить</button>
    </div>
</form>
`;
}

//при нажатии кнопки "продолжить"на первой страници
var fp_continue_button = document.querySelector('#main_form');
fp_continue_button.addEventListener('submit', fp_continue_button_F);


function fp_continue_button_F(e) {
    e.preventDefault();
    fp_continue_button.removeEventListener('submit', fp_continue_button_F);
    first_page_save();
    ref_1();
    // fill(current_buffer);

    second_page();
    button_back = document.querySelector('.button-back');
    button_back.addEventListener('click', button_back_F);
    set_second_page_elemint();
}
//на второй странице кнопка назад
function button_back_F(e) {
    e.preventDefault();
    console.log('YYYYYYYYYYY first_page');
    button_back.removeEventListener('click', button_back_F);
    add_b.removeEventListener('click', добавить_строчку);                   //при нажатии кнопки добавить (1 таблица)
    dell_b.removeEventListener('click', удалить_строчку);                   //при нажатии кнопки удалить(1 таблица)

    add_b_2.removeEventListener('click', добавить_строчку1);                //при нажатии кнопки добавить (1 таблица)
    dell_b_2.removeEventListener('click', удалить_строчку1);                //при нажатии кнопки удалить(2 таблица)
    first_page();
    first_page_fill();
    fp_continue_button = document.querySelector('#main_form');
    fp_continue_button.addEventListener('submit', fp_continue_button_F);


}
let add_b;      //кнопка добавить таблица доходов
let dell_b;    //кнопка удалить таблица доходов
let add_b_2;
let dell_b_2;
let button_add;    // кнопка добавления 2НДФЛ
// должна отправить данные в .json

let счётчик = 1;                                //содержит колличество строк
let счётчик1 = 1;


let tabl;     //<-- id того класса таблицы
let tabl1;        //id второй таблицы

function set_second_page_elemint() {
    dell_b = document.getElementById("dell_button");    //кнопка удалить таблица доходов
    add_b_2 = document.getElementById("add_button1");
    dell_b_2 = document.getElementById("dell_button1");
    button_add = document.getElementById("button1");    // кнопка добавления 2НДФЛ
    add_b = document.getElementById("add_button");      //кнопка добавить таблица доходов
    // должна отправить данные в .json
    счётчик = 1;                                //содержит колличество строк 
    счётчик1 = 1;

    dell_b.setAttribute("disabled", "disabled");            //делает кнопку удаления неактивной для 1 таблицы
    dell_b_2.setAttribute("disabled", "disabled");          //делает кнопку удаления неактивной для 2 таблицы
    tabl = document.getElementById("tabl_1");     //<-- id того класса таблицы
    tabl1 = document.getElementById("tabl_1.1");        //id второй таблицы



    add_b.addEventListener('click', добавить_строчку);                   //при нажатии кнопки добавить (1 таблица)
    dell_b.addEventListener('click', удалить_строчку);                   //при нажатии кнопки удалить(1 таблица)

    add_b_2.addEventListener('click', добавить_строчку1);                //при нажатии кнопки добавить (1 таблица)
    dell_b_2.addEventListener('click', удалить_строчку1);                //при нажатии кнопки удалить(2 таблица)
}

let obj_2ndfl = {       //объект данных 2 ндфл
    sun: [],                 //массив суммы для 1 табл
    mun: [],                 //массив вычита для 1 табл
    n: []                    //массив вычита
}

let obj_sum_wndfl={ //хранит суммы
    sun: [0],                 
    mun: [0],                 
    n: [0]
}
function esy_summ(arr,) {
    let rezzz = 0;
    for(let i = 0;i<arr.length;i++){
        rezzz += arr[0];
    }
    return rezzz;
}



function fill_obj_2ndfl() {                              //заполняет объект данных 2 ндфл
    for (let i = 0; i < счётчик; i++) {                 //заполняет массив суммы для 1 табл
        obj_2ndfl.sun.push(+document.getElementById(`amount_of_income_${i + 1}`).value);
    }
    for (let i = 0; i < счётчик; i++) {                 //заполняет массив вычита для 1 табл
        obj_2ndfl.mun.push(+document.getElementById(`the_amount_of_the_deduction_${i + 1}`).value);
    }
    for (let i = 0; i < счётчик1; i++) {                 //заполняет массив вычита
        obj_2ndfl.n.push(+document.getElementById(`the_amount_of_the_deduction_two_${i + 1}`).value);
    }
}

function clear_obj_2ndfl() {                             //очищает объект данных 2 ндфл
    obj_sum_wndfl.sun[0] += esy_summ(obj_2ndfl.sun);
    obj_sum_wndfl.mun[0] += esy_summ(obj_2ndfl.mun);
    obj_sum_wndfl.n[0] += esy_summ(obj_2ndfl.n);
    obj_2ndfl.sun = [];
    obj_2ndfl.mun = [];
    obj_2ndfl.n = [];
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
    <input type="tel" name="revenue_code_${счётчик}" id="revenue_code_${счётчик}" form="main_form2" pattern="[0-9]{4}" maxlength="4" class="col-2">
    <input type="number" name="amount_of_income_${счётчик}" id="amount_of_income_${счётчик}" form="main_form2" class="col-3">
    <input type="tel" name="deduction_code_${счётчик}" id="deduction_code_${счётчик}" form="main_form2" pattern="[0-9]{3,4}" maxlength="4" class="col-2">
    <input type="number" name="the_amount_of_the_deduction_${счётчик}" id="the_amount_of_the_deduction_${счётчик}"form="main_form2" class="col-3">         
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
    <input type="tel" name="deduction_code_${счётчик1}" id="deduction_code_${счётчик1}" form="main_form2" pattern="[0-9]{3,4}" maxlength="4"
    class="col-3">
    <input type="number" name="the_amount_of_the_deduction_two_${счётчик1}" id="the_amount_of_the_deduction_two_${счётчик1}"
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





//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[вычисление первью таблицы]~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
let summ = 0;                               //доход
let minn = 0;                               //вычет

function fill_preview_table() {             //вычисляет и заполняет таблицу в HTML
    summ = 0;                               //доход
    minn = 0;                               //вычет
    for (let i = 0; i < счётчик; i++) {
        summ = summ + +document.getElementById(`amount_of_income_${i + 1}`).value;
    }
    for (let i = 0; i < счётчик1; i++) {
        minn = minn + +document.getElementById(`the_amount_of_the_deduction_two_${i + 1}`).value;
    }

    document.getElementById('cell_1').innerText = summ;                                                     //ячейка 1
    document.getElementById('cell_2').innerText = summ - minn;                                                //ячейка 2
    document.getElementById('cell_3').innerText = (summ - minn) * (+document.getElementById('tax').value / 100);  //ячейка 3
    document.getElementById('cell_4').innerText = (summ - minn) * (+document.getElementById('tax').value / 100);  //ячейка 4
    document.getElementById('cell_5').innerText = (summ - minn) * (+document.getElementById('tax').value / 100);  //ячейка 5
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
    for (let i = 1; i < tmp; i++) {
        удалить_строчку();
    }
    tmp = счётчик1;
    for (let i = 1; i < tmp; i++) {
        удалить_строчку1();
    }

    // console.log(obj_fill);                                      // ◄ ДЛЯ ОТЛАДКИ
    obj_non_json.push(JSON.parse(obj_fill[obj_fill.length - 1])); // ◄ ДЛЯ ОТЛАДКИ
    // console.log(obj_non_json);                                  // ◄ ДЛЯ ОТЛАДКИ



    let all_input = document.querySelectorAll('input:not([type="button"])');
    for (let i = 0; i < all_input.length; i++) {
        all_input[i].value = "";

    }
    fill_preview_table(); //принудительный расчёт
    $("html, body").animate({ scrollTop: 0 }, "slow");
};