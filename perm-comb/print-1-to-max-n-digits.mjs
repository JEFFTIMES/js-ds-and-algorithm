function* genOneToNDigitsMax(n){
  let digit = 0;
  // base case: n === 1, returns 0 to 9 respectively
  if(n === 1){
    while(digit < 10){
      yield digit.toString();
      digit++;
    }
  } 

  // other cases: recursively 
  while(digit < 10){
    for(const rest of genOneToNDigitsMax(n-1)){
      yield digit.toString() + rest
    }
    digit++;
  }
}


for(let i of genOneToNDigitsMax(10)){
  console.log(i)
}
