
// a Node represents a node in the question tree.
function Node(value) {
  this.value = value;
  this.entity = null; // used by leaf nodes
  this.left = null;
  this.right = null;
  this.parent = null;
}

// checks whether this node is a leaf node
Node.prototype.isLeaf = function() {
  return this.left === null && this.right === null;
};

export default Node;
