
import Entity from './entity';
import Node from './node';

// parses a specially formatted input into an array of Entitys.
// returns null if the input is invalid.
export function parseInput(input) {
  const lines = input.trim().split('\n');
  const count = parseInt(lines[0].trim());
  if (isNaN(count)) return null;

  let curLine = 1;
  const result = [];
  // read in each object
  for (let i = 0; i < count; i++) {
    const name = lines[curLine++].trim();
    const entity = new Entity(name);
    const propCount = parseInt(lines[curLine++].trim());
    if (isNaN(count)) return null;

    // read in each property of the object
    for (let j = 0; j < propCount; j++) {
      const prop = lines[curLine++].trim();
      if (prop.length > 0) {
        entity.addProp(prop);
      }
    }

    result.push(entity);
  }
  return result;
}

// builds a question tree, given a list of entities
export function buildTree(entities) {
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

// recursive helper function for buildD3Tree
function d3Tree(data, node) {
  if (node.left || node.right) {
    data.children = [];
  }
  if (node.left) {
    const leftChild = { name: node.left.value };
    data.children.push(leftChild);
    d3Tree(leftChild, node.left);
  }
  if (node.right) {
    const rightChild = { name: node.right.value };
    data.children.push(rightChild);
    d3Tree(rightChild, node.right);
  }
}

// builds a D3 tree for display, given a question tree
export function buildD3Tree(qnsTree) {
  const root = { name: qnsTree.value };
  d3Tree(root, qnsTree);
  return [root];
}
