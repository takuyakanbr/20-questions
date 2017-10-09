
// a Node represents a node in the question tree.
function Node(value) {
  this.value = value;
  this.entity = null; // used by leaf nodes
  this.left = null;
  this.right = null;
  this.parent = null;
  this.highlight = false;
}

// checks whether this node is a leaf node
Node.prototype.isLeaf = function() {
  return this.entity !== null;
};

// checks whether this node has 2 children
Node.prototype.hasBothChildren = function() {
  return this.left !== null && this.right !== null;
};

// checks whether this node has an entity whose name matches target
Node.prototype.isTarget = function(target) {
  return this.entity !== null && this.entity.name === target;
};

export default Node;
