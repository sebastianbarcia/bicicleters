printQuantityChangeded = () => {

    const idBycicleta = document.getElementsByClassName("idBycicleta");
     
        for(let i = 0; i < idBycicleta.length; i++){
            
        let elementcant = idBycicleta[i].closest('.bordesCart');
        
        let elementQuantity = elementcant.querySelector('.badgeCarrito');
       
        pedido.forEach(bikes => {
            const pedidos = bikes.id;
            
            if(pedidos === idBycicleta[i].dataset.id){
                
            elementQuantity.innerHTML = bikes.itemQuantity;
           
            updateShoppingCartTotal();
            $("#traePrecio").empty();
            $(".precioFinal").empty();
            $("#subtotal").empty();
            }
        });        
    }
}   