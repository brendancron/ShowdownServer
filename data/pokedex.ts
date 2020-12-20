export const Pokedex: {[speciesid: string]: SpeciesData} = {
	ludicolo: {
		num: 1,
		name: "Ludicolo",
		types: ["Water", "Grass"],
		baseStats: {hp: 80, atk: 70, def: 70, spa: 90, spd: 100, spe: 70},
		abilities: {0: "Swift Swim", 1: "Rain Dish", H: "Own Tempo"},
		heightm: 1.5,
		weightkg: 55,
		color: "Green",
		eggGroups: ["Water 1", "Grass"],
	},
	venusaur: {
		num: 2,
		name: "Venusaur",
		types: ["Grass", "Poison"],
		genderRatio: {M: 0.875, F: 0.125},
		baseStats: {hp: 80, atk: 82, def: 83, spa: 100, spd: 100, spe: 80},
		abilities: {0: "Overgrow", H: "Chlorophyll"},
		heightm: 2,
		weightkg: 100,
		color: "Green",
		eggGroups: ["Monster", "Grass"],
	},
};