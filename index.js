const PDFF = require('pdffiller');          //работа с PDF
const path = require('path');               //объект пути

const ref_pdf =  path.resolve(__dirname,'3ndfl_2019.pdf');
console.log(ref_pdf);
const rez_pdf = path.resolve(__dirname,'rez.pdf');

const data = {
    "Text6.0": "012345678901"
}
PDFF.fillForm( ref_pdf, rez_pdf, data, function(err) {
    if (err) throw err;
    console.log("In callback (we're done).");
});
