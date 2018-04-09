const Reposed = require("reposed");

const DatabaseInitializer = module.exports = {};

DatabaseInitializer.checkAndInitData = async function checkAndInitData() {
	if (!(await this.checkIfAnyDataIsExisting())) {
		await this.initData();
	}
};

DatabaseInitializer.checkIfAnyDataIsExisting = async function checkIfAnyDataIsExisting() {
	let result = false;
	try {
		const owners = await Reposed.model("owner").find({});
		const pets = await Reposed.model("pet").find({});
		if (owners.length > 0 || pets.length > 0) {
			result = true;
		}
	} catch (error) {
		console.log(error);
	}
	return result;
};

DatabaseInitializer.initData = async function initData() {
	const ownersData = require("../data/owners.json");
	for (const ownerData of ownersData) {
		await Reposed.model("owner").create(ownerData);
	}
	const petsData = require("../data/pets.json");
	for (const petData of petsData) {
		const dateOfBirth = new Date(0);
		dateOfBirth.setUTCSeconds(petData.dateOfBirth);
		petData.dateOfBirth = dateOfBirth;
		petData.ownerId = null;
		petData.image = null;
		await Reposed.model("pet").create(petData);
	}
};
