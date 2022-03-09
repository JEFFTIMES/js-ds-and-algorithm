class singleDirectionNode{
  constructor(value, next){
    this.value = value || null;
    this.next = next || undefined;
  }
}

class biDirectionNode{
  constructor(value, parent, next){
    this.value = value || null;
    this.parent = parent || undefined;
    this.next = next || undefined;
  }
}


export {
  singleDirectionNode,
  biDirectionNode
}
