// Ecma Script 5
/**
 * Author: Tesfaye Gari
 * Date: July 6, 2019
 */
'use strict';
console.log('Starting JS');
var students=['fana','Fasil', 'Mulusew', 'Elsi'];
for(var index in students){
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

function reverse(){
  var val =document.getElementById('myNum').value*1;
  var outPut = '';
  
  // for(var index=val.length-1; index >=0; index--){
  //   outPut += val[index];
  // }

  while(val >0){
    outPut +=  val % 10;
    val = Math.floor(val/10);    
  }


  if(!outPut){
    outPut=val;
  }
  document.getElementById('reversed').innerHTML = outPut;
  
}