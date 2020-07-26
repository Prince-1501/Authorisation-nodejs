let valuex = ['prince', 'bikki' , 'rohit' , 'aakash'];
let arrayx = ['A', 'B', 'C', 'D'];

let valuesSelected = 'bikki';
let index;
for(let i = 0 ; i<arrayx.length ; i++){
  if(valuesSelected === valuex[i]){
    index = i;
  }
}
console.log(index);
