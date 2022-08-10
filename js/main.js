/*****************************************************/
//           *-* Bicicleters V-28.7 *-*
//****************************************************/

document.addEventListener('click', (event) => {
    if (event.target && event.target.className.includes('btnAgregarAlCarrito')){
        event.preventDefault()
        seleccion(event);
    }
});

const shoppingCartItemsContainer = document.querySelector('#cart-items'); //del DOM para insertar carrito

//funcion para seleccionar una bicicleta
function seleccion(event){   
    const button = event.target;
    const item = button.closest('.item');
    const itemTitle = item.querySelector('.itemTitle').textContent;
    const itemPrice = item.querySelector('.itemPrice').textContent;
    const itemImage = item.querySelector('.itemImage').src; 
    const id = event.target.getAttribute("data-id");
    let itemQuantity = 1;    
       
    guardarLocalStorage(itemTitle,itemPrice,itemImage,itemQuantity,id);    
    agregarItemAlCarritoDeCompras(itemTitle, itemPrice, itemImage,id);
    
    /*revisar esta logica-funciona bien pero no la probe mucho aun*/
    itemsCarrito(); 
    updateShoppingCartTotal();  
    
    //Agregar items en carrito desde buscador
    $(".contenedorCart").empty();
    introCarrito();
    productAddedCart();
    updateShoppingCartTotal(); 
    itemsCarrito();  
}

//LOCAL STORAGE// - Creacion De Pedidos
class Pedidos{
    constructor(brandBycicle,priceBycicle,imageBycicle,itemQuantity,id){
        this.brandBycicle = brandBycicle;
        this.priceBycicle = priceBycicle;
        this.imageBycicle = imageBycicle; 
        this.itemQuantity = itemQuantity; 
        this.id = id;
    }
}

/**si tiene items cargados en localStorage, los recupera y los trae de vuelta. Sino hay nada, empieza vacio variable "pedido" para guardar en Local Storage **/
const pedido = JSON.parse(localStorage.getItem("pedidos")) || [];

/********Impresion inputs / suma al clickear "add to cart" - viene de guardarlocalstorage que guarda en localsotrage los pedidos y cantidades********/

function agregarItemAlCarritoDeCompras(itemTitle, itemPrice, itemImage,id){
   
    const idBycicle = shoppingCartItemsContainer.getElementsByClassName("idBycicle");
    
     for(let i = 0; i < idBycicle.length; i++){
        
         if(idBycicle[i].dataset.id === id){
            /*define al elemento mas cercano al item elegido y de ahi a su cantidad*/
            let elementcant = idBycicle[i].closest('.shoppingCartItem');
         
            let elementQuantity = elementcant.querySelector('.shoppingCartItemQuantity');
 
            pedido.forEach(bikes => {
                const pedidos = bikes.id;
                if(pedidos === idBycicle[i].dataset.id){
                 
            //Toast que aparece cuando se clickea add to cart
            $('.toast').toast('show');
            $(".agregarNombreBicicleta").text(`Agregastes ${bikes.brandBycicle}`)
            updateShoppingCartTotal();
                elementQuantity.innerHTML = bikes.itemQuantity;
                }
            });        
            return;
        }     
    }
}

/************************************************* 
    Guardado de elementos en el Local Storage
**************************************************/

 if(localStorage.getItem("pedidos") !== null){
    window.addEventListener('DOMContentLoaded', () => {
        upDates();
    });     
 }
/**************************************************/

function guardarLocalStorage(itemTitle,itemPrice,itemImage,itemQuantity,id){ 
    
    for (let i = 0; i < pedido.length; i++) {
         
        if(pedido[i].id === id){            
            itemQuantity = pedido[i].itemQuantity++;            
            let pedidoJSON = JSON.stringify(pedido);
            localStorage.setItem("pedidos",pedidoJSON);                                    
            return;
        }        
    }   
    pedido.push(new Pedidos(itemTitle,itemPrice,itemImage,itemQuantity,id)); 
        
    let pedidoJSON = JSON.stringify(pedido);
    localStorage.setItem("pedidos",pedidoJSON);
    
    emptyCart();
    upDates(id);
    itemsCarrito();     
}

//provoca la mencion de carrito vacio al cargar y recargar pagina
emptyCart();

