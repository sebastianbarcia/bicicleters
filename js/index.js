//JavaScript-------------------------------------------
/*****************************************************/
//           *-* Bicicleters V-29.3 *-*
//****************************************************/

/********llamado de JSON**********/
const obtenerDatos = async () =>{
    try {
        let response = await fetch("bicicletas.json");
        let bicicletas = await response.json();
    /*****IMPRESION DE CARD ******/
        // div para cards
        let contenedor = document.querySelector("#contenedor");

            // Recorrida del array e impresion de cards
            for (const bicicleta of bicicletas) {
                if(bicicleta.novedad == "si"){
                // Contenedor para card
                let card = document.createElement("div");
                    // Agregamos el contenido a la card
                    card.innerHTML = `<div class="col mb-5">
                    <div class="card h-100 item" >
                        <!-- Sale badge-->
                        <div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Sale</div>
                        <!-- Product image-->
                        <img class="card-img-top itemImage" src=${bicicleta.img} alt="..." />
                        <!-- Product details-->
                        <div class="card-body p-4">
                            <div class="text-center">
                                <!-- Product name-->
                                <h5 class="fw-bolder itemTitle">${bicicleta.marca}</h5>
                                <!-- Product reviews-->
                                <div class="d-flex justify-content-center small mb-2">
                                    <div>${bicicleta.modelo}</div>                        
                                </div>
                                <!-- Product price-->
                                <span class="itemPrice">€ ${bicicleta.precio}</span>
                            </div>
                        </div>
                        <!-- Product actions-->
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center"><button class="btn btn-outline-dark mt-auto btnAgregarAlCarrito sumarQuantity" data-id="${bicicleta.id}" href="#">Agregar al carrito</button></div>
                        </div>
                    </div>
                </div>`
                contenedor.appendChild(card);                
                }
            }        
        }
        //por si hay un error en el cargado del JSON    
        catch (error) {
            console.log(error);
        }
    }

obtenerDatos();

