export default class Node{
  constructor(value, left, right, parent){
    this.value = value || 0;
    this.left = left || undefined;
    this.right = right || undefined;
    this.parent = parent || undefined;
  }
  *[Symbol.iterator](){
    yield this.value;
    if(!this.left){ 
      yield undefined;
    }else{
      yield* this.left;
    } 
    if(!this.right){
      yield undefined;
    }else{
      yield* this.right;
    }
  }

  * genMirror(){
    yield this.value;
    if(!this.right){
      yield undefined;
    }else{
      yield* this.right.genMirror();
    }
    if(!this.left){
      yield undefined;
    }else{
      yield* this.left.genMirror();
    }
  }
  
}