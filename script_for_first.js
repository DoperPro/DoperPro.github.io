//обЪект с данными для заполнения pdf
let obj = {};

//функция наполнения объекта данными с первой страницы
function ref() {
    // let all_input = document.querySelectorAll("input")
    
    
    // for (let i = 0; i < all_input.length; i++) {
    //     obj[all_input[i].id] = [all_input[i].value];
    // }
    obj['DOB_d'] = [document.getElementById('date').value.split('-')[2]];   //Дата рождения день
    obj['DOB_m'] = [document.getElementById('date').value.split('-')[1]];   //Дата рождения месяц
    obj['DOB_y'] = [document.getElementById('date').value.split('-')[0]];   //Дата рождения год

    obj['year'] = [Date().split(' ')[3]];
    obj['inn'] = [document.getElementById('inn').value];
    obj['id_doc'] = [document.getElementById('id_doc').value];
    obj['taxpayer'] = [document.getElementById('taxpayer').value];

    console.log(obj);
}
// document.documentElement.addEventListener('click', ref);

//заполняет PDF файл
//buf - буфер с исходным pdf файлом
function fill(buf) {
    ref();
    var filled_pdf;
	try {
		filled_pdf = pdfform().transform(buf, {
            name:[obj.name],
        });
	} catch (e) {
		return on_error(e);
	}

	var blob = new Blob([filled_pdf], {type: 'application/pdf'});
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

//при нажатии кнопки на первой страници
var fill_form = document.querySelector('#main_form');
fill_form.addEventListener('submit', function (e) {
    e.preventDefault();
    fill(current_buffer);
});