let cart = [];
let modalQt = 0;
let key = 0;

const c = (el)=>document.querySelector(el);
const cs = (el)=>document.querySelectorAll(el);

modelsJson.map((item, index)=> {
    let modelsItem = c('.produtos .produtos-item').cloneNode(true);
    modelsItem.setAttribute('data-key', index);
    modelsItem.querySelector('.produtos-item-img img').src= item.img;
    modelsItem.querySelector('.produtos-item-preco').innerHTML = `R$ ${item.price[0].toFixed(2)}`;
    modelsItem.querySelector('.produtos-item-nome').innerHTML = item.name;
    modelsItem.querySelector('.produtos-item-desc').innerHTML = item.description;
    modelsItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();
        key = e.target.closest('.produtos-item').getAttribute('data-key'); //pegando informação do identificador
        modalQt = 1;
        c('.produtosBig img').src = modelsJson[key].img;
        c('.produtosInfo h1').innerHTML = modelsJson[key].name;
        c('.produtosInfo-descr').innerHTML = modelsJson[key].description;
        c('.produtosInfo-size.selected').classList.remove('selected');
        cs('.produtosInfo-size').forEach((size, sizeIndex)=>{
            if(sizeIndex == 2) {
                size.classList.add('selected');
                c('.produtosInfo-atualpreco').innerHTML = `R$ ${modelsJson[key].price[sizeIndex].toFixed(2)}`;
            }
            size.querySelector('span').innerHTML = modelsJson[key].sizes[sizeIndex];
        });
        c('.produtosInfo-qt').innerHTML = modalQt;
        c('.produtosJanelaLocal').style.opacity = 0;
        c('.produtosJanelaLocal').style.display = 'flex';
        setTimeout(()=> {
            c('.produtosJanelaLocal').style.opacity = 1;
        }, 200);
    });
});

    c('.produtos-local').append(modelsItem);
function closeModal(){
    c('.produtosJanelaLocal').style.opacity = 0; //criando uma animação
    setTimeout(()=> {
        c('.produtosJanelaLocal').style.display = 'none'; //fechando a janela, sem Timeout, não vemos o efeito
    }, 500);
}
cs('.produtosInfo-cancelButton, .produtosInfo-cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
});
c('.produtosInfo-qtme').addEventListener('click', ()=>{
    if(modalQt > 1) {
        modalQt--;
        c('.produtosInfo-qt').innerHTML = modalQt;
    }
});
c('.produtosInfo-qtma').addEventListener('click', ()=>{
    modalQt++;
    c('.produtosInfo-qt').innerHTML = modalQt;
});
cs('.produtosInfo-size').forEach((size, sizeIndex)=>{
    size.addEventListener('click', (e)=> {
        c('.produtosInfo-size.selected').classList.remove('selected');
        //e.target.classList.add('selected'); //ocorre erro se clicar no <span></span>
        size.classList.add('selected');
        c('.produtosInfo-atualpreco').innerHTML = `R$ ${modelsJson[key].price[sizeIndex].toFixed(2)}`;
    });
});
c('.produtosInfo-addButton').addEventListener('click', ()=>{
    let size = parseInt(c('.produtosInfo-size.selected').getAttribute('data-key'));
    let identifier = modelsJson[key].id+'@'+size;
    let locaId = cart.findIndex((item)=>item.identifier == identifier);
    if(locaId > -1){
        cart[locaId].qt += modalQt;
    } else {
        cart.push({
            identifier,
            id:modelsJson[key].id,
            size,
            qt:modalQt
        });
    }
    updateCart();
    closeModal();
});
c('.menu-aberto').addEventListener('click', ()=>{
    if(cart.length > 0){
        c('aside').style.left = '0';
    }
});

c('.menu-fechado').addEventListener('click', ()=>{
    c('aside').style.left='100vw';
});
function updateCart() {
    c('.menu-aberto span').innerHTML = cart.length;
    if(cart.length > 0) {
        c('aside').classList.add('show');
        c('.cart').innerHTML = '';
        let subtotal = 0;
        let desconto = 0;
        let total = 0;
        cart.map((itemCart, index)=>{
            let modelItem = modelsJson.find((itemBD)=>itemBD.id == itemCart.id);
            subtotal += modelItem.price[itemCart.size] * itemCart.qt;
            let cartItem = c('.produtos .carr-item').cloneNode(true);
            let modelSizeName;
            switch(itemCart.size) {
                case 0:
                    modelSizeName = 'P';
                    break;
                case 1:
                    modelSizeName = 'M';
                    break;
                case 2:
                    modelSizeName = 'G';
            }
            cartItem.querySelector('img').src = modelItem.img;
            cartItem.querySelector('.carr-item-nome').innerHTML = `${modelItem.name} (${modelSizeName})`;
            cartItem.querySelector('.carr-item-qt').innerHTML = itemCart.qt;
            cartItem.querySelector('.carr-item-qtdme').addEventListener('click',()=>{
                if(itemCart.qt > 1) {
                    itemCart.qt--
                } else {
                    cart.splice(index, 1);
                }
                updateCart();
            });
            cartItem.querySelector('.carr-item-qtma').addEventListener('click',()=>{
                itemCart.qt++;
                updateCart();
            });
            c('.cart').append(cartItem);
        });
        desconto = subtotal * 0.1;
        total = subtotal - desconto;
        c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;
    } else {
        c('aside').classList.remove('show');
        c('aside').style.left = '100vw';
    }
}