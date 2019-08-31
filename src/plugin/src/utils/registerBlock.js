import { registerBlockType } from "@wordpress/blocks";
import { blockName, makeAttributes } from "utilities";
import icons from "utilities/icons";
import { CATEGORY } from "./constants";

export default function registerBlock({ slug, supports, icon, keywords, attributes = {}, defaults = {}, ...props }) {
	return registerBlockType(blockName(slug), {
		attributes: makeAttributes(attributes, defaults),
		category: CATEGORY,
		icon: icon || icons.logo,
		keywords: ["masterblocks master blocks", ...keywords],
		supports: { anchor: false, html: false, className: false },
		...props,
		getEditWrapperProps(attributes) {
			if (["left", "right", "center", "wide", "full"].includes(attributes.blockAlign)) {
				return { "data-align": attributes.blockAlign };
			}
		},
	});
}
