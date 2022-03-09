
export default class StackWithMin{
  constructor(stack){
    this.stack = stack instanceof Array ? stack : new Array();
    this.minStack = new Array();
  }
  push(element){
    //valid the input
    if(typeof element !== 'number'){
      throw new TypeError("element being pushed to the stack should be a number.")
    }

    if(!this.stack[0]){ // empty stack
      this.stack.push(element);
      this.minStack.push(element);
    }else{ //compare the incoming element with the top element of the minStack.
      const minTop = element < this.minStack[this.minStack.length-1] ? element : this.minStack[this.minStack.length-1]
      this.minStack.push(minTop); // always push the smaller one between the top element of the minStack and the incoming one.
      this.stack.push(element);  // push the element to the stack;
    }
  }
  pop(){
    //check capacity
    if(!this.stack[0]){ // empty stack
      return undefined
    }else{
      this.minStack.pop();
      return this.stack.pop();
    }
  }
  min(){
    return this.minStack[this.minStack.length-1];
  }
}
