// Ecma Script 5
/**
 * Author: Tesfaye Gari
 * Date: July 6, 2019
 */
console.log('Starting JS');
var students=['fana','Fasil', 'Mulusew', 'Elsi'];
for(index in students){
  console.log(students[index]);
}


function doSomething(){
  var a = prompt("Enter Heading");
  if(a){
    var e =document.getElementById('heading1');
    e.innerHTML = a;
  }  
}

function textChanged(event){
  var e =document.getElementById('heading1');
  if(event.data){
    e.innerHTML += event.data;
  }else{
    e.innerHTML = e.innerHTML.substring(0,e.innerHTML.length-1);
  }
}