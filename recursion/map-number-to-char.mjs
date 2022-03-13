// given a series of numbers and the mapping dictionary, translate the
// series of numbers to all possible series of chars.
function mapNumbersToChars(numberString){
  const dictionary='abcdefghijklmnopqrstuvwxyz'
  const map = {}
  for(let i=0; i<dictionary.length; i++){
    map[i]=dictionary[i];
  }
  Object.freeze(map);
  return convertToChar(numberString, map);
}

function convertToChar(numberString, map){
  const conversions = []
  const len = numberString.length;
  const lastTwoDigits = len > 1 ? parseInt(numberString[len-2] + numberString[len-1]) : undefined;
  const lastDigit = len > 0 ? parseInt(numberString[len-1]) : undefined;

  //base case:
  if(len === 1){
    return map[lastDigit];
  }
  
  //other cases: 
  // yield the conversions for all the sub string plus the conversion for the last digit,
  // and yield the conversions for all the sub string plus the conversion for the last two digits if possible. 

  let copyNumberString = numberString.split('').slice(0,-1).join('');
  for(let c of convertToChar(copyNumberString, map)){
    conversions.push(c + map[lastDigit]);
  }
  
  if(lastTwoDigits <= 25){
    copyNumberString = numberString.split('').slice(0,-2).join('');
    if(copyNumberString.length === 0){
      conversions.push(map[lastTwoDigits]);
    }else{
      for(let c of convertToChar(copyNumberString, map)){
        conversions.push(c + map[lastTwoDigits])
      }
    }
  }
  return conversions
}


const ns = '12258'; 
// ((1,2),2,),5,8; ((12),2,),5,8; (1,22),5,8;    (1,2),25,8; (12),25,8;
// 1,(2258),                                                                     12,(258),
// 1,(2,(258)),                                       1,(25,(58));                12,(2,(58)),              12,(2,(5,8))
// 1,(2,(2,(58))),                  1,(2,(25,(8)))    1,(25,(5,8)), 1,(25,(58));  12,(2,(5,8)), 12,(2,(58));
// 1,(2,(2,(5,8))), 1,(2,(2,(58,'')))  

// 85221   (((8,5),2),2),1; ((8,5),22),1; ((8,5),2),21

const g = mapNumbersToChars(ns)

for(let e of g){
  console.log(e)
}