//funcion para imprimir carrito vacio o carrito lleno
function emptyCart(){     
    if(pedido.length === 0){ 
        $(".cart").removeClass('bi bi-cart-fill');             
        $(".cart").addClass('bi bi-cart');      
        const cartEmpty = document.getElementById("cartEmpty");
        cartEmpty.innerHTML = `<p class="my-4 fs-5 tipografia">Tu carrito esta vacío</p>
        <img src="/assets/cart-button/bag.svg" style="width:20%" alt="cartempty">
        <p class="my-4 fs-6 tipografia">Elige el producto que mas te guste</p>
        `;
        } else if(pedido.length >= 1){   
            /*error js*/  
            $(".cart").removeClass('bi bi-cart');         
            $(".cart").addClass('bi bi-cart-fill');
            
            const fullCart = document.getElementById("cartEmpty")
            fullCart.innerHTML = 
            `
            <p class="mb-1 tipografia">Subtotal</p>
            <p class="ml-4 mb-3 shoppingCartTotal tipografia">0€</p>
            <div>
                <a class="btn btn-dark ml-auto comprarButton col-12" href="/pages/carrito.html">Comprar</a>
            </div>
            `;            
        }
    retirarButton()
    }
//Funcion para quitar el boton mientras estemos en la pagina de carrito    
function retirarButton(){
    if(document.location.pathname === "/pages/carrito.html"){
        $(".comprarButton").css("display","none");
    }
}

//impresion de pedidos en carrito
function upDates(id){
    let article = JSON.parse(localStorage.getItem("pedidos")); 
    
    for (let i = 0; i < pedido.length; i++) {
     
        if((pedido[i].id) === (id || article[i].id)){
            
            const shoppingCartRow = document.createElement('div');
            const shoppingCartContent = `
            <div class="row shoppingCartItem">
                <div class="col-4 col-lg-5 border-bottom">
                    <div class="shopping-cart-item d-flex align-items-center h-100 pb-2 pt-3">
                        <img src=${pedido[i].imageBycicle} class="shopping-cart-image">
                        <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${pedido[i].brandBycicle}</h6>
                    </div>
                </div>
                <div class="col-4 col-lg-3 border-bottom">
                    <div class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 pb-2 pt-3">
                    <button class ="btn btnResta"> < </button><span class="shopping-cart-quantity-input badge bg-dark text-white shoppingCartItemQuantity col-4" type="number" value="1">${pedido[i].itemQuantity}</span><button class ="btn btnSuma"> > </button>
                    </div>
                </div>
                <div class="col-3 border-bottom">                   
                    <div class="shopping-cart-price d-flex align-items-center h-100 justify-content-center pb-2 pt-3">
                        <p class="item-price mb-0 shoppingCartItemPrice">${pedido[i].priceBycicle}</p>                        
                    </div>
                </div>
                <div class="col-1 border-bottom">
                <div class="d-flex align-items-center h-100  d-flex justify-content-center pb-2 pt-3 idBycicle" data-id="${pedido[i].id}">
                    <button class="btn btn-danger buttonDelete d-flex align-items-center justify-content-center" type="button">X</button>
                </div>
            </div>`;
        
        shoppingCartRow.innerHTML = shoppingCartContent;
        shoppingCartItemsContainer.prepend(shoppingCartRow); 

        //Borrar item evento   
        shoppingCartRow.querySelector('.buttonDelete').addEventListener('click', removeShoppingCartItem); 
    
        //Llamado al DOM input cantidad evento   
        shoppingCartRow.querySelector('.btnSuma').addEventListener('click', quantityChangedPlus);
        shoppingCartRow.querySelector('.btnResta').addEventListener('click', quantityChangedLess); 
        updateShoppingCartTotal();        
        }  
    }
}

//funcion para sumar items-bicicletas x precio
function updateShoppingCartTotal(){
    let total = 0;
    const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');
    
    shoppingCartItems.forEach((shoppingCartItem) => {
        const shoppingCartItemPriceElement = shoppingCartItem.querySelector('.shoppingCartItemPrice');
       
        const shoppingCartItemPrice = Number (shoppingCartItemPriceElement.textContent.replace('€',' '));
           
        //tomamos la cantidad del input
        const shoppingCartItemQuantityElement = shoppingCartItem.querySelector('.shoppingCartItemQuantity').textContent;
      
        //multiplicamos precio de items por cantidad  
        total = total + shoppingCartItemPrice * shoppingCartItemQuantityElement;
         
        resultadoSumaCantidad(total);
        });
        $('.shoppingCartTotal').text(`€ ${total.toFixed (2)}`)
}

