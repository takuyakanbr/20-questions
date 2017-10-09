
import Entity from './entity';
import Node from './node';

// parses a specially formatted input into an array of entities.
// returns null if the input is invalid.
export function parseInput(input) {
  const lines = input.trim().split('\n');
  const length = lines.length;
  const count = parseInt(lines[0].trim());
  if (isNaN(count)) return null;

  let curLine = 1;
  const result = [];
  // read in each object
  for (let i = 0; i < count; i++) {
    if (curLine >= length) // ran out of lines
      return (i === 0) ? null : result;

    const name = lines[curLine++].trim();
    const entity = new Entity(name);
    const propCount = parseInt(lines[curLine++].trim());
    if (isNaN(count)) // invalid property count
      return (i === 0) ? null : result;

    // read in each property of the object
    for (let j = 0; j < propCount; j++) {
      const prop = lines[curLine++].trim();
      if (prop && prop.length > 0) {
        entity.addProp(prop);
      }
    }

    result.push(entity);
  }
  return result;
}

// builds a question tree, given a list of entities
export function buildTree(entities) {
  if (!entities) return null;

  // sort the entities in descending number of properties
  entities.sort((a, b) => {
    return b.getSize() - a.getSize();
  });

  let root = null;

  // iterate over every entity
  entities.forEach((entity) => {
    const properties = {};

    // starting from the root, follow the path that describes the entity as far as we can
    let node = root;
    while (root !== null) {
      properties[node.value] = 1;
      const next = entity.hasProp(node.value) ? node.right : node.left;
      if (next === null) break;
      else node = next;
    }

    // iterate over every property of this entity
    entity.getProps().forEach((prop) => {
      if (!properties[prop]) {

        // if this property is not in the path from the root to the
        // current node, add a new node with this property
        const newNode = new Node(prop);
        if (node === null) {
          // this is the first node of the tree
          root = newNode;
        } else {
          // link the new node with the parent
          newNode.parent = node;
          if (entity.hasProp(node.value)) node.right = newNode;
          else node.left = newNode;
        }
        node = newNode;
      }
    });

    // add the leaf node containing the entity
    const leafNode = new Node(entity.name);
    leafNode.entity = entity;
    leafNode.parent = node;
    if (entity.hasProp(node.value)) node.right = leafNode;
    else node.left = leafNode;
  });

  return root;
}

// builds a D3 tree for display, given a question tree and the current target
export function buildD3Tree(qnsTree, target) {
  if (!qnsTree) return [];

  // recursive helper function
  function d3Tree(data, node) {
    if (node.left === null && node.right === null) return 0;

    data.children = [];
    let count = 0;
    if (node.left) {
      const leftChild = { name: node.left.value, nodeClass: '', linkClass: 'link--no' };
      if (node.left.highlight) leftChild.nodeClass = 'node--highlight';
      if (node.left.isTarget(target)) leftChild.nodeClass += ' node--target';
      data.children.push(leftChild);
      count += 1 + d3Tree(leftChild, node.left);
    }
    if (node.right) {
      const rightChild = { name: node.right.value, nodeClass: '', linkClass: 'link--yes' };
      if (node.right.highlight) rightChild.nodeClass = 'node--highlight';
      if (node.right.isTarget(target)) rightChild.nodeClass += ' node--target';
      data.children.push(rightChild);
      count += 1 + d3Tree(rightChild, node.right);
    }
    return count;
  }

  const root = { name: qnsTree.value, nodeClass: '' };
  if (qnsTree.highlight) root.nodeClass = 'node--highlight';
  if (qnsTree.isTarget(target)) root.nodeClass += ' node--target';
  root.count = d3Tree(root, qnsTree);
  return [root];
}
