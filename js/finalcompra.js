
function productAddedToOrder(){
    pedidosAgregadosCarrito.forEach(element => {
        $(".orderProductToBuy").append(
            `<div class = "bordesCart row mb-4 bordesCartItem">
                <div class = "col-4 py-5">
                    <img src="${element.imageBycicle}" class="imgCart">
                </div>
                <div class = "col-7 pageCartTitles">
                    <div class="border-bottom">
                        <h6 class="bicicletaElegida pb-2 fs-5">${element.brandBycicle}</h6>
                    </div>
                    <p class="border-bottom py-3">Precio: € ${element.priceBycicle}</p>
                    <div class= "row positionPriceQuantity mt-2">
                        <div id="bordesQuantity" class = "col-4  me-3 justify-content-between align-items-center d-flex" data-id="${element.id}">
                            <p>Cantidad <span class="badge badgeCarrito bg-dark text-white">${element.itemQuantity}</span></p>                           
                        </div>        
                        <div class="idBycicleta col-4" data-id="${element.id}">
                                                
                        </div>
                    </div>`
                )
            });
    }

productAddedToOrder()