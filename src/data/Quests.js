exports.meta = [
    { needs: ['QuestGiver', 'Items'], quest: '$QuestGiver asked if you could go find $Items', minLevel: 1, canLoot: true },
    { needs: ['QuestGiver', 'UniqueItem'], quest: '$QuestGiver wants you to find $UniqueItem', minLevel: 10, canLoot: true },
    { needs: ['QuestGiver', 'Monsters'], quest: '$QuestGiver wants you to kill some $Monsters', minLevel: 2, canLoot: true },
    { needs: ['QuestGiver', 'UniqueMonster'], quest: '$QuestGiver wants you to slay $UniqueMonster', minLevel: 12, canLoot: true },
    { needs: ['QuestGiver', 'Dungeon'], quest: '$QuestGiver requested you to clear $Dungeon', minLevel: 20, canLoot: true },
    { needs: ['QuestGiver', 'City'], quest: '$QuestGiver wants you as guard while traveling to $City', minLevel: 1, canLoot: true },
    { needs: ['QuestGiver', 'City'], quest: '$QuestGiver wants you to deliver a message in $City', minLevel: 1 },
    { needs: ['QuestGiver', 'City'], quest: '$QuestGiver needs a guard for his event in $City', minLevel: 30 },
    { needs: ['QuestGiver', 'Person'], quest: '$QuestGiver wants you to kill $Person', minLevel: 40, canLoot: true },
    { needs: ['QuestGiver'], quest: '$QuestGiver needs someone to train his/her son', minLevel: 30 }
];