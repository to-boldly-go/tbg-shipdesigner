import _ from 'lodash';

function zipByAndWith(array1, array2, iteratee, combiner) {
	let keyValMap1 = new Map(
		array1.map((x, index, array) => [iteratee(x, index, array), x])
	); // similar to _.keyBy except iteratee accepts all args passed to .map's callback
	let keyValMap2 = new Map(
		array2.map((x, index, array) => [iteratee(x, index, array), x])
	);
	let keys = _.union(array1.map(iteratee), array2.map(iteratee));
	return _.zipWith(
		keys.map(key => keyValMap1.get(key)),
		keys.map(key => keyValMap2.get(key)),
		combiner
	);
}

export { zipByAndWith };
