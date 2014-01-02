
function inherits(constructor, superConstructor){
    constructor.prototype = Object.create(superConstructor.prototype);
}
