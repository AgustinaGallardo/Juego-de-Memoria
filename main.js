//inicializar variables
let tarjetasDestapadas=0;
let tarjeta1=null;
let tarjeta2=null;
let primerResultado=null;
let segundoResultado=null;
let movimientos=0;
let aciertos=0;
let temporizador=false;
let timer=40;
let timerInicial=40;
let tiempoRegresivoId = null;
//apuntado a documento HTML
let mostrarMovimientos= document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('tiempo');

let winAudio = new Audio('./sounds/win.wav');
let loseAudio = new Audio('./sounds/lose.wav');
let rightAudio = new Audio('./sounds/right.wav');
let clickAudio = new Audio('./sounds/click.wav');
let wrongAudio = new Audio('./sounds/wrong.wav');

//Funcion que genera numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros= numeros.sort(()=>{return Math.random()-0.5});
console.log(numeros);

//funciones
function contarTiempo(){
  tiempoRegresivoId = setInterval(() => {
      
          mostrarTiempo.innerHTML = `Tiempo restante: ${timer} segundos`;
          timer--; 
          if (timer < 0){
           clearInterval(tiempoRegresivoId);
           bloquearTarjetas(numeros);
           loseAudio.play();
          }
    }, 1000,timer);
}
function bloquearTarjetas(){
    for(let i = 0; i<=15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML= `<img src="Images/${numeros[i]}.png" alt="">`;
        tarjetaBloqueada.disabled=true;         
    }
}
//Funcion principal
function destapar(id){
    if(temporizador == false){
        contarTiempo();
         temporizador = true;
    }
    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if(tarjetasDestapadas == 1){
        //mostrar primer numero
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML =  `<img src="Images/${primerResultado}.png" alt="">`;
        clickAudio.play();
        //deshabilitar el boton
        tarjeta1.disabled = true;        

    }else if(tarjetasDestapadas == 2){
        //Mostrar segundo numero
        tarjeta2 = document.getElementById(id);
        segundoResultado=numeros[id] ;
        tarjeta2.innerHTML =  `<img src="Images/${segundoResultado}.png" alt="">`;

        //deshabilitar segundo boton
        tarjeta2.disabled = true;       

        //incrementar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`; 

        if(primerResultado == segundoResultado){
            // encerar contador de tarjetas destapas
            tarjetasDestapadas = 0;
            rightAudio.play();

            //aumentar aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

        }else{
            // mostrar momentaneamente valores y volver a tapar
            wrongAudio.play();
            setTimeout(()=>{ 
                tarjeta1.innerHTML = '';
                tarjeta2.innerHTML = '';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            }, 500);
        }
    }
    
    if(aciertos == 8){
        winAudio.play();
        clearInterval(tiempoRegresivoId);
        mostrarAciertos.innerHTML = `Aciertos: ${aciertos} =) `;
        mostrarTiempo.innerHTML = `Tremendo solo demostraste: ${timerInicial - timer} segundos =)`;
        mostrarMovimientos.innerHTML= ` Movimientos: ${movimientos} =)`; 
    }
}