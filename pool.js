function Pool() {
	this.pool = [];
}

Pool.prototype.create = function create(type) {

	var newIndex = null;
	var len = this.pool.length;
	for (var i = 0; i < len; i ++) {
		if (!this.pool[i].pool.alive) {
			newIndex = i;
			break;
		}
	}

	var makeNew = newIndex === null;
	var result;

	if (makeNew) {
		result = new type;
		result.pool = {};
		this.pool.push(result);
	} else {
		result = this.pool[newIndex];
		type.call(result);
	}

	result.pool.alive = true;

	return result;

}

Pool.prototype.each = Pool.prototype.forEach = function each(fn) {

	var len = this.pool.length;
	for (var i = 0; i < len; i ++) {
		if (this.pool[i].pool.alive) {
			fn(this.pool[i]);
		}
	}

}
