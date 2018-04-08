import NamedVectors from '../../lib/namedvector.js';
const NamedVector = NamedVectors.NamedVector;

import assert from 'assert';

describe('NamedVector', () => {
	class SpecificNamedVector extends NamedVector {
		static get shortnames() {
			return {
				'dim_a': 'a',
				'dim_b': 'b',
				'dim_c': 'c',
			};
		}
		constructor(val) {
			super(val, SpecificNamedVector.shortnames);
		}
	}

	describe('basic functionality', () => {
		it('creates', () => {
			const namedVector = new SpecificNamedVector(1.0);
			assert.equal(namedVector['dim_a'], 1.0);
			assert.equal(namedVector['dim_b'], 1.0);
			assert.equal(namedVector['dim_c'], 1.0);
		});

		it('can be created with an object', () => {
			const namedVector = new SpecificNamedVector({dim_a: 1.0, dim_b: 2.0, dim_c: 3.0});
			assert.equal(namedVector['dim_a'], 1.0);
			assert.equal(namedVector['dim_b'], 2.0);
			assert.equal(namedVector['dim_c'], 3.0);
		});

		it('fills in missing values when creating from object', () => {
			const namedVector = new SpecificNamedVector({dim_a: 1.0});
			assert.equal(namedVector['dim_a'], 1.0);
			assert.equal(namedVector['dim_b'], 0.0);
			assert.equal(namedVector['dim_c'], 0.0);
		});

		it('can be assigned to by name', () => {
			const namedVector = new SpecificNamedVector(1.0);
			namedVector['dim_a'] = 2.0;
			namedVector['dim_b'] = 3.0;
			assert.equal(namedVector['dim_a'], 2.0);
			assert.equal(namedVector['dim_b'], 3.0);
			assert.equal(namedVector['dim_c'], 1.0);
		});
	});

	describe('arithmetic', () => {
		const vectorA = new SpecificNamedVector(0.0);
		vectorA['dim_a'] = 2.0;
		vectorA['dim_b'] = 3.0;
		vectorA['dim_c'] = 1.0;

		const vectorB = new SpecificNamedVector(0.0);
		vectorB['dim_a'] = 2.0;
		vectorB['dim_b'] = 4.0;
		vectorB['dim_c'] = 5.0;

		describe('addition', () => {
			it('adds', () => {
				const result = vectorA.add(vectorB);
				assert.equal(result['dim_a'], 4.0);
				assert.equal(result['dim_b'], 7.0);
				assert.equal(result['dim_c'], 6.0);
			});
		});

		xdescribe('subtraction', () => {
			it('subtracts', () => {
				const result = vectorA.sub(vectorB);
				assert.equal(result['dim_a'], 0.0);
				assert.equal(result['dim_b'], -1.0);
				assert.equal(result['dim_c'], -4.0);
			});
		});
	});
});
