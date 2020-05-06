let obj = {};
function ref() {
    let all_input = document.querySelectorAll("input")

    
    for (let i = 0; i < all_input.length; i++) {
        obj[all_input[i].id] = all_input[i].value;
    }
    obj['id_doc'] = document.getElementById('id_doc').value;
    obj['taxpayer'] = document.getElementById('taxpayer').value;

    console.log(obj);
}
document.documentElement.addEventListener('click', ref);



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
	saveAs(blob, 'pdfform.js_generated.pdf');
}



var current_buffer;



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


var fill_form = document.querySelector('#main_form');
fill_form.addEventListener('submit', function (e) {
    e.preventDefault();
    fill(current_buffer);
});