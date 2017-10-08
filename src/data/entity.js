
// an Entity represents a possible answer in the game,
// and contains a map of the properties associated with it.
function Entity(name) {
  this.name = name;
  this.props = {};
  this.size = 0;
}

// add a new property to this entity
Entity.prototype.addProp = function(prop) {
  this.props[prop] = 1;
  this.size++;
};

// check if this entity contains the given property
Entity.prototype.hasProp = function(prop) {
  return this.props[prop] !== undefined;
};

// returns a sorted array of all properties on this entity
Entity.prototype.getProps = function() {
  return Object.keys(this.props).map((key) => key).sort();
};

// returns the number of properties on this entity
Entity.prototype.getSize = function() {
  return this.size;
};

export default Entity;
