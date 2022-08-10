//traemos del local storage los productos que fueron añadidos en las paginas anteriores
const pedidosAgregadosCarrito = JSON.parse(localStorage.getItem("pedidos"));

//traemos del session storage la sesion que fue abierta anteriormente
const userLog = JSON.parse(sessionStorage.getItem("loginUser"));

/*-----------------------REVISAR------------------------*/
//Ahora hay que hacer el evento cuando apretamos "agregar"(Ahora se esta haciendo solo con cerrar)- ademas cuando se vacia el carrito volver a llenarlo
// $(".btnTraer").on("click", function(){
//     $(".contenedorCart").empty();
//     introCarrito();
//     productAddedCart();
//     updateShoppingCartTotal();  
// })

//NO ESTA PASANDO LOS VALORES CUANDO SE LE INTRODUCE UN ELEMENTO
introCarrito()

function introCarrito(){
if(localStorage.getItem("pedidos").length > 2 ){
    $(".contenedorCart").append(`
        <div class="selection col-12 col-lg-8 gx-5">
            <div class="carritoPage">
  
            </div>
        </div>
        <div class="col-lg-4 col-12 ">
            <div class="orderCart bg-white px-4 pb-4">
            <div class="mt-4">
                <div class="border-bottom">
                    <h5 class="mb-3">Pedido</h5>
                    <p class= "articlesChoose"></p>
                </div>                                        
                <div class="border-bottom mt-4">
                    <h6>Subtotal</h6>
                    <p class="shoppingCartTotal"></p>
                </div>
                <div class="border-bottom mt-4">
                    <h6>Envio</h6>
                    <p>Vive en peninsula?</p>
                    <select type="text" id="peninsula" class="form-select mb-3">
                        <option>Si</option>
                        <option>No</option>
                    </select>
                    <p id="traePrecio"></p>
                </div>
                <div class="border-bottom mt-4">
                    <h6>Forma de pago</h6>
                    <p>Seleccione la cantidad de pagos que desea hacer</p>
                    <select type="text" id="seleccionCuotas" class="form-select mb-3">
                        <option>1</option>
                        <option>3</option>
                        <option>6</option>
                        <option>12</option>
                        <option>24</option>
                    </select>
                    <p id="subtotal">Cuotas</p>
                </div>
                <div class="row justify-content-between">
                    <h5 class="my-4 col-5">Total</h5>
                    <p id="finalPrice" class="precioFinal col-6 my-4"></p>
                </div>
                <div class="row d-flex justify-content-center">
                    <button class="btn btn-dark col-lg-11 col-12 mb-3 btnBuyCart btnBuyCart2">Comprar</button>
                    <div class="modal" id="my-Modal" tabindex="-1">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header" id="modal-without-bottom">
                                            <h5 class="modal-title">Pago</h5>
                                            <button type="button" class="btn-close btnBackPage" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div id="paypal-button-container" class="mx-3"></div>
                                    </div>
                                </div>
                            </div>
                    <button class="btn btn-outline-secondary col-lg-11 col-12 mb-2 btnSecundary">Continuar comprando</button>
                </div>
            </div>
            </div>
        </div>
    `)
}
$(".btnBuyCart").on("click",btnPagarCompra)
$(".btnSecundary").on("click", seguirComprando)
}

function productAddedCart(){
    $(".carritoPage").empty()
    const pedidosAgregadosCarrito = JSON.parse(localStorage.getItem("pedidos"));
    
    pedidosAgregadosCarrito.forEach(element => {
        $(".carritoPage").append(
            `<div class = "bordesCart bg-white row mb-4 bordesCartItem">
                <div class = "col-sm-4 col-12 py-sm-5">
                    <img src="${element.imageBycicle}" class="imgCart">
                </div>
                <div class = "col-sm-7 col-12 pageCartTitles">
                    <div class="border-bottom">
                        <h6 class="bicicletaElegida pb-2 fs-5">${element.brandBycicle}</h6>
                    </div>
                    <p class="border-bottom py-3">${element.priceBycicle}</p>
                    <div class= "row positionPriceQuantity mt-2">
                        <div id="bordesQuantity" class = "col-sm-8 col-7 bordesCart justify-content-between align-items-center d-flex" data-id="${element.id}">
                            <button class="btn"> <i class="bi bi-dash" ></i> </button>
                            <span class="badge badgeCarrito bg-dark text-white">${element.itemQuantity}</span>
                            <button class="btn"><i class="bi bi-plus"></i></button>
                        </div>        
                        <div class="idBycicleta col-sm-4 col-2" data-id="${element.id}">
                            <button type="button" class="btn btn-outline-dark buttonTrash" >
                            <img id="trashSize" class="d-flex align-item-center" src= "../assets/button-trash/trash3.svg">
                            </button>                       
                        </div>
                    </div>`
                )
            });
            $(".bi-plus").on("click", sumarItemsCarrito);
            $(".bi-dash").on("click", restarItemsCarrito);
            $(".buttonTrash").on("click", removeShoppingCartItemOrder)
    }

