exports.adjectives = [
    { name: 'rotten', effects: { damage: -2 } },
    { name: 'weak', effects: { damage: -1 } },
    { name: 'silver', effects: { damage: 2, weight: 1 } },
    { name: 'golden', effects: { damage: 3, weight: 1 } },
    { name: 'diamond', effects: { damage: 5 } },
    { name: 'platinum', effects: { damage: 6 } },
    { name: 'exalted', effects: { damage: 3, life: 10 } },
    { name: 'enchanted', effects: { damage: 7, life: 5 } },
    { name: 'fortified', effects: { defense: 3, weight: 2 } },
    { name: 'barbarous', effects: { damage: 7 } },
    { name: 'chemical', effects: { damage: 2, weight: -1 } },
    { name: 'defective', effects: { damage: -1, defense: -1 } },
    { name: 'elite', effects: { damage: 3, defense: 3 } },
    { name: 'jazzy', effects: { damage: 1, defense: 1, weight: -1 } },
    { name: 'quaint', effects: { weight: 1 } },
    { name: 'thundering', effects: { damage: 6 } },
    { name: 'voiceless', effects: { damage: -1 } },
    { name: 'wretched', effects: { damage: 3, defense: 2, weight: 1 } },
    { name: 'utopian', effects: { damage: 5, defense: 4, weight: -1 } },
    { name: 'adamant', effects: { damage: 12, defense: 6, weight: 3 } },
    { name: 'effulgent', effects: { defense: 3, weight: 2 } },
    { name: 'irksome', effects: { defense: 3, damage: -3, weight: 2 } },
    { name: 'tenacious', effects: { life: 5, damage: 2 } },
    { name: 'withering', effects: { life: -5, damage: 8, weight: 1 } }

];

exports.decorations = [
    { name: 'of strength', effects: { damage: 2, strength: { min: 5, max: 10 } } },
    { name: 'of intelligence', effects:  { damage: 1, intelligence: { min: 5, max: 10 } } },
    { name: 'of history', effects:  { history: { min: 5, max: 10 } } },
    { name: 'of agility', effects:  { agility: 1, intelligence: { min: 5, max: 10 } } },
    { name: 'of speed', effects:  { speed: { min: 5, max: 10 } } },
    { name: 'of endurance', effects:  { endurance: { min: 5, max: 10 } } },
    { name: 'of life', effects:  { life: { min: 20, max: 30 } } },
    { name: 'of bag space', effects:  { space: { min: 20, max: 50 } } }
];

exports.equipment = [
    { name: 'sword', slot: 'main', type: 'melee', weight: 2, value: 35, effects: { damage: 5 } },
    { name: 'javelin', slot: 'main', type: 'melee', weight: 1, value: 35, effects: { damage: 4 } },
    { name: 'staff', slot: 'main', type: 'magic', weight: 1, value: 40, effects: { damage: 4 } },
    { name: 'bow', slot: 'main', type: 'ranged', weight: 1, value: 38, effects: { damage: 4 } },
    { name: 'helm', slot: 'head', weight: 3, value: 25, effects: { defense: 2 } },
    { name: 'hood', slot: 'head', weight: 1, value: 20,  effects: { defense: 1 } },
    { name: 'crown', slot: 'head', weight: 1, value: 100, effects: { defense: 3 } },
    { name: 'spaulders', slot: 'shoulders', weight: 3, value: 20, effects: { defense: 2 } },
    { name: 'pauldrons', slot: 'shoulders', weight: 3, value: 30, effects: { defense: 3 } },
    { name: 'epaulets', slot: 'shoulders', weight: 2, value: 20, effects: { defense: 1 } },
    { name: 'tunic', slot: 'chest', weight: 1, value: 10, effects: { defense: 1 } },
    { name: 'coat', slot: 'chest', weight: 2, value: 20, effects: { defense: 4 } },
    { name: 'robe', slot: 'chest', weight: 5, value: 80, effects: { defense: 8 } },
    { name: 'cuirass', slot: 'chest', weight: 12, value: 120, effects: { defense: 14 } },
    { name: 'chainmail', slot: 'chest', weight: 14, value: 180, effects: { defense: 16 } },
    { name: 'harness', slot: 'chest', weight: 14, value: 140, effects: { defense: 15 } },
    { name: 'amulet', slot: 'neck', weight: 1, value: 280 },
    { name: 'shield', slot: 'off', type: 'melee', weight: 12, value: 100, effects: { defense: 8 } },
    { name: 'orb', slot: 'off', type: 'magic', weight: 2, value: 80, effects: { damage: 4 } },
    { name: 'quiver', slot: 'off', type: 'ranged', weight: 3, value: 90, effects: { damage: 4 } },
    { name: 'ring', slot: 'finger', weight: 0, value: 120 },
    { name: 'pants', slot: 'legs', weight: 2, value: 15, effects: { defense: 2 } },
    { name: 'leggings', slot: 'legs', weight: 2, value: 25, effects: { defense: 4 } },
    { name: 'shoes', slot: 'feet', weight: 1, value: 15, effects: { defense: 2 } },
    { name: 'sandals', slot: 'feet', weight: 1, value: 10, effects: { defense: 1 } },
    { name: 'boots', slot: 'legs', weight: 4, value: 30, effects: { defense: 4 } },
    { name: 'bag', slot: 'bag', weight: 0, value: 30, effects: { space: 100 } }
];

exports.consumables = [
    { name: 'potion of life', consumable: true, value: 10, effects: { life: 10 } }
];

// Quest items

exports.iCommon = [
    { name: 'some apples', gold: 2 },
    { name: 'some oranges', gold: 3 },
    { name: 'potatoes', gold: 2 },
    { name: 'a broom', gold: 3 },
    { name: 'an electric conductor', gold: 10 },
    { name: 'an old cartographer\'s map', gold: 20 },
    { name: 'some beetles', gold: 1 },
    { name: 'some paper', gold: 2 },
    { name: 'a wooden stick', gold: 3 },
    { name: 'a log', gold: 1 },
    { name: 'a wooden leg', gold: 6 },
    { name: 'a fine net', gold: 8 },
    { name: 'a new hat', gold: 2 },
    { name: 'a bear hat', gold: 3 },
    { name: 'a pair of shoes', gold: 1 },
    { name: 'some herbs', gold: 1 },
    { name: 'a chair', gold: 1 },
    { name: 'a burnt piece of chicken', gold: 1 },
    { name: 'food', gold: 2 },
    { name: 'a human bone', gold: 5, difficulty: 1 },
    { name: 'seven ducks', gold: 3 },
    { name: 'a cocktail shaker', gold: 6 }
];

exports.iExquisite = [
    { name: 'a lost golden necklace', gold: 30 },
    { name: 'a hexacore supercomputer', gold: 40  },
    { name: 'a lost silver necklace', gold: 20 },
    { name: 'silk robes', gold: 40 },
    { name: 'exquisite herbs', gold: 20 },
    { name: 'exotic herbs', gold: 30 },
    { name: 'some gin to drink', gold: 20 },
    { name: 'a bride', gold: 60 },
    { name: 'a golden sword', gold: 60 },
    { name: 'a golden dagger', gold: 50 },
    { name: 'sixty six friends', gold: 40 },
    { name: 'a hidden letter of the spouse', gold: 35 },
    { name: 'a telescope', gold: 40 },
    { name: 'an alembic', gold: 20 },
    { name: 'golden scales', gold: 40 }
];

exports.iUnique = [
    { name: 'sword of a thousand truths', gold: 100 },
    { name: 'uniqueItem', gold: 100 },
];

