function pretty(val, n) {
	if (Math.abs(val) > 0) {
		return val.toFixed(2);
	} else {
		return n || '';
	}
};

export {
	pretty,
}
