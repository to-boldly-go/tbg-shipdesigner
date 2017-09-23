function frac(val, base, mixed) {
	if (mixed === undefined || mixed) {
		let integral = Math.floor(val);
		let fractional = Math.ceil((val - integral) * base);
		let integral_print = ''
		if (integral) {
			integral_print = integral.toString() + ' ';
		};
		let fractional_print = '';
		if (fractional) {
			fractional_print = fractional.toString() + '/' + base.toString();
		};
		return (integral_print + fractional_print) || 0;
	} else {
		return Math.round(val * base).toString() + '/' + base.toString();
	}
}

function pretty(val, n) {
	if (Math.abs(val) > 0) {
		return val.toFixed(2);
	} else {
		return n || '';
	}
};

export {
	pretty,
	frac,
}
