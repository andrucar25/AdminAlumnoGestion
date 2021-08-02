const getColor= ()=>{ 
    return "hsl(" + 360 * Math.random() + ',' +
               (25 + 70 * Math.random()) + '%,' + 
               (85 + 10 * Math.random()) + '%)'
  }
  
const FetchResult = (data) => {

    const categoriaA= data.filter(d=>d.categoria == "Categoria A")
    const categoriaB= data.filter(d=>d.categoria == "Categoria B")
    const categoriaC= data.filter(d=>d.categoria == "Categoria C")
  
    const idProyectosCatA = []
    const idProyectosCatB = []
    const idProyectosCatC = []
    for (let i = 0; i < categoriaA.length; i++) {
    idProyectosCatA.push(categoriaA[i].idProyecto)
    }
    for (let i = 0; i < categoriaB.length; i++) {
    idProyectosCatB.push(categoriaB[i].idProyecto)
    }
    for (let i = 0; i < categoriaC.length; i++) {
    idProyectosCatC.push(categoriaC[i].idProyecto)
    }
    let unicosA = Array.from(new Set(idProyectosCatA))
    let unicosB = Array.from(new Set(idProyectosCatB))
    let unicosC = Array.from(new Set(idProyectosCatC))
  
    console.log(unicosA)
    console.log(unicosB)
    console.log(unicosC)
  
  
    let catAResult = []
    let catBResult = []
    let catCResult = []
   
    for (let i = 0; i < unicosC.length; i++) {
      let result = 0;
      let nombre = "";
      for (let j = 0; j < categoriaC.length; j++) {
      //   console.log(unicosA[i])
      //   console.log(categoriaC[j].idProyecto)
        if(unicosC[i] == categoriaC[j].idProyecto && categoriaC[j].tipo == "Jurado"){
        //console.log(categoriaC[j].nombreProyecto)
        //console.log(`resultado de voto ${categoriaC[j].idProyecto}`,categoriaC[j].resultado)
        result = result + categoriaC[j].resultado
        nombre = categoriaC[j].nombreProyecto
        }
      
      
      }
    //   console.log("sumatoria",result)
    if(result != 0 && nombre != ""){
      catCResult.push({nombre:nombre,y:parseFloat((result/3).toFixed(2)),color:getColor()})
    }
     
    }
    console.log(catCResult)
  
  
    for (let i = 0; i < unicosB.length; i++) {
    let result = 0;
    let nombre = "";
    for (let j = 0; j < categoriaB.length; j++) {
      //   console.log(unicosA[i])
      //   console.log(categoriaC[j].idProyecto)
      if(unicosB[i] == categoriaB[j].idProyecto && categoriaB[j].tipo == "Jurado"){
        //console.log(categoriaC[j].nombreProyecto)
        //console.log(`resultado de voto ${categoriaC[j].idProyecto}`,categoriaC[j].resultado)
        if(categoriaB[j].resultado != 0 && categoriaB[j].nombreProyecto != ""){
        result = result + categoriaB[j].resultado
        nombre = categoriaB[j].nombreProyecto
        }
        
      }
      
      
    }
  
  if(result != 0 && nombre != ""){
    catBResult.push({nombre:nombre,y:parseFloat((result/3).toFixed(2)),color:getColor()})
  }
  }
  console.log(catBResult)
  
  for (let i = 0; i < unicosA.length; i++) {
    let result = 0;
    let nombre = "";
    for (let j = 0; j < categoriaA.length; j++) {
      //   console.log(unicosA[i])
      //   console.log(categoriaC[j].idProyecto)
      if(unicosA[i] == categoriaA[j].idProyecto && categoriaA[j].tipo == "Jurado"){
        //console.log(categoriaC[j].nombreProyecto)
        //console.log(`resultado de voto ${categoriaC[j].idProyecto}`,categoriaC[j].resultado)
        result = result + categoriaA[j].resultado
        nombre = categoriaA[j].nombreProyecto
      }
      
      
    }
   
  if(result != 0 && nombre != ""){
    catAResult.push({nombre:nombre,y:parseFloat((result/3).toFixed(2)),color:getColor()})
  }
  }
  console.log(catAResult)
  
  //ESTUDIANTES
  ///////////////////////////////////////////////////////////////////////////////////////
  console.log("Estudiantes")
  let catAResultEstudiante = []
  let catBResultEstudiante = []
  let catCResultEstudiante = []
  
  
  for (let i = 0; i < unicosA.length; i++) {
    let result = 0;
    let nombre = "";
    for (let j = 0; j < categoriaA.length; j++) {
      //   console.log(unicosA[i])
      //   console.log(categoriaC[j].idProyecto)
      if(unicosA[i] == categoriaA[j].idProyecto && categoriaA[j].tipo == "Estudiante"){
        //console.log(categoriaC[j].nombreProyecto)
        //console.log(`resultado de voto ${categoriaC[j].idProyecto}`,categoriaC[j].resultado)
        result = result + categoriaA[j].resultado
        nombre = categoriaA[j].nombreProyecto
      }
      
      
    }
    //   console.log("sumatoria",result)
    if(result != 0 && nombre != ""){
    catAResultEstudiante.push({nombre:nombre,y:result})
    }
     
  }
  console.log(catAResultEstudiante)
  
  
  for (let i = 0; i < unicosB.length; i++) {
    let result = 0;
    let nombre = "";
    for (let j = 0; j < categoriaB.length; j++) {
      //   console.log(unicosA[i])
      //   console.log(categoriaC[j].idProyecto)
      if(unicosB[i] == categoriaB[j].idProyecto && categoriaB[j].tipo == "Estudiante"){
        //console.log(categoriaC[j].nombreProyecto)
        //console.log(`resultado de voto ${categoriaC[j].idProyecto}`,categoriaC[j].resultado)
        result = result + categoriaB[j].resultado
        nombre = categoriaB[j].nombreProyecto
      }
      
      
    }
    //   console.log("sumatoria",result)
    if(result != 0 && nombre != ""){
    catBResultEstudiante.push({nombre:nombre,y:result})
    }
     
  }
  console.log(catBResultEstudiante)
  
  
  for (let i = 0; i < unicosC.length; i++) {
    let result = 0;
    let nombre = "";
    for (let j = 0; j < categoriaC.length; j++) {
      //   console.log(unicosA[i])
      //   console.log(categoriaC[j].idProyecto)
      if(unicosC[i] == categoriaC[j].idProyecto && categoriaC[j].tipo == "Estudiante"){
        //console.log(categoriaC[j].nombreProyecto)
        //console.log(`resultado de voto ${categoriaC[j].idProyecto}`,categoriaC[j].resultado)
        result = result + categoriaC[j].resultado
        nombre = categoriaC[j].nombreProyecto
      }
      
      
    }
    //   console.log("sumatoria",result)
    if(result != 0 && nombre != ""){
    catCResultEstudiante.push({nombre:nombre,y:result})
    }
     
  }
  console.log(catCResultEstudiante)
  
  let mayorCatA = ""
  let mayorCatB = ""
  let mayorCatC = ""
  
  let tempA = 0
  for (let i = 0; i < catAResultEstudiante.length; i++) {
      
      if (catAResultEstudiante[i].y > tempA) {
        tempA =	catAResultEstudiante[i].y
        mayorCatA = catAResultEstudiante[i].nombre
      }
  }
  console.log(mayorCatA)
  
  let tempB = 0
  for (let i = 0; i < catBResultEstudiante.length; i++) {
      
      if (catBResultEstudiante[i].y > tempB) {
        tempB =	catBResultEstudiante[i].y
        mayorCatB = catBResultEstudiante[i].nombre
      }
  }
  console.log(mayorCatB)
  
  let tempC = 0
  for (let i = 0; i < catCResultEstudiante.length; i++) {
      
      if (catCResultEstudiante[i].y > tempC) {
        tempC =	catCResultEstudiante[i].y
        mayorCatC = catCResultEstudiante[i].nombre
      }
  }
  console.log(mayorCatC)
  
  if(catAResult.length != 0){
    catAResult.map(cata=>{
      if(cata.nombre == mayorCatA){
        cata.y = parseFloat(cata.y ) + parseFloat(1) 
      }
    })
  }
  if(catBResult.length != 0){
    catBResult.map(cata=>{
      if(cata.nombre == mayorCatB){
        cata.y = parseFloat(cata.y ) + parseFloat(1) 
      }
    })
  }
  if(catCResult.length != 0){
    catCResult.map(cata=>{
      if(cata.nombre == mayorCatC){
        cata.y = parseFloat(cata.y ) + parseFloat(1) 
      }
    })
  }
  
  console.log(catAResult)
  console.log(catBResult)
  console.log(catCResult)
  console.log(mayorCatA)
  console.log(mayorCatB)
  console.log(mayorCatC)

    return {catAResult,catBResult,catCResult,mayorCatA,mayorCatB,mayorCatC}
}

export default FetchResult
