//REGISTRO E INICIO DE USUARIO
//EVENTOS PARA ABRIR Y CERRAR CONTENEDOR
$(()=>{        
    //1 - Esconder buscador
    $(".miCuenta").hide();
    //2 - Cuando hacemos click en el input del buscador se abre el buscador
    $(".btnMiCuenta").on("click",function(e){ 
        e.preventDefault();                
        $(".miCuenta").slideToggle()                               
    });
});

function loginUser(){
if(sessionStorage.getItem("loginUser") === null){
    $(".miCuenta").empty();
    //remueve la clase special para modificar ::after
    $(".miCuenta").removeClass('special');
    //BOTON MI CUENTA POR SI NO ESTA LOGEADO
    if(window.location.pathname === "/index.html"){
        $(".miCuenta").append(`
            <button class="mb-3 btn btn-dark"><a href="pages/cuenta.html#/login">Iniciar Sesión</a></button>
            <button class="btn btn-outline-dark"><a href="pages/cuenta.html#/registro">Registro</a></button>`);
        }else{
            $(".miCuenta").append(`
            <button class="mb-3 btn btn-dark"><a href="../pages/cuenta.html#/login">Iniciar Sesión</a></button>
            <button class="btn btn-outline-dark"><a href="../pages/cuenta.html#/registro">Registro</a></button>`);
        }
    }
    //BOTON MI CUENTA SI ES QUE ESTA LOGUEADO
    else if(sessionStorage.getItem("loginUser") !== null){
        //cambia la clase para modificar ::after
        $(".miCuenta").toggleClass('special');
        const userRegister = JSON.parse(sessionStorage.getItem("loginUser"));
        $(".miCuenta").append(`
        <h6>Mi Cuenta</h6>
        <p>Sesión de ${userRegister.nombre}</p>
        <button class="btn btn-dark btnLogOut">Cerrar sesión</button>`);
    }
}

loginUser()

//Evento para desloguearse
$(".btnLogOut").on("click", function(e){
    e.preventDefault();
    sessionStorage.removeItem("loginUser");
    loginUser()
})

