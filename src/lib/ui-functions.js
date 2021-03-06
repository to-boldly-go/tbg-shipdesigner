function frac(val, base, mixed) {
	if (mixed === undefined || mixed) {
		let integral = Math.floor(val);
		let fractional = Math.round((val - integral) * base);
		while (fractional >= base) {
			integral += 1;
			fractional -= base;
		}
		let integral_print = '';
		if (integral) {
			integral_print = integral.toString();
		}
		let fractional_print = '';
		if (fractional) {
			fractional_print = fractional.toString() + '/' + base.toString();
		}
		if (integral_print && fractional_print) {
			return integral_print + ' ' + fractional_print;
		} else if (integral_print) {
			return integral_print;
		} else if (fractional_print) {
			return fractional_print;
		} else {
			return '0';
		}
	} else {
		return Math.round(val * base).toString() + '/' + base.toString();
	}
}

function from_frac(str) {
	let m = /(\d+?\s+)?(\d+)\s*\/\s*(\d+)/.exec(str);
	if (!m) {
		return Number.parseFloat(str);
	}
	let whole = m[1] ? Number.parseInt(m[1]) : 0;
	let numer = Number.parseInt(m[2]);
	let denom = Number.parseInt(m[3]);
	return whole + numer / denom;
}

function pretty(val, n) {
	if (Math.abs(val) > 0) {
		return val.toFixed(2);
	} else {
		return n || '';
	}
}

export {
	pretty,
	frac,
	from_frac,
};
