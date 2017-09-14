'use strict';

import Promise from 'bluebird';
import ShipEngine from '../lib/shipengine';
import ShipImporter from '../lib/shipimporter';

Promise.longStackTraces();

import design_json from '../dist/design.json';
import canon_parts from '../dist/parts_C8.csv';
import canon_modules from '../dist/modules_C8.csv';
import canon_frames from '../dist/frames_C8.csv';

let se_DB = new ShipEngine.DB({
	parts: canon_parts,
	frames: canon_frames,
	modules: canon_modules,
});

console.log(design_json);
console.log(canon_parts);
console.log(canon_modules);

let se_design = new ShipEngine.Design(se_DB, design_json);
console.log(se_design.pretty_summary);
console.log(se_design.pretty_sdb_info);

