
class NamedVector {
	constructor(val, shortnames) {
		this.shortnames = shortnames;
		if ((typeof val) === 'number') {
			this.names.forEach((name) => {
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

	toFixed(n) {
		return this.names.map((name) => {
			return this.shortnames[name].toUpperCase() + '[' + this[name].toFixed(n) + ']';
		}).join(' ')
	};

	toString() {
		return this.names.map((name) => {
			return this.shortnames[name].toUpperCase() + this[name].toString();
		}).join(' ')
	};
	static op_add(a, b) {
		return a + b;
	};
	static op_sub(a, b) {
		return a - b;
	};
	static op_mult(a, b) {
		return a * b;
	};
	static op_div(a, b) {
		return a / b;
	};
	static op_lt(a, b) {
		return a < b;
	};
	static op_le(a, b) {
		return a <= b;
	};
	static op_gt(a, b) {
		return a > b;
	};
	static op_ge(a, b) {
		return a >= b;
	};

	add(other) {
		return this.op(NamedVector.op_add, other);
	}
	sub(other) {
		return this.op(NamedVector.op_sub, other);
	}
	mult(other) {
		return this.op(NamedVector.op_mult, other);
	}
	div(other) {
		return this.op(NamedVector.op_div, other);
	}
	get floor() {
		return this.apply(Math.floor);
	}
	get ceil() {
		return this.apply(Math.ceil);
	}

	get sq_magnitude() {
		this.mult(this);
	};

	get magnitude() {
		return Math.sqrt(this.sq_magnitude);
	};

	apply(fun) {
		return new this.constructor(
			this.names.reduce((acc, name) => {
				acc[name] = fun(this[name]);
				return acc;
			}, {})
		);
	};

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

	countTest(other, op) {
		return this
			.names
			.filter(name => op(this[name], other[name]))
			.length
	};

	dominates(other) {
		const result = this.names.reduce((acc, name) => {
			return {
				at_least: acc.at_least && (this[name] >= other[name]),
				greater: acc.greater || (this[name] > other[name]),
			};
		}, {at_least: true, greater: false});
		return result.at_least && result.greater;
	};
};

module.exports.NamedVector = NamedVector;