//imprime cantidades seleccion de cantidad 
printQuantityChanged = () => {
   
    const idBycicle = shoppingCartItemsContainer.getElementsByClassName("idBycicle");
        for(let i = 0; i < idBycicle.length; i++){
            
        let elementcant = idBycicle[i].closest('.shoppingCartItem');
        
        let elementQuantity = elementcant.querySelector('.shoppingCartItemQuantity');

        pedido.forEach(bikes => {
            const pedidos = bikes.id;
            if(pedidos === idBycicle[i].dataset.id){
    
            elementQuantity.innerHTML = bikes.itemQuantity;
            updateShoppingCartTotal();
            }
        });        
    }
}   

// /**************sumar items************/
 function quantityChangedPlus(event){
    event.preventDefault()
    
    const buttonClicked = event.target;
    buttonClicked.closest('.shoppingCartItem');

    const resultS = buttonClicked.closest('.shoppingCartItem');
    const idPlusQuant = resultS.querySelector(".idBycicle");
    const idFind = idPlusQuant.getAttribute('data-id');
   
     for (let index = 0; index < pedido.length; index++) {
        
         if(((pedido[index].id) === idFind)){
             pedido[index].itemQuantity++;           
            
             if (pedido[index].itemQuantity <= 0){
                 pedido[index].itemQuantity = 1;}
         }
         let pedidoJSON = JSON.stringify(pedido);
         localStorage.setItem("pedidos",pedidoJSON); 
     }  printQuantityChangeded()
        printQuantityChanged()
        itemsCarrito(); 
        updateShoppingCartTotal();     
}

// /*****Restar items****/
function quantityChangedLess(event){
    event.preventDefault()
    
    const buttonClicked = event.target;
    buttonClicked.closest('.shoppingCartItem');

    const resultS = buttonClicked.closest('.shoppingCartItem');
    const idPlusQuant = resultS.querySelector(".idBycicle");
    const idFind = idPlusQuant.getAttribute('data-id');
   
     for (let index = 0; index < pedido.length; index++) {
        
         if(((pedido[index].id) === idFind)){
             pedido[index].itemQuantity--;           
            
             if (pedido[index].itemQuantity <= 0){
                 pedido[index].itemQuantity = 1;}
        }
         let pedidoJSON = JSON.stringify(pedido);
         localStorage.setItem("pedidos",pedidoJSON); 
    }
        printQuantityChangeded()
        printQuantityChanged()
        itemsCarrito(); 
        updateShoppingCartTotal();     
}

// //funcion borrar item del carrito
function removeShoppingCartItem(event){
    event.preventDefault()
    
    const buttonClicked = event.target;
    buttonClicked.closest('.shoppingCartItem').remove();

    const resultS = buttonClicked.closest('.shoppingCartItem');
    const idPlusQuant = resultS.querySelector(".idBycicle");
    const idFind = idPlusQuant.getAttribute('data-id');
   
     for (let index = 0; index < pedido.length; index++) {
        
         if(((pedido[index].id) === idFind)){
            let borrarElemento = (pedido[index]);           
            pedido.splice(pedido.indexOf(borrarElemento),1);  
        }
         let pedidoJSON = JSON.stringify(pedido);
         localStorage.setItem("pedidos",pedidoJSON); 
    }

    ///remueve item del carrito al apretar en el desplegable "carrito"
    //definimos la variable que contiene a los contendores de cada item, los iteramos y coincidimos con los id
    const contentShoppingCartItem = $(".bordesCartItem")
    
    for (let i = 0; i < contentShoppingCartItem.length; i++) {
        
        const idPlusQuantity = contentShoppingCartItem[i].querySelector(".idBycicleta");
        const idFindCart = idPlusQuantity.getAttribute('data-id');
        if (idFind === idFindCart) {
            contentShoppingCartItem[i].remove()
        }   
    }

        itemsCarrito(); 
        updateShoppingCartTotal();   
        changeCartRender();   
}

/************FUNCIONES PARA PRECIO - IVA - ENVIOS**********************/ 
//funcion (si hay envios cobrar depende zona). lo mismo con el iva

