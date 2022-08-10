//1 - CREAR SPA PARA REGISTRO Y LOGIN

/****************SPA*******************/
import { login } from "../js/login.js";

//DEFINIMOS ROUTER, POSICIONES Y ACCIONES

const routes = [
    {path:'registro', action:'registro'},
    {path:'login', action:'login'},  
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
        case 'registro':
            formulario()
            break;

            case 'login':    
            login();
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