productAddedCart()

//Sumar
function sumarItemsCarrito(e){
    e.preventDefault()
    const buttonClicked = e.target;
    buttonClicked.closest('.bordesCart');
    const resultS = buttonClicked.closest('.bordesCart');
    const idFind = resultS.getAttribute('data-id');
    for (let index = 0; index < pedido.length; index++) {
       
       if(((pedido[index].id) === idFind)){
            pedido[index].itemQuantity++;            
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

//Restar
function restarItemsCarrito(e){
    e.preventDefault()
    const buttonClicked = e.target;
    buttonClicked.closest('.bordesCart');
    const resultS = buttonClicked.closest('.bordesCart');
    const idFind = resultS.getAttribute('data-id');
    
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

///funcion borrar item del carrito
  function removeShoppingCartItemOrder(event){
    event.preventDefault()
    //busca el elemento clickeado
    const buttonClicked = event.target;
    
    //remueve todo el contenedor clickeado yendo a buscar el data id
    buttonClicked.closest('.bordesCart').remove();
    
    const resultS = buttonClicked.closest('.bordesCart');
   
    const idPlusQuant = resultS.querySelector(".idBycicleta");
    
    const idFind = idPlusQuant.getAttribute('data-id');
    
    //remueve el contenedor del carrito desplegable, iteramos para conseguir que se junten los data-id de ambos contenedores

    const itemCart = $('.shoppingCartItem')
    
    for (let i = 0; i < itemCart.length; i++) {
        const encontrados = itemCart[i].querySelector('.idBycicle')
        const resuelto = encontrados.getAttribute('data-id');
        
        if (idFind === resuelto) {
            itemCart[i].remove()
        }    
    }
    
    // iteracion para remover de array "pedido" y del localstorage
    for (let index = 0; index < pedido.length; index++) {
          
        if(((pedido[index].id) === idFind)){
            let borrarElemento = (pedido[index]);           
            pedido.splice(pedido.indexOf(borrarElemento),1);  
        }
        let pedidoJSON = JSON.stringify(pedido);
        localStorage.setItem("pedidos",pedidoJSON);      
    }
          itemsCarrito(); 
          updateShoppingCartTotal(); 
          changeCartRender(); 

          $("#traePrecio").empty();
          $(".precioFinal").empty();
          $("#subtotal").empty();      
  }

function changeCartRender() {
    if(localStorage.getItem("pedidos").length === 2){
        $(".contenedorCart").empty();
        $(".contenedorCart").append(
            `<div class = "d-flex justify-content-center align-items-center flex-column emptyCartCart">                
                <h2 class="pb-3">Tu carrito esta vacio!</h2>
                <i class="bi bi-cart fs-1"></i>
                <p class="fs-5 pt-3">Llenalo haciendo click <a href="../index.html">aquí</a></p>
            </div>
            `
        )
    }
}

changeCartRender(); 

//funcion para comprar productos
function btnPagarCompra(){
    //si no esta logueado pasa a pagina de login
    if((`${$(JSON.parse(sessionStorage.getItem("loginUser"))).length}`) == 0){
    let pagina = href="../pages/cuenta.html#/login";
    location.href = pagina;    
}
else{
    //si esta logueado pasa directo a pagina de pago
    const revealPrice = $("#finalPrice").text();
    const quitEuro = revealPrice.slice(2)
    if(quitEuro.length >= 1){
    $("#paypal-button-container").empty()
    $("#my-Modal").modal("show");
    paypal.Buttons({
        createOrder: function(data, actions) {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: quitEuro //Importe total en euros a pagar
              }
            }]
          });
        },
        onApprove: function(data, actions) {
          return actions.order.capture().then(function(details) {
            $("#my-Modal").modal("hide");
            $("#my-Modal-checkout").modal("show");
            $(".textModalCheckOut").text('Transacción a nombre de ' + details.payer.name.given_name);
            localStorage.removeItem("pedidos");   
            $("#btnCheckOut").on("click",function(){
                let pagina = href="../index.html";
                location.href = pagina;  
            })
             
            // Call your server to save the transaction
            return fetch('/paypal-transaction-complete', {
              method: 'post',
              headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify({
                orderID: data.orderID
              })
            });
          });
        }
      }) .render('#paypal-button-container');
    }}
};

// Volver a pagina de inicio si apretamos el boton de seguir comprando
function seguirComprando(e){
    e.preventDefault();
    let paginaInicio = href="../index.html";
    location.href = paginaInicio;  
}