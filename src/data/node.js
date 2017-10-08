
let counter = 0;

// a Node represents a node in the question tree.
function Node(value) {
  this.id = counter++;
  this.value = value;
  this.entity = null; // used by leaf nodes
  this.left = null;
  this.right = null;
  this.parent = null;
}

// checks whether this node is a leaf node
Node.prototype.isLeaf = function() {
  return this.entity !== null;
};

// checks whether this node has 2 children
Node.prototype.hasBothChildren = function() {
  return this.left !== null && this.right !== null;
};

export default Node;
