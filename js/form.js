/***************FORMULARIO********************/
function formulario(){
$("main").empty();
$("main").append(`
<div class="container col-10 col-xxl-5 col-xl-6 col-lg-7 col-md-9">
                <div class="row d-flex justify-content-center pt-4">
                    <div class="titulosCuenta">
                        <h4 class="pt-2">Registro</h4>
                        <h5 class="mt-3">Rellena tus datos</h5>
                    </div>
                    <form class="row inputsRegister py-4">
                        <input class="mb-4 form-control name" required placeholder="Nombre" type="text">
                        <input class="mb-4 form-control surname" required placeholder="Apellido" type="text">
                        <input class="mb-4 form-control adress" required placeholder="Dirección" type="text">
                        <input class="mb-4 form-control city" required placeholder="Ciudad" type="text">
                        <input class="mb-4 form-control country" required placeholder="País" type="text">
                        <input class="mb-4 form-control mail" required placeholder="E-mail" type="email">
                        <input class="mb-4 form-control password" required placeholder="Contraseña" type="password">
                        <span class="icon-eye">
                            <i class="bi bi-eye-fill input-icon"></i>
                        </span>
                        <div class="passwordMsjContainer"></div>
                        <div class="messageErrorUncomplained">
                        <!--contenedor para mensaje de campos de textos incompletos-->
                        </div> 
                        <div class="d-flex justify-content-center">
                            <button type="button" class="btn btn-secondary mt-3" id="buttonRegister">Registrarme</button>
                            <div class="modal" id="my-Modal" tabindex="-1">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title">Te haz registrado correctamente</h5>
                                            <button type="button" class="btn-close btnBackPage" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <p id="userConnected"></p>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary btnBackPage">Cerrar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="my-5">Si ya eres usuario haz <a class="irALogin" href="#/login">clic aquí</a></div>                                                 
                    </form>                    
                </div>
            </div>`);

/*OCULTAR Y DESCUBRIR PASSWORD*/
const iconEye = document.querySelector(".input-icon");

iconEye.addEventListener("click",function(){

    if(($(".password").attr("type")) === "password"){
        $(".password").removeAttr("type")
        $("i").removeClass("bi-eye-fill") 
        $("i").addClass("bi-eye-slash-fill")  
    }
    else{
        $(".password").attr("type","password")
        $("i").removeClass("bi-eye-slash-fill") 
        $("i").addClass("bi-eye-fill") 
    }
})

/******Validar datos*******/
/*variable para definir mail*/

let mail = document.querySelector(".mail");

mail.onchange = () =>{
    validarEmail(mail);
}

/*******funcion para validar email *******/
function validarEmail(mail) {
    if (/\S+@\S+/.test(mail.value)){
        console.log("mail correcto");
        $('#buttonRegister').removeAttr('disabled') 
        $('.validated').remove() 
    } else {
        if($(".validated").text() !== "mail no valido"){
            $(".mail").after(`<p class = "validated">mail no valido</p>`)
            $("#buttonRegister").attr('disabled','disabled');
        }
    }
  }

/********GUARDADO DE USUARIOS*************/
//definimos clase para usuarios
class usuarios{
    constructor(nombre, apellido, direccion, ciudad, pais, email, contraseña){
        this.nombre = nombre;
        this.apellido = apellido;
        this.direccion = direccion;
        this.ciudad = ciudad;
        this.pais = pais;
        this.mail = email;
        this.password = contraseña; 
    }
}

//definimos el array para los usuarios
const usuario = JSON.parse(localStorage.getItem("usuarios")) || [];

function guardarUsuarios(){
    //definimos variables para inputs
    let nombre = document.querySelector(".name").value;
    let apellido = document.querySelector(".surname").value;
    let direccion = document.querySelector(".adress").value;
    let ciudad = document.querySelector(".city").value;
    let pais = document.querySelector(".country").value;
    let email = document.querySelector(".mail").value;
    let contraseña = document.querySelector(".password").value; 

    //extraemos los datos guardados del localStorage
    let loadUser = localStorage.getItem("usuarios");
    let JSONLoadUser = JSON.parse(loadUser);

    validarEmail(mail);
    
    if(JSONLoadUser !== null){    

        for (let i = 0; i < JSONLoadUser.length; i++) {
            $(".mailMessage").remove();

            if((JSONLoadUser[i].mail).includes(mail.value)){
                if(mail.value !== ""){
                $(".mailMessage").remove();
                $(".mail").after('<p class="mailMessage">ya existe un usuario registrado con ese correo electronico</p>');
                return
            }
            }
        }
    }
       
    if(((nombre.length) && (apellido.length) && (direccion.length) && (ciudad.length) && (email.length) && (pais.length) && (contraseña.length)) == 0){   
       
        validarEmail(mail);   

        $(".inputsUnfill").remove();
        $(".messageErrorUncomplained").append('<p class="inputsUnfill">Existen campos de texto sin escribir, por favor completelos con sus datos personales</p>');
    }
    else if (((nombre.length) && (apellido.length) && (direccion.length) && (email.length) && (ciudad.length) && (pais.length) && (contraseña.length)) >= 1){
       
        $(".inputsUnfill").remove();
        
        if(contraseña.length >= 6){

        usuario.push(new usuarios(nombre, apellido, direccion, ciudad, pais, email, contraseña))
        
        let usuariosJSON = JSON.stringify(usuario);
        localStorage.setItem("usuarios", usuariosJSON);

        $("#userConnected").append(`<p>Hola ${nombre}!, te hemos registrado correctamente</p>`);

        $("#my-Modal").modal("show");
            // @@MODIFICAR AL SUBIR AL SITIO EL DOCUMENT.REFERRER@@
        $(".btnBackPage").on("click",function(){
             if(window.location.hash === "#/registro"){
                //revisar modal si puede quedar fijo al apretar boton
                $("#my-Modal").modal("hide");
                window.location.href = "http://127.0.0.1:5506/pages/cuenta.html#/login";
            }else{
                window.location.href = "../index.html";
            }
        })         
       
        }
        else {
            $(".passwordMessage").remove();
            $(".passwordMsjContainer").after('<p class="passwordMessage">La contraseña debe contener al menos 6 caracteres</p>');
        }
        }    
    }

//evento para guardar usuario
$("#buttonRegister").on("click", guardarUsuarios)   
}

