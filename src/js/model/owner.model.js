module.exports = {
	name: "owner",
	resource: "owners",
	expose: true,
	schema: {
		firstName: String,
		lastName: String,
		email: String,
		active: { type: Boolean, default: false },
	},
};
