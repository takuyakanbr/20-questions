
// count the number of entities within the given tree
export function countEntities(node) {
  if (node === null) return 0;
  if (node.isLeaf()) return 1;
  return countEntities(node.left) + countEntities(node.right);
}

// finds a subtree in the given tree that contains between n/3 and 2n/3 entities,
// where n is the total number of entities in the tree
export function bestSubtree(tree) {
  const totalCount = countEntities(tree);
  const halfCount = totalCount / 2;
  let candidate = null;
  let candidateDelta = totalCount;

  function checkCandidate(node, count) {
    const delta = Math.abs(halfCount - count);
    if (candidateDelta > delta) {
      candidate = node;
      candidateDelta = delta;
    }
  }

  // recursively search to calculate entity count and find the best subtree
  function search(node) {
    if (node === null) return 0;
    if (node.isLeaf()) {
      checkCandidate(node, 1);
      return 1;
    }

    const count = search(node.left) + search(node.right);
    checkCandidate(node, count);
    return count;
  }

  search(tree);
  return candidate;
}

// checks whether the given entity is inside the given tree
export function findEntity(node, entity) {
  if (!node) return false;
  if (node.isLeaf()) return node.value === entity.name;
  return findEntity(node.left, entity) || findEntity(node.right, entity);
}

// removes the given subtree from its parent tree.
// first searches upwards to find the first child of a parent with 2 children
export function trimTree(subtree) {
  while (!subtree.parent.hasBothChildren())
    subtree = subtree.parent;

  const parent = subtree.parent;
  if (parent.left && parent.left.id === subtree.id) parent.left = null;
  else parent.right = null;
  subtree.parent = null;
}
