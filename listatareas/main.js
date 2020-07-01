const localStorage={elementos:[]}
const tareas= document.getElementById("tareas")
const contenido=document.getElementById("contenido")
const date= document.getElementById("date")
const btn=document.getElementById("btn")
const err=document.getElementById("err")
const rojo=document.getElementById("rojo")
const azul= document.getElementById("azul")
const amarillo= document.getElementById("amarillo")
let eliminar;
let color;
let txt;
let id=0;

const error=(msm)=>{
//creo el mensage de error      
    txt=document.createTextNode(msm)
   err.appendChild(txt) 
   err.classList="err"
}
let btna
const crearTarea=()=>{
    //creo la tarea
    let div=document.createElement("div")
    div.id=`elemento_${id}`
    div.classList=`tarea ${color}`
    let parrafoTxt=document.createElement("p")
    let txt=document.createTextNode(contenido.value)
    let parrafoFecha=document.createElement("p")
    f= new Date();
    let fecha=document.createTextNode(f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear())
    let btn= document.createElement("input")
    btn.type="button"
    btn.classList="eliminar"
    btn.value="eliminar"
    parrafoTxt.appendChild(txt)
    parrafoFecha.appendChild(fecha)
    div.appendChild(parrafoTxt)
    div.appendChild(parrafoFecha)
    div.appendChild(btn)
    tareas.appendChild(div)
    //creo una array con los datos de los elementos creados
localStorage.elementos.push([contenido.value,`${f.getDate()}/${f.getMonth() +1}/${f.getFullYear()}`,color,`elemento_${id}`])
//actualizo los datos de localstore
window.localStorage.removeItem("lista")
window.localStorage.setItem("lista",localStorage.elementos)
//amento el id para el proximo elemento
id++
}


const validar=()=>{
//valido si los datos son correctos y en el caso de no serlo introduzco el mensage    
    if ((contenido.value.length>0 && Date.parse(date.value)>Date.now() && color!==undefined)){     
    crearTarea()
    
    }else if(Date.parse(date.value)<Date.now() || date.value=== ""){
       error("fecha mal introduccida")
       

             
 }else if (color===undefined) {
    error("elija un color")
    
}else if(contenido.value.length<=0){
    error("introduzca un contenido")
   
}
}
 // compruebo si hay esta la lista en localstore o esta vacia 
if (window.localStorage.getItem("lista")===null || window.localStorage.getItem("lista")===""){
    //en creo la lista vacia en caso de no estarla
    window.localStorage.setItem("lista","");
}else{
    //en caso de que haya lista creo los elemento de los datos de localstore
   let datos=window.localStorage.getItem("lista")
   //creo un array con los datos recogidos de localstore 
    let arraydatos=datos.split(",")
    //creo un fragmento y le añado los elementos y la infromacion que le corresponde
  let  fragmento=document.createDocumentFragment()
    for (let i = 0; i < arraydatos.length; i++) {  
        let div=document.createElement("div")        
        let parrafoTxt=document.createElement("p")
        let txt=document.createTextNode(arraydatos[i])
       i++
       let parrafoFecha=document.createElement("p")
       let fecha=document.createTextNode(arraydatos[i])
       i++
       div.classList=`tarea ${arraydatos[i]}`
       i++
       div.id=arraydatos[i] 
       let btn= document.createElement("input")
       btn.type="button"
       btn.classList="eliminar"
       btn.value="eliminar"
       parrafoTxt.appendChild(txt)
       parrafoFecha.appendChild(fecha)
       div.appendChild(parrafoTxt)
       div.appendChild(parrafoFecha)
       div.appendChild(btn)
       fragmento.appendChild(div) 
    }
    //añado el fragmento al dom
    tareas.appendChild(fragmento)
}

//creo un  evento en el  dom al hacer un click
document.addEventListener("click",(e)=>{
//compruebo si hay un mensage de error y si hay lo elimino
    if(txt!== undefined){      
        err.removeChild(txt)
        txt=undefined
    }
//al pulsar en los cuadrados de colores guardo en una variable ese valor para añadirsela al elemento que se va a crear luego
if(e.target===rojo || e.target===azul || e.target===amarillo){
    color=e.target.id
    
}
//si se pulsa el boton valido los datos
if(e.target===btn ){  
  validar()  
}
//compruebo que existen tareas y en el caso que existan si pulsa el boton se eliminan
if(e.target.parentNode.classList[0]==="tarea"){ 
let idEliminar=e.target.parentNode.id 
//filtro todas las tareas y me quedo con todas menos la que voy a eliminar
 localStorage.elementos=localStorage.elementos.filter(elemento=>elemento[3]!==idEliminar)
//actualizo localStorage
 window.localStorage.removeItem("lista")
window.localStorage.setItem("lista",localStorage.elementos)
//elimino la tarea del dom
tareas.removeChild(e.target.parentNode)
}

})