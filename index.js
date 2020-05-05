const pdff = require('./pdfform');
const fs = require('fs');
const in_pdf_p = './tt/in.pdf';
let out_buf;

function toArrayBuffer(buf) {
    var ab = new ArrayBuffer(buf.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
        view[i] = buf[i];
    }
    return ab;
}

fs.readFileSync(in_pdf_p, (err, data) => {
    if (err) throw err;
    console.log(data);
    let fil = {
        name: 'FFFFF',
    }
    out_buf = pdff().transform(toArrayBuffer(data),fil);
})

function toBuffer(ab) {
    var buf = Buffer.alloc(ab.byteLength);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
        buf[i] = view[i];
    }
    return buf;
}
fs.writeFileSync('./tt/out.pdf',toBuffer(out_buf),err=>{
    if (err) throw err;
    console.log('запись');
    
})