function resultadoSumaCantidad(result){
     $("#peninsula").change(function(event){ 
     function peninsula() {
        let peninsular = event.target.value;
         if (peninsular == "Si" && (result) < 49) {
            return parseInt(precio = parseInt(result + multiplicar(result,iva)) + 5);
   
        } else if (peninsular == "Si" && (result) > 49) {
                return parseInt(precio = parseInt(result + multiplicar(result,iva)));
       
        } else if (peninsular == "No" && (result) < 300) {
             return parseInt(precio = parseInt(suma(result,12)));
       
          } else {
              const precio = result;
              return precio;
          }
      }   
      const traePrecio = peninsula();  
      $("#traePrecio").text(`€ ${traePrecio}`);  
      sumarCuotas(traePrecio);
      $("#subtotal").empty();
      $("#finalPrice").empty();
      if(localStorage.getItem("pedidos").length === 2){ 
        $("#traePrecio").empty()
      }
    });
 }

 //funcion cuotas
 function sumarCuotas(traePrecio){
    $("#seleccionCuotas").change(function(e){
 function cuotas() {
     let cuota = document.getElementById("seleccionCuotas").value;
     let interes;
         switch (cuota) {
             case "1":
                 return (precio = traePrecio);
             case "3":
                 interes = 0.01;
                 return (precio  = suma(traePrecio, multiplicar(traePrecio, interes)) / cuota);
             case "6":
                 interes = 0.03;
                 return (precio  = suma(traePrecio, multiplicar(traePrecio,interes)) / cuota);
             case "12":
                 interes = 0.06;
                 return (precio  = suma(traePrecio, multiplicar(traePrecio,interes)) / cuota);
             case "24":
                 interes = 0.09;
                 return (precio  = suma(traePrecio, multiplicar(traePrecio,interes)) / cuota);
             default:
                 break;
         }
    }
    const subtotal = cuotas().toFixed (2);

    if ($("#seleccionCuotas").val() == 1) {
        $("#subtotal").text(`Pagaras € ${subtotal} en ${$("#seleccionCuotas").val()} pago`); 
    }else{
        $("#subtotal").text(`Pagaras por mes € ${subtotal} durante ${$("#seleccionCuotas").val()} meses`);  
    }
    const priceFinal = (precio * ($("#seleccionCuotas").val()));
     
    $("#finalPrice").text(`€ ${priceFinal.toFixed(2)}`)
     
     if ($("#traePrecio").text().length === 0) {
        $("#finalPrice").empty();
        $("#subtotal").empty();
     }
     if(localStorage.getItem("pedidos").length === 2){ 
        $("#finalPrice").empty();
        $("#subtotal").empty();
      }
});
}

//Calculo suma
 const suma = (a, b) => a + b; 

// //calculo multiplicar
 const multiplicar = (x, y) => x * y;

// //variable IVA
 const iva = 0.21;  

//mostrar y esconder carrito 

    $(()=>{        
        //1- Esconder el carrito
        $("#cart-items").hide();
        //2- Cuando hacemos click en la canasta se abre o cierra el carrito
        $(".cart").on("click",function(e){ 
            e.preventDefault();                
            $("#cart-items").show() 
                            .click((e) => {e.stopPropagation();})                                   
        });              
    });

//cierre de desplegable "carrito" clickeando fuera del elemento
    
$(document).on("click",function(e){

       let container = $(".cart");
            if (!container.is(e.target) && container.has(e.target).length === 0) { 
            //Se quita pulsando en cualquier lado fuera de los elementos contenidos en la variable container
            $("#cart-items").hide()    
            }
   });
//agregar el numero de items al carrito de compras
const itemsCarrito = () => {
let plusQuantityItems = 0;

for (let i = 0; i < pedido.length; i++) {
    plusQuantityItems += pedido[i].itemQuantity;
}      
    $("#items-basket").text(`${plusQuantityItems}`);
    if(plusQuantityItems === 0){
        emptyCart()
    }
    if(plusQuantityItems == 1){
        $(".articlesChoose").text(`Escogistes ${plusQuantityItems} articulo`)
    }else{
        $(".articlesChoose").text(`Escogistes ${plusQuantityItems} articulos`)
    }  
}; 

/*****al recargar pagina cargar numero de items del pedido */
itemsCarrito()

window.addEventListener('DOMContentLoaded', () => {
    itemsCarrito();
    retirarButton();
});   

