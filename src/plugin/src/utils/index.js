import { SLUG } from "./constants";

/**
 * @author Vu Nam Hung
 * @param {string} name Name of the block
 * @returns {string}
 */
export function blockName(name) {
	return SLUG + "/" + name;
}

/**
 * @author Vu Nam Hung
 * @param data
 * @returns {boolean}
 */
export function empty(data) {
	if (_.isBoolean(data)) {
		return data === false;
	} else if (_.isNil(data)) {
		return true;
	} else if (_.isNaN(data)) {
		return true;
	} else if (_.isNumber(data)) {
		return data === 0;
	} else if (_.isUndefined(data)) {
		return true;
	} else if (_.isEmpty(data)) {
		return true;
	}
	return false;
}

export { default as classNames } from "classnames";

export { default as registerBlock } from "./registerBlock";
export { makeAttributes } from "./makeAttributes.js";
