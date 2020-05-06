var fill_pdf = require('fill-pdf-utf8');
 
fill_pdf.generatePdf({fields:{name:'ЖОРА',inn:"0123456"}},'./tt/in.pdf',{fontSize: 16.0},'./tt/out.pdf',function (error, stdout, stderr) {
    if(error){
        throw error;
    }
    console.log(stdout);
})