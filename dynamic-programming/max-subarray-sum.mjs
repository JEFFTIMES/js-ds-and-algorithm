
function maxSubArraySum(array){
  if(!array instanceof Array){
    throw new TypeError('array must be an instance of Array.')
  }
  if(array.length === 0) return undefined;
  
  // initialize the matrix with {(-1,-1)':0}, it takes the virtual starting index as
  // the coords and 0 as the init value.
  const matrix = new Map();
  matrix.set('-1,-1',[0,0]);

  for(let i=0; i<array.length; i++){
    const coord = i;
    const key = `${[coord,coord]}`;
    const preKey = `${[coord-1,coord-1]}`;
    const value = array[i];
    const [preValue, preMaxValue] = matrix.get(preKey);
    if(value + preValue < 0){ // value makes the total sum negative.
      matrix.set(key, [0,0]); // reset this number as the starting index
    }else{
      if(value + preValue < preValue){ // f(i) 
        matrix.set(key, [value+preValue, preMaxValue]);
      }else{
        matrix.set(key, [value+preValue, value+preValue]);
      } 
    }
  }
  return matrix.get(`${[array.length-1, array.length-1]}`)[1];
}


const a=[1,-2,3,10,4,-2,-1,-1,7];
console.log(maxSubArraySum(a));