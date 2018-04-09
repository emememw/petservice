const mongoose = require("mongoose");

module.exports = {
	name: "pet",
	resource: "pets",
	expose: true,
	schema: {
		ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "owners" },
		nickname: String,
		commonName: String,
		scientificName: String,
		dateOfBirth: Date,
		image: String,
	},
};
