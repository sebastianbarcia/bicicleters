/******************
    * BUSCADOR*
******************/ 
/*EVENTOS*/

$(()=>{        
    //1 - Esconder buscador
    $("#search-item").hide();
    //2 - Cuando hacemos click en el input del buscador se abre el buscador
    $("#buscador").on("click",function(e){ 
        e.preventDefault();              
        $("#search-item").slideDown();                               
    });
    //3 - Cuando hacemos click en cerrar se cierra el buscador
     
    //EVENTO CIERRE DE BUSCADOR 
    $(".search-button").on("click",function(e){  
        e.preventDefault();      
        $("#search-item").slideUp();        
    })       
});

 const obtenerDatosBuscador = async () =>{
    try {
        let response = await fetch("/bicicletas.json");
        let bicicletas = await response.json();
        
        //EVENTO PARA BUSCAR SEGUN LO QUE ESTABLEZCA EL TECLADO
        $(".search").keyup("keyup",function(e){
        e.preventDefault();
        $("#close-button").empty();
        let buscador = $(".search").val();
        
        //FILTRADO BUSQUEDA
        const dato = bicicletas.filter(e => e.marca.toUpperCase().includes(buscador.toUpperCase()));
        //SI NO ENCONTRO NINGUN RESULTADO 
        if(dato.length == 0){
            $("#close-button").append(`
            <div class = "d-flex justify-content-center align-items-center">
                <h6 class="pb-3 pt-3" style="text-align:center">No encontramos lo que estas buscando, sigue intentando</h6>
            </div>`)
        } 
        
        //SI ENCUENTRA RESULTADO
        else if(buscador.length >= 1){
        for (let i = 0; i < dato.length; i++) {                  
            $("#close-button").prepend(`
                <div class="row item resultados-busquedas mb-2">
                    <div class="col-md-4 col-3 border-bottom">
                        <div class="shopping-cart-item d-flex align-items-center justify-content-center justify-content-sm-start h-100 pb-2 pt-3">
                            <img class="shopping-cart-image itemImage" src=${dato[i].img}>
                            <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0 itemTitle">${dato[i].marca}</h6>
                        </div>
                    </div>
                    <div class="col-md-4 col-4 border-bottom">
                        <div class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 pb-2 pt-3">
                        <p class="modelo-buscador">${dato[i].modelo}</p>
                        </div>
                    </div>
                    <div class="col-md-2 col-2 border-bottom">                   
                        <div class="shopping-cart-price d-flex align-items-center h-100 pb-2 pt-3">
                            <p class="item-price mb-0 shoppingCartItemPrice itemPrice">€ ${dato[i].precio}</p>                        
                        </div>
                    </div>
                    <div class="col-md-2 col-3 border-bottom">
                        <div class="d-flex align-items-center h-100 d-flex justify-content-center pb-2 pt-3 idBycicle" >
                            <button class="btn btn-outline-dark btnAgregarAlCarrito sumarQuantity btn-sm" data-id="${dato[i].id}" href="#">Agregar</button>
                        </div>
                    </div>                
                </div>
           `)}                               
        } 
        //SI VOLVIO A VACIAR INPUT
        else if(buscador.length == 0){
            $("#close-button").append(`
                <div class = "d-flex justify-content-center align-items-center">
                    <h6 style="text-align:center">Escribe lo que estas buscando</h6>
                </div>`)
            }
        });    
    }   
//por si hay un error en el cargado del JSON    
catch (error) {
    console.log(error);
    }
}

obtenerDatosBuscador()

//CUANDO SE INICIA EL BUSCADOR
$("#close-button").append(`
<div class = "d-flex  justify-content-center align-items-center">
<h6 class="pb-3 pt-3" style="text-align:center">Escribe lo que estas buscando</h6>
</div>`)
   
