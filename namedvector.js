
class NamedVector {
	constructor(val, shortnames) {
		this.shortnames = shortnames;
		if ((typeof val) === 'number') {
			this.constructor.names.forEach((name) => {
				this[name] = val;
			});
		} else {
			this.names.forEach((name) => {
				this[name] = val[name] || 0;
			});
		}
	};

	get names() {
		return Object.keys(this.shortnames);
	};

	toString() {
		return '[' + this.names.map((name) => {
			return this.constructor.shortnames[name].toUpperCase() + this[name].toString();
		}).join(' ') + ']'
	};
	static op_add(a, b) {
		return a + b;
	};
	static op_mult(a, b) {
		return a * b;
	};

	add(other) {
		return this.op(NamedVector.op_add, other);
	}
	mult(other) {
		return this.op(NamedVector.op_mult, other);
	}
	get floor() {
		return new this.constructor(
			this.names.reduce((acc, name) => {
				acc[name] = Math.floor(this[name]);
				return acc;
			}, {})
		);
	}

	op(fun, other) {
		if ((typeof other) === 'number') {
			return new this.constructor(
				this.names.reduce((acc, name) => {
					acc[name] = fun(this[name], other);
					return acc;
				}, {})
			);
		} else {
			return new this.constructor(
				this.names.reduce((acc, name) => {
					acc[name] = fun(this[name], other[name]);
					return acc;
				}, {})
			);
		};
	};
};

module.exports.NamedVector = NamedVector;
