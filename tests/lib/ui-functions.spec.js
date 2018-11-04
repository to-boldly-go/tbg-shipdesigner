import { frac, from_frac } from '@/lib/ui-functions.js';

import assert from 'assert';

describe('ui-functions', () => {
	describe('frac', () => {
		describe('mixed unspecified', () => {
			it('handles whole number 0 with base 1', () => {
				assert.equal(frac(0, 1), '0');
			});
			it('handles whole number 0 with base 12', () => {
				assert.equal(frac(0, 12), '0');
			});
			it('handles whole number 2 with base 1', () => {
				assert.equal(frac(2, 1), '2');
			});
			it('handles whole number 2 with base 12', () => {
				assert.equal(frac(2, 12), '2');
			});
			it('handles fractional number 0.5 with base 1 with rounding', () => {
				assert.equal(frac(0.5, 1), '1');
			});
			it('handles fractional number 0.4 with base 1 with rounding', () => {
				assert.equal(frac(0.4, 1), '0');
			});
			it('handles fractional number 2.5 with base 1 with rounding', () => {
				assert.equal(frac(2.5, 1), '3');
			});
			it('handles fractional number 2.4 with base 1 with rounding', () => {
				assert.equal(frac(2.4, 1), '2');
			});
			it('handles fractional number 0.5 with base 10', () => {
				assert.equal(frac(0.5, 10), '5/10');
			});
			it('handles fractional number 0.4 with base 10', () => {
				assert.equal(frac(0.4, 10), '4/10');
			});
			it('handles fractional number 2.5 with base 12', () => {
				assert.equal(frac(2.5, 12), '2 6/12');
			});
			it('handles fractional number 2.25 with base 12', () => {
				assert.equal(frac(2.25, 12), '2 3/12');
			});
		});

		describe('mixed true', () => {
			it('handles whole number 0 with base 1', () => {
				assert.equal(frac(0, 1, true), '0');
			});
			it('handles whole number 0 with base 12', () => {
				assert.equal(frac(0, 12, true), '0');
			});
			it('handles whole number 2 with base 1', () => {
				assert.equal(frac(2, 1, true), '2');
			});
			it('handles whole number 2 with base 12', () => {
				assert.equal(frac(2, 12, true), '2');
			});
			it('handles fractional number 0.5 with base 1 with rounding', () => {
				assert.equal(frac(0.5, 1, true), '1');
			});
			it('handles fractional number 0.4 with base 1 with rounding', () => {
				assert.equal(frac(0.4, 1, true), '0');
			});
			it('handles fractional number 2.5 with base 1 with rounding', () => {
				assert.equal(frac(2.5, 1, true), '3');
			});
			it('handles fractional number 2.4 with base 1 with rounding', () => {
				assert.equal(frac(2.4, 1, true), '2');
			});
			it('handles fractional number 0.5 with base 10', () => {
				assert.equal(frac(0.5, 10, true), '5/10');
			});
			it('handles fractional number 0.4 with base 10', () => {
				assert.equal(frac(0.4, 10, true), '4/10');
			});
			it('handles fractional number 2.5 with base 12', () => {
				assert.equal(frac(2.5, 12, true), '2 6/12');
			});
			it('handles fractional number 2.25 with base 12', () => {
				assert.equal(frac(2.25, 12, true), '2 3/12');
			});
		});

		describe('mixed false', () => {
			it('handles whole number 0 with base 1', () => {
				assert.equal(frac(0, 1, false), '0/1');
			});
			it('handles whole number 0 with base 12', () => {
				assert.equal(frac(0, 12, false), '0/12');
			});
			it('handles whole number 2 with base 1', () => {
				assert.equal(frac(2, 1, false), '2/1');
			});
			it('handles whole number 2 with base 12', () => {
				assert.equal(frac(2, 12, false), '24/12');
			});
			it('handles fractional number 0.5 with base 1 with rounding', () => {
				assert.equal(frac(0.5, 1, false), '1/1');
			});
			it('handles fractional number 0.4 with base 1 with rounding', () => {
				assert.equal(frac(0.4, 1, false), '0/1');
			});
			it('handles fractional number 2.5 with base 1 with rounding', () => {
				assert.equal(frac(2.5, 1, false), '3/1');
			});
			it('handles fractional number 2.4 with base 1 with rounding', () => {
				assert.equal(frac(2.4, 1, false), '2/1');
			});
			it('handles fractional number 0.5 with base 10', () => {
				assert.equal(frac(0.5, 10, false), '5/10');
			});
			it('handles fractional number 0.4 with base 10', () => {
				assert.equal(frac(0.4, 10, false), '4/10');
			});
			it('handles fractional number 2.5 with base 12', () => {
				assert.equal(frac(2.5, 12, false), '30/12');
			});
			it('handles fractional number 2.25 with base 12', () => {
				assert.equal(frac(2.25, 12, false), '27/12');
			});
		});
	});

	describe('from_frac', () => {
		it('handles whole number 0', () => {
			assert.equal(from_frac('0'), 0);
		});
		it('handles whole number 2', () => {
			assert.equal(from_frac('2'), 2);
		});
		it('handles decimal 2.0', () => {
			assert.equal(from_frac('2.0'), 2);
		});
		it('handles decimal .5', () => {
			assert.equal(from_frac('.5'), 0.5);
		});
		it('handles decimal 0.5', () => {
			assert.equal(from_frac('0.5'), 0.5);
		});
		it('handles decimal 2.5', () => {
			assert.equal(from_frac('2.5'), 2.5);
		});
		it('handles fraction 1/1', () => {
			assert.equal(from_frac('1/1'), 1);
		});
		it('handles fraction 3/12', () => {
			assert.equal(from_frac('3/12'), 0.25);
		});
		it('handles fraction 30/12', () => {
			assert.equal(from_frac('30/12'), 2.5);
		});
		it('handles mixed fraction 2 6/12', () => {
			assert.equal(from_frac('30/12'), 2.5);
		});
		it('handles extraneous spaces for fraction', () => {
			assert.equal(from_frac(' 30 / 12 '), 2.5);
		});
		it('handles extraneous spaces for mixed fraction', () => {
			assert.equal(from_frac(' 2 1 / 2 '), 2.5);
		});
		it('handles wierd inputs as NaN', () => {
			assert(Number.isNaN(from_frac('hello world')));
		});
	});
});
