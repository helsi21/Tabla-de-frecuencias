const table = document.querySelector(".tabla");
const tbody = document.querySelector(".tbody");
const tfoot = document.querySelector(".tfoot"); // selecionamos los elementos del DOM
const button = document.querySelector(".button")
const titulo = document.querySelector(".titulo")


button.addEventListener("click",()=>{           //Boton modo oscuro/claro
  if(button.textContent=="MODO OSCURO"){
   tbody.style.backgroundColor="#293563"
   table.style.color="white"
   button.textContent="MODO CLARO"
   button.style.backgroundColor="white"
   button.style.color="black"
   document.body.style.backgroundColor="#1b374f"
   titulo.style.color="white"
   tfoot.style.color="black"
   
  }else{
   tbody.style.backgroundColor="initial"
   table.style.color="initial"
   button.textContent="MODO OSCURO"
   button.style.backgroundColor="black"
   button.style.color="white"
   document.body.style.backgroundColor="initial"
   titulo.style.color="initial"
   
  }
  
 
 })

let todoslosdatos = []; //Array principal de datos

let pregunta = prompt("quiere introducir otro numero? Responda si o no");  //bucle para la introduccion de datos al array principal
while (pregunta == "si") {
  let datos = prompt("escriba el numero");
  todoslosdatos.push(datos);
  pregunta = prompt("quiere introducir otro numero?");
}

todoslosdatos.sort((a, b)=> a - b); // Se ordena el array de menor a mayor 

const sinrep = [...new Set(todoslosdatos)]; // se crea un nuevo array sin datos repetidos

let fa = []; // Array para guardar las frecuencias absolutas

function countElementRepeats(array, element) { // funcion que filtra las frecuencias absolutas
  const count = array.filter((item) => item === element).length;
  fa.push(count);
}

sinrep.forEach((element) => { // hacemos uso de la funcion de frecuencias absolutas
  countElementRepeats(todoslosdatos, element);
});

const faR = fa.reduce((acc, item) => acc + item, 0); // creamos un nuevo array y sumamos todos los elementos para obtener el total de las FAbsutas

let Tfr = [];// array para las frecuencias relativas
let Tpcj = [];// array para los porcentajes

let sumaA = fa[0] + fa[1]; // valor de la suma del 1er y 2do elemento de las Fabsolutas

for (let i = 0; i < sinrep.length; i++) { //bucle donde se hace las operaciones y creacion de la tabla
  let fr = fa[i] / faR;
  let pcj = (fa[i] / faR) * 100;
  let html;
  if (i > 0) {
    sumaA = sumaA + fa[i + 1];
    html = `<td>${sinrep[i]}</td>
  <td>${fa[i]}</td>
  <td>${fr.toFixed(2)}</td>
  <td>${pcj.toFixed(2)}%</td>
  <td>${sumaA}</td>
  </tr>`;
    if (fa[i + 1] === undefined) {
      html = `<td>${sinrep[i]}</td>
    <td>${fa[i]}</td>
    <td>${fr.toFixed(2)}</td>
    <td>${pcj.toFixed(2)}%</td>
    <td></td>
    </tr>`;
    }
    tbody.innerHTML += html;
    Tfr.push(fr);
    Tpcj.push(pcj);
  } else {
    html = `<td>${sinrep[i]}</td>
    <td>${fa[i]}</td>
    <td>${fr.toFixed(2)}</td>
    <td>${pcj.toFixed(2)}%</td>
    <td>${sumaA}</td>
    </tr>`;
    tbody.innerHTML += html;
    Tfr.push(fr);
    Tpcj.push(pcj);
  }
}

const reducedTfr = Tfr.reduce((acc, item) => acc + item, 0); // creamos un nuevo array y sumamos todos los elementos para obtener el total de las FRelativas
const reducedTpcj = Tpcj.reduce((acc, item) => acc + item, 0);// creamos un nuevo array y sumamos todos los elementos para obtener el total de los porcentajes

//Creamos la row de los totales
let totales = `<tr> 
<td>TOTALES</td>
<td>${faR}</td>
<td>${reducedTfr.toFixed(2)}</td>
<td>${reducedTpcj.toFixed(2)}%</td>
<td></td>
</tr>`;


tfoot.innerHTML += totales; // añadimos la row de los totales al footer de la tabla


