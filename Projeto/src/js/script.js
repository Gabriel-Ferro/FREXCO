const c = (el)=>document.querySelector(el);
const cs = (el)=>document.querySelectorAll(el);

produtosJson.map((item, index)=> {
    let produtosItem = c('.produtos .produtos-item').cloneNode(true);
    c('.produtos-local').append(produtosItem);

});