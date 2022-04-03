class SingleDirectionNode{
  constructor(value, next){
    this.value = value || null;
    this.next = next || undefined;
  }
}

class BiDirectionNode{
  constructor(value, parent, next){
    this.value = value || null;
    this.parent = parent || undefined;
    this.next = next || undefined;
  }
}


export {
  SingleDirectionNode,
  BiDirectionNode
}
