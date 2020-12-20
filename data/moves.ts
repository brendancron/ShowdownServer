export const Moves: {[moveid: string]: MoveData} = {
	hyperbeam: {
		num: 1,
		accuracy: 100,
		basePower: 150,
		category: "Special",
		name: "Hyper Beam",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			boosts: {
				spa: -2
			},
		},
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cool",
	},
	gigaimpact: {
		num: 2,
		accuracy: 100,
		basePower: 150,
		category: "Physical",
		name: "Giga Impact",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		recoil: [1, 2],
		secondary: null,
		target: "normal",
		type: "Normal",
		contestType: "Cool",
	},
	protect: {
		num: 3,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Protect",
		pp: 10,
		priority: 4,
		flags: {},
		stallingMove: true,
		volatileStatus: 'protect',
		onPrepareHit(pokemon) {
			return !!this.queue.willAct() && this.runEvent('StallMove', pokemon);
		},
		onHit(pokemon) {
			pokemon.addVolatile('stall');
		},
		condition: {
			duration: 1,
			onStart(target) {
				this.add('-singleturn', target, 'Protect');
			},
			onTryHitPriority: 3,
			onTryHit(target, source, move) {
				if (!move.flags['protect']) {
					if (move.isZ || (move.isMax && !move.breaksProtect)) target.getMoveHitData(move).zBrokeProtect = true;
					return;
				}
				if (move.smartTarget) {
					move.smartTarget = false;
				} else {
					this.add('-activate', target, 'move: Protect');
				}
				const lockedmove = source.getVolatile('lockedmove');
				if (lockedmove) {
					// Outrage counter is reset
					if (source.volatiles['lockedmove'].duration === 2) {
						delete source.volatiles['lockedmove'];
					}
				}
				return this.NOT_FAIL;
			},
		},
		secondary: null,
		target: "self",
		type: "Normal",
		contestType: "Cute",
	},
	rapidspin: {
		num: 4,
		accuracy: 100,
		basePower: 50,
		category: "Physical",
		name: "Rapid Spin",
		pp: 40,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		onAfterHit(target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
			}
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
		onAfterSubDamage(damage, target, pokemon) {
			if (pokemon.hp && pokemon.removeVolatile('leechseed')) {
				this.add('-end', pokemon, 'Leech Seed', '[from] move: Rapid Spin', '[of] ' + pokemon);
			}
			const sideConditions = ['spikes', 'toxicspikes', 'stealthrock', 'stickyweb', 'gmaxsteelsurge'];
			for (const condition of sideConditions) {
				if (pokemon.hp && pokemon.side.removeSideCondition(condition)) {
					this.add('-sideend', pokemon.side, this.dex.getEffect(condition).name, '[from] move: Rapid Spin', '[of] ' + pokemon);
				}
			}
			if (pokemon.hp && pokemon.volatiles['partiallytrapped']) {
				pokemon.removeVolatile('partiallytrapped');
			}
		},
		secondary: {
			chance: 100,
			self: {
				boosts: {
					spe: 1,
				},
			},
		},
		target: "normal",
		type: "Normal",
		contestType: "Cool",
	},
	inferno: {
		num: 5,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Inferno",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		self: {
			chance: 50,
			boosts: {
				atk: 1,
			},
		},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Cool",
	},
	heatwave: {
		num: 6,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Heat Wave",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		weather: 'sunnyday',
		secondary: null,
		target: "all",
		type: "Fire",
		contestType: "Beautiful",
	},
	willowisp: {
		num: 7,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Will-O-Wisp",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		status: 'brn',
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Beautiful",
	},
	blaze: {
		num: 8,
		accuracy: 100,
		basePower: 40,
		category: "Special",
		name: "Blaze",
		pp: 20,
		priority: 1,
		flags: {protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Fire",
		contestType: "Cool",
	},
	tsunami: {
		num: 9,
		accuracy: 100,
		basePower: 130,
		category: "Physical",
		name: "Tsunami",
		pp: 5,
		priority: 0,
		flags: {contact: 1, protect: 1, mirror: 1},
		self: {
			boosts: {
				atk: -2
			},
		},
		secondary: null,
		target: "normal",
		type: "Water",
		contestType: "Cool",
	},
	typhoon: {
		num: 10,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Typhoon",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		weather: 'RainDance',
		secondary: null,
		target: "all",
		type: "Fire",
		contestType: "Beautiful",
	},
	reflect: {
		num: 11,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Reflect",
		pp: 20,
		priority: 0,
		flags: {snatch: 1},
		sideCondition: 'reflect',
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasItem('lightclay')) {
					return 8;
				}
				return 5;
			},
			onAnyModifyDamage(damage, source, target, move) {
				if (target !== source && target.side === this.effectData.target && this.getCategory(move) === 'Physical') {
					if (!target.getMoveHitData(move).crit && !move.infiltrates) {
						this.debug('Reflect weaken');
						if (target.side.active.length > 1) return this.chainModify([0xAAC, 0x1000]);
						return this.chainModify(0.5);
					}
				}
			},
			onStart(side) {
				this.add('-sidestart', side, 'Reflect');
			},
			onResidualOrder: 21,
			onEnd(side) {
				this.add('-sideend', side, 'Reflect');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Water",
		contestType: "Clever",
	},
	lightscreen: {
		num: 12,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Light Screen",
		pp: 30,
		priority: 0,
		flags: {snatch: 1},
		sideCondition: 'lightscreen',
		condition: {
			duration: 5,
			durationCallback(target, source, effect) {
				if (source?.hasItem('lightclay')) {
					return 8;
				}
				return 5;
			},
			onAnyModifyDamage(damage, source, target, move) {
				if (target !== source && target.side === this.effectData.target && this.getCategory(move) === 'Special') {
					if (!target.getMoveHitData(move).crit && !move.infiltrates) {
						this.debug('Light Screen weaken');
						if (target.side.active.length > 1) return this.chainModify([0xAAC, 0x1000]);
						return this.chainModify(0.5);
					}
				}
			},
			onStart(side) {
				this.add('-sidestart', side, 'move: Light Screen');
			},
			onResidualOrder: 21,
			onResidualSubOrder: 1,
			onEnd(side) {
				this.add('-sideend', side, 'move: Light Screen');
			},
		},
		secondary: null,
		target: "allySide",
		type: "Water",
		contestType: "Beautiful",
	},
	thunder: {
		num: 13,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Thunder",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		onModifyMove(move, pokemon, target) {
			switch (target?.effectiveWeather()) {
			case 'raindance':
			case 'primordialsea':
				move.basePower = 120;
				break;
			case 'sunnyday':
			case 'desolateland':
				move.basePower = 60;
				break;
			}
		},
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	volttackle: {
		num: 14,
		accuracy: 100,
		basePower: 70,
		category: "Physical",
		name: "Volt Tackle",
		pp: 5,
		priority: 2,
		flags: {contact: 1, protect: 1, mirror: 1},
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	shockwave: {
		num: 15,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Shock Wave",
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		status: 'par',
		ignoreImmunity: false,
		secondary: null,
		target: "normal",
		type: "Electric",
		contestType: "Cool",
	},
	charge: {
		num: 16,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Charge",
		pp: 20,
		priority: 0,
		flags: {snatch: 1, dance: 1},
		boosts: {
			spa: 1,
			spe: 1,
		},
		secondary: null,
		target: "self",
		type: "Electric",
		contestType: "Cool",
	},
	gigadrain: {
		num: 17,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		name: "Giga Drain",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, heal: 1},
		drain: [1, 2],
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Clever",
	},
	solarbeam: {
		num: 18,
		accuracy: 100,
		basePower: 130,
		category: "Special",
		name: "Solar Beam",
		pp: 10,
		priority: 0,
		flags: {charge: 1, protect: 1, mirror: 1},
		onTryMove(attacker, defender, move) {
			if (attacker.removeVolatile(move.id)) {
				return;
			}
			this.add('-prepare', attacker, move.name);
			if (['sunnyday', 'desolateland'].includes(attacker.effectiveWeather())) {
				this.attrLastMove('[still]');
				this.addMove('-anim', attacker, move.name, defender);
				return;
			}
			if (!this.runEvent('ChargeMove', attacker, defender, move)) {
				return;
			}
			attacker.addVolatile('twoturnmove', defender);
			return null;
		},
		onBasePower(basePower, pokemon, target) {
			if (['raindance', 'primordialsea', 'sandstorm', 'hail'].includes(pokemon.effectiveWeather())) {
				this.debug('weakened by weather');
				return this.chainModify(0.5);
			}
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Cool",
	},
	leechseed: {
		num: 19,
		accuracy: 100,
		basePower: 0,
		category: "Status",
		name: "Leech Seed",
		pp: 10,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1},
		volatileStatus: 'leechseed',
		condition: {
			onStart(target) {
				this.add('-start', target, 'move: Leech Seed');
			},
			onResidualOrder: 8,
			onResidual(pokemon) {
				const target = this.effectData.source.side.active[pokemon.volatiles['leechseed'].sourcePosition];
				if (!target || target.fainted || target.hp <= 0) {
					this.debug('Nothing to leech into');
					return;
				}
				const damage = this.damage(pokemon.baseMaxhp / 8, pokemon, target);
				if (damage) {
					this.heal(damage, target, pokemon);
				}
			},
		},
		onTryImmunity(target) {
			return !target.hasType('Grass');
		},
		secondary: null,
		target: "normal",
		type: "Grass",
		contestType: "Clever",
	},
	aromatherapy: {
		num: 20,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Aromatherapy",
		pp: 5,
		priority: 0,
		flags: {snatch: 1, distance: 1},
		onHit(pokemon, source, move) {
			this.add('-activate', source, 'move: Aromatherapy');
			let success = false;
			for (const ally of pokemon.side.pokemon) {
				if (ally !== source && ((ally.hasAbility('sapsipper')) ||
						(ally.volatiles['substitute'] && !move.infiltrates))) {
					continue;
				}
				if (ally.cureStatus()) success = true;
			}
			return success;
		},
		target: "allyTeam",
		type: "Grass",
		contestType: "Clever",
	},
	avalanche: {
		num: 21,
		accuracy: 100,
		basePower: 25,
		category: "Physical",
		name: "Avalanche",
		pp: 10,
		priority: 0,
		flags: {bullet: 1, protect: 1, mirror: 1},
		multihit: [3, 5],
		secondary: null,
		target: "normal",
		type: "Ice",
		contestType: "Tough",
	},
	blizzard: {
		num: 10,
		accuracy: 100,
		basePower: 70,
		category: "Special",
		name: "Blizzard",
		pp: 5,
		priority: 0,
		flags: {protect: 1, mirror: 1},
		weather: 'hail',
		secondary: null,
		target: "all",
		type: "Ice",
		contestType: "Beautiful",
	},
};