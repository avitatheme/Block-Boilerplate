import { getCategories, setCategories } from "@wordpress/blocks";
import { SLUG } from "./constants";
import icons from "./icons";

setCategories([
	{
		slug: SLUG,
		title: "Master Blocks",
		icon: icons.logo,
	},
	...getCategories().filter(({ slug }) => slug !== SLUG),
]);
