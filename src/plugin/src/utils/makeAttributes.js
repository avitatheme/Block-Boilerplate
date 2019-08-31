/**
 * @param {Object} attributes
 * @param {Object} defaultValue
 * @returns {*}
 */
function makeAttributes(attributes, defaultValue = {}) {
	const preAttributes = {
		uniqueID: {
			type: "string",
			default: "",
		},
		uniqueIDSet: {
			type: "boolean",
			default: false,
		},
		viewPort: {
			type: "string",
			source: "meta",
			meta: "master_blocks_view_port",
		},
		changed: {
			type: "boolean",
			default: false,
		},
		blockAlign: {
			type: "string",
			default: "full",
		},
		contentAlign: {
			type: "string",
			default: "left",
		},
		...attributes,
	};

	const buildDefaultValue = _map(defaultValue, (value, key) => ({
		[key]: {
			default: value,
		},
	}));

	return _merge({}, preAttributes, ...buildDefaultValue);
}

export { makeAttributes };
