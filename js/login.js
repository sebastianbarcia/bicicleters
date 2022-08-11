function login(){

    $("main").empty();
    $("main").append(`
    <div class="container loginModel col-10 col-xxl-5 col-xl-6 col-lg-7 col-md-9 paddingLogin">
                    <div class="row d-flex justify-content-center pt-4">
                        <div class="titulosCuenta">
                            <h4 class="pt-2">Iniciar sesión</h4>
                        </div>
                        <form class="row inputsRegister py-4">                            
                            <input class="mb-4 form-control mail" required placeholder="E-mail" type="email">
                            <div class="errorMail"></div>
                            <input class="mb-4 form-control password" required placeholder="Contraseña" type="password">
                            <span class="icon-eye">
                                <i class="bi bi-eye-fill input-icon"></i>
                            </span>
                            <div class="passwordMsjContainer"></div>
                                <div class="messageErrorUncomplained">
                                </div> 
                                <div class="d-flex justify-content-center">                              
                                    <button type="button" class="btn btn-secondary mt-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop" id="buttonRegister">
                                    Acceder
                                    </button>                               
                                    <div class="modal fade my-modal" id="staticBackdropModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="staticBackdropLabel">Inicio de sesion exitosa</h5>
                                                <button type="button" class="btn-close btnBackPage" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                <p id="userConnected"></p>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary btnBackPage" data-bs-dismiss="modal">Cerrar</button>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                                <div class="my-5">Si todavia no estas registrado haz <a class="irALogin" href="#/registro">clic aqui</a></div>                                               
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

const extraerUsuariosRegistrados = localStorage.getItem("usuarios");
const usuariosRegistrados = JSON.parse(extraerUsuariosRegistrados);

function loguearUsuario(){
    //si todavia no hay ningun usuario registrado
    if(usuariosRegistrados === null){
        $(".errorMail").empty();
        $(".errorMail").append(`<p>No existe un usuario con ese mail<p>`);
    }
for (let i = 0; i < usuariosRegistrados.length; i++) {
    
    if((usuariosRegistrados[i].mail === $(".mail").val()) && ((usuariosRegistrados[i].password) === $(".password").val())){
        
        // window.location.href = '../index.html';
        $("#staticBackdropModal").modal("show");

        $(".btnBackPage").on("click",function(){
            if(document.referrer === "https://bicicleters.netlify.app/index.html"){
            window.location.href = "../index.html"; 
            }else if(document.referrer === "https://bicicleters.netlify.app/pages/carrito.html"){
                window.location.href = "../pages/carrito.html";
            }else{
                window.location.href = "../index.html";
            }
        })           
    
        //guardamos en session storage el inicio de sesion con los datos que estaban en el local storage de la cuenta
        let userSessionAutorized = JSON.stringify(usuariosRegistrados[i])
        sessionStorage.setItem("loginUser", userSessionAutorized);

        //avisamos que se inicio correctamente la sesión 
        $(".messageErrorUncomplained").empty();
        $("#userConnected").append(`<p>Hola ${usuariosRegistrados[i].nombre}!, haz iniciado tu sesion</p>`);
        return;
    }
    else if ((usuariosRegistrados[i].mail  !== ($(".mail").val())) || ((usuariosRegistrados[i].password) !== ($(".password").val()))){
        
       //si usuario y password no coinciden con los valores de los inputs mail y password se establece el mensaje de que el usuario verifique los datos seleccionados
        $(".messageErrorUncomplained").empty();
        $(".messageErrorUncomplained").append(`<p>Verifique los datos proporcionados</p>`);
        

        if(($(".password").val().length) < 6){
            $(".messageErrorUncomplained").prepend(`<p>Recuerda que la contraseña debe contener al menos 6 caracteres</p>`);
        }
        
        const findUsers = usuariosRegistrados
        const elementFinded = findUsers.find(users => users.mail === $(".mail").val())
        
        if((elementFinded === undefined)){
            $(".errorMail").empty();
            $(".errorMail").append(`<p>No existe un usuario con ese mail<p>`);
            
        }else{
            console.log("no")
            $(".errorMail").empty();
            }  
      
        }
       
    }
    
}

//evento para validar el inicio de sesión
$("#buttonRegister").on("click", loguearUsuario);

}

export { login }