import { zipByAndWith } from '@/lib/lang-utils.js';

import _ from 'lodash';
import assert from 'assert';

describe('lang-utils', () => {
	describe('zipByAndWith', () => {
		it('handles same arrays of numbers with identity iteratee and add combiner', () => {
			assert.deepStrictEqual(zipByAndWith([5, 6, 7, 8], [5, 6, 7, 8], _.identity, _.add), [10, 12, 14, 16]);
		});
		it('handles disjoint arrays of numbers with identity iteratee and add combiner', () => {
			assert.deepStrictEqual(zipByAndWith([1, 2, 3, 4], [5, 6, 7, 8], _.identity, _.add), [1, 2, 3, 4, 5, 6, 7, 8]);
		});
		it('handles intersecting arrays of numbers with identity iteratee and add combiner', () => {
			assert.deepStrictEqual(zipByAndWith([2, 3, 4, 5], [5, 6, 7, 8], _.identity, _.add), [2, 3, 4, 10, 6, 7, 8]);
		});
		it('handles arrays of numbers with even/odd iteratee and add combiner', () => { // note same 'last value' behavior as _.keyBy
			assert.deepStrictEqual(zipByAndWith([1, 2, 3, 4], [5, 6, 7, 8], x => x % 2, _.add), [10, 12]);
		});
		it('handles disjoint arrays of numbers with index iteratee and add combiner', () => {
			assert.deepStrictEqual(zipByAndWith([1, 2, 3, 4], [5, 6, 7, 8], (x, index) => index, _.add), [6, 8, 10, 12]);
		});
		it('handles intersecting arrays of numbers with index iteratee and add combiner', () => {
			assert.deepStrictEqual(zipByAndWith([2, 3, 4, 5], [5, 6, 7, 8], (x, index) => index, _.add), [7, 9, 11, 13]);
		});
		it('handles arrays of numbers with holes in first array with identity iteratee and add combiner', () => {
			assert.deepStrictEqual(zipByAndWith([5, 7], [5, 6, 7, 8], _.identity, _.add), [10, 14, 6, 8]);
		});
		it('handles arrays of numbers with holes in second array with identity iteratee and add combiner', () => {
			assert.deepStrictEqual(zipByAndWith([5, 6, 7, 8], [5, 7], _.identity, _.add), [10, 6, 14, 8]);
		});
	});
});
