function ref(){
let all_input = document.querySelectorAll("input")

let obj = {};
for(let i = 0; i < all_input.length;i++){
obj[all_input[i].id] = all_input[i].value;
}
obj['id_doc'] = document.getElementById('id_doc').value;
obj['taxpayer'] = document.getElementById('taxpayer').value;

console.log(obj);
}
document.documentElement.addEventListener('click', ref);