import Papa from 'papaparse';

const COMPONENT_MAPPING = [
	{
		name: 'Warp Core',
		frame_row: 76,
		components: [
			{ name: 'Warp Core Type', row: 78 },
			{ name: 'M/AM Injectors', row: 80 },
			{ name: 'Coolant Systems', row: 81 },
			{ name: 'EPS Manifold System', row: 82 },
			{ name: 'Eject System', row: 83 }
		],
		settings: [{ name: 'Safety/Performance', row: 79 }]
	},
	{
		name: 'Engineering',
		frame_row: 65,
		components: [
			{ name: 'Structural Integrity Fields', row: 67 },
			{ name: 'Navigational Deflector', row: 68 },
			{ name: 'Nacelle System', row: 69 },
			{ name: 'Replication Package', row: 71 },
			{ name: 'Fuel & Matter Stores', row: 72 }
		],
		settings: []
	},
	{
		name: 'Hull',
		frame_row: 59,
		components: [{ name: 'Hull System', row: 61 }],
		settings: []
	},
	{
		name: 'Operations',
		frame_row: 43,
		components: [
			{ name: 'Long-Range Sensors', row: 45 },
			{ name: 'Navigational Sensors', row: 46 },
			{ name: 'Survey Sensors', row: 47 },
			{ name: 'Science Labs', row: 48 },
			{ name: 'Computer Core', row: 49 },
			{ name: 'Operating System', row: 50 },
			{ name: 'Secondary Core', row: 51 },
			{ name: 'Diplomatic Package', row: 53 },
			{ name: 'Recreation Package', row: 54 },
			{ name: 'Sickbay', row: 55 }
		],
		settings: [{ name: 'Isolinear?', row: 52 }]
	},
	{
		name: 'Tactical',
		frame_row: 28,
		components: [
			{ name: 'Primary Phasers', row: 30 },
			{ name: 'Secondary Phasers', row: 31 },
			{ name: 'Torpedo System', row: 33 },
			{ name: 'Short-Range Sensors', row: 35 },
			{ name: 'Targeting Computer', row: 36 },
			{ name: 'Deflector Shields', row: 37 },
			{ name: 'Backup Deflectors', row: 38 },
			{ name: 'Impulse Engine Pwr', row: 39 }
		],
		settings: [
			{ name: 'Phaser Arrays', row: 32 },
			{ name: 'Burst Launchers', row: 34 }
		]
	}
];

function import_design(design_csv) {
	const result = Papa.parse(design_csv, { dynamicTyping: true });
	return {
		Name: result.data[0][3],
		'Principal Frame': result.data[17][4],
		Module: {
			Variant: result.data[87][4],
			Type: result.data[87][2]
		},
		Subsystems: COMPONENT_MAPPING.map(function(subsystem) {
			return {
				Name: subsystem.name,
				'Sub-Frame': result.data[subsystem.frame_row][4],
				Settings: subsystem.settings.reduce((acc, value) => {
					acc[value.name] = result.data[value.row][3];
					return acc;
				}, {}),
				Components: subsystem.components.map(row => {
					return {
						Name: row.name,
						Quantity: result.data[row.row][3],
						Part: result.data[row.row][4]
					};
				})
			};
		})
	};
}

export { import_design };
