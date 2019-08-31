import { registerBlock } from "utilities";

// Create a require context containing all matched block files.
const context = require.context("./", true, /index\.js$/);

context.keys().forEach(modulePath => {
	const { settings } = context(modulePath);
	registerBlock(settings);
});
