//*****************************************************/
//           *-* Bicicleters V-29/4*-*
//*****************************************************/

/********llamado de JSON**********/
const obtenerDatos = async () =>{
    try {
        let response = await fetch("../bicicletas.json");
        let bicicletas = await response.json();

/********************************************************/        
/**************FILTRA POR MARCA Y COLOR******************/
/********************************************************/

        //vacia el contenedor para cuando se ordena de diferente forma
        $("#contenedor").empty();

        /***** funcion para filtrar por marca ******/
        function filterBikes(){
            let marca = document.getElementById('seleccionMarca')
            marca.addEventListener("change",filteredes)  
          
            let color = document.getElementById('seleccionColor')
            color.addEventListener("change",filteredes);

            let ordenar = document.getElementById('seleccionesVarias')
            ordenar.addEventListener("change",precio);
        }

        function filteredes(brandElected){
            //vacia el contenedor
            $("#contenedor").empty(); 
                    
            /*SELECCION DE MARCA*/
            brandElected = $("#seleccionMarca").val()
            let bicicletaMarca = bicicletas.filter(elemento => elemento.marca === brandElected);
             
            /*SELECION DE COLOR*/
            colorElected = $("#seleccionColor").val()
            let bicicletaColor = bicicletas.filter(elemento => elemento.color === colorElected);

            /*CUANDO ESTA LA MARCA Y EL COLOR SELECCIONADO SELECCIONA TODAS LAS BICICLETAS*/
            if((brandElected === "Marca") && (colorElected === "Color")){
                bikesFilter = bicicletas;                
                printBikes(bikesFilter)                
            }            
            else if((brandElected === "Marca")){
                bikesFilter = bicicletaColor
                $("#contenedor").empty();                 
                printBikes(bikesFilter)                
            }
            else if((colorElected === "Color")){
                bikesFilter = bicicletaMarca
                $("#contenedor").empty(); 
                printBikes(bikesFilter)   
            }  
            /*SI COINCIDE MARCA Y COLOR EN LA ELECCION IMPRIME LA COINCIDENCIA. EN CASO EN QUE NO HAYA COINCIDENCIA NO IMPRIME NADA*/
            else if(colorElected && brandElected){              
                for (let i = 0; i < bicicletaMarca.length; i++) {
                   
                   //elige bicicleta por color y marca 
                    if(bicicletaColor[i]){

                       let bicycle = bicicletas.filter(elemento => elemento.marca === brandElected);
                       let bikeElect = bicycle.filter(elemento => elemento.color === colorElected);
                       
                        bikesFilter = bikeElect
                        $("#contenedor").empty();   
                        printBikes(bikesFilter);                 
                    }
                    
                    else if(bicicletaColor[i].color !== bicicletaMarca[i].color){
                            $("#contenedor").empty();   
                        }  
                    }       
                }         
            filterBikes()        
        }     
   
/************************************************
*******ORDENA POR PRECIO O ALFABETICAMENTE*******
************************************************/

    function precio(){
        let orden = $("#seleccionesVarias").val()
        
    if(orden === "1"){    
       bikesFilter = bicicletas.sort((a,b)=>a.precio-b.precio);

       filteredes()
       $("#contenedor").empty(); 
       
       //imprime
       printBikes(bikesFilter)
    }
    else if(orden === "2"){    
        bikesFilter = bicicletas.sort((b,a)=>b.precio-a.precio).reverse();

        filteredes()
        $("#contenedor").empty(); 
        
       //imprime
       printBikes(bikesFilter)
    }
    else if(orden === "3"){
        bikesFilter = bicicletas.sort((a, b) => {
            if (a.marca < b.marca) {
                return -1;
           }; 
        })

        filteredes()
        $("#contenedor").empty(); 
        
        //imprime
        printBikes(bikesFilter)
    }
    else if(orden === "4"){
        bikesFilter = bicicletas.sort((a, b) => {
            if (a.marca > b.marca) {
                return -1;
            }; 
        })

        filteredes()
        $("#contenedor").empty(); 

        //imprime
        printBikes(bikesFilter)
    }
}

/******ejecuta por defecto filtros ******/

precio()
filteredes()

   /***********IMPRESION DE CARD***************/
        function printBikes(bikesFilter){ 

            //BUSCA LA RUTA ACTUAL           
            const path = parseLocation();
            const typeBycicle = path.toUpperCase();
            //SEPARA PRIMER ESPACIO   
            const espaciar = typeBycicle.replace('*',' ')
            //SEPARA SEGUNDO ESPACIO 
            const typeBycicleWithoutSpace = espaciar.replace('*',' ')
                  

            //VACIO EL CONTENEDOR DONDE VA EL NOMBRE DE LA PAGINA Y LO ACTUALIZO CON LA INFORMACION QUE CORRESPONDEN AL TIPO DE BICICLETAS 
            $(".tipoBicicleta").empty();
            $(".tipoBicicleta").prepend(typeBycicleWithoutSpace);
            
            // div para cards
            let contenedor = document.querySelector("#contenedor");
            
                // Recorrida del array e impresion de cards
                for (const bicicleta of bikesFilter) {
                  
                    if(bicicleta.tipo === typeBycicle){
                        
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
                                        <div class="itemModel">${bicicleta.modelo}</div>                        
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
        }

    //por si hay un error en el cargado del JSON    
    catch (error) {
        console.log(error);
    }  
}

/****************SPA*******************/

//DEFINIMOS ROUTER, POSICIONES Y ACCIONES

const routes = [
    {path:'mtb', action:'mtb'},
    {path:'carretera', action:'carretera'},
    {path:'urbanas', action:'urbanas'},
    {path:'infantil', action:'infantil'},
    {path:'e-bikes', action:'e-bikes'},
    {path:'accesorios', action:'accesorios'},
    {path:'ropa*y*calzado', action:'ropa*y*calzado'},
    {path:'equipamiento', action:'equipamiento'}   
]

//FUNCION QUE NOS DIGA CUAL ES NUESTRO LOCATION
const parseLocation = () =>  location.hash.slice(2).toLowerCase() || '/';

//VAMOS A BUSCAR ESA RUTA EN NUESTRO ARRAY
const findActionByPath = (path) => routes.find(r => r.path == path || undefined)


//CREAMOS NUESTRO ROUTER
const router = () => {
   
    //BUSCA LA RUTA ACTUAL
    const path = parseLocation();  
    
    const route = findActionByPath(path);
   

    switch(route.action){
        case 'mtb':
            obtenerDatos()
            break;

            case 'carretera':    
            obtenerDatos();
            break;

            case 'urbanas':        
            obtenerDatos();
            break;

            case 'infantil':        
            obtenerDatos();
            break;

            case 'e-bikes':        
            obtenerDatos();
            break;

            case 'accesorios':        
            obtenerDatos();
            break;

            case 'ropa*y*calzado':        
            obtenerDatos();
            break;    
            case 'equipamiento':        
            obtenerDatos();
            break;          
           
            default:
            // ErrorComponent('#contenedor');
            break;
    }
}

//EVENTOS ROUTEADOR

$(window).on('load', function(){
   router();
});

$(window).on('hashchange', function(){
    router();     
});

console.log(window.location.pathname)