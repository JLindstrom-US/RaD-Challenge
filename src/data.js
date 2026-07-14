export const STORAGE_KEY = 'rad-progress-v1'

export const defaultSubclassUnlocks = {
  Solar: false,
  Arc: false,
  Void: false,
  Stasis: false,
  Strand: false,
  Prismatic: false
}

export const defaultExotics = {
  weaponCount: 0,
  armorCount: 0,
  dismantledCount: 0,
  dualDestinyCount: 0
}

export const defaultProgress = {
  completions: {},
  unlocks: {},
  subclassUnlocks: defaultSubclassUnlocks,
  freeSubclassName: null,
  exotics: defaultExotics,
  pointOverrideEnabled: false,
  pointOverrideValue: 0,
  selectedDifficulty: 'Easy',
  selectedRuleset: 'default'
}

export const raids = [
  { name: 'Last Wish', marks: 2 },
  { name: 'Garden of Salvation', marks: 2 },
  { name: 'Deep Stone Crypt - Normal', marks: 2 },
  { name: 'Deep Stone Crypt - Master', marks: 3 },
  { name: 'Vault of Glass - Normal', marks: 2 },
  { name: 'Vault of Glass - Master', marks: 3 },
  { name: 'Vow of the Disciple - Normal', marks: 2 },
  { name: 'Vow of the Disciple - Master', marks: 3 },
  { name: "King's Fall - Normal", marks: 2 },
  { name: "King's Fall - Master", marks: 3 },
  { name: 'Root of Nightmares - Normal', marks: 2 },
  { name: 'Root of Nightmares - Master', marks: 3 },
  { name: "Crota's End - Normal", marks: 2 },
  { name: "Crota's End - Master", marks: 3 },
  { name: "Salvation's Edge - Normal", marks: 2 },
  { name: "Salvation's Edge - Master", marks: 3 },
  { name: 'Deserted Perpetual - Normal', marks: 2 },
  { name: 'Deserted Perpetual - Master', marks: 3 }
]

export const dungeons = [
  { name: 'The Shattered Throne', marks: 1 },
  { name: 'Pit of Heresy', marks: 1 },
  { name: 'Prophecy', marks: 1 },
  { name: 'Grasp of Avarice - Normal', marks: 1 },
  { name: 'Grasp of Avarice - Master', marks: 2 },
  { name: 'Duality - Normal', marks: 1 },
  { name: 'Duality - Master', marks: 2 },
  { name: 'Spire of the Watcher - Normal', marks: 1 },
  { name: 'Spire of the Watcher - Master', marks: 2 },
  { name: 'Ghosts of the Deep - Normal', marks: 1 },
  { name: 'Ghosts of the Deep - Master', marks: 2 },
  { name: "Warlord's Ruin - Normal", marks: 1 },
  { name: "Warlord's Ruin - Master", marks: 2 },
  { name: "Vesper's Host - Normal", marks: 1 },
  { name: "Vesper's Host - Master", marks: 2 },
  { name: 'Sundered Doctrine - Normal', marks: 1 },
  { name: 'Sundered Doctrine - Master', marks: 2 },
  { name: 'Equilibrium - Normal', marks: 1 },
  { name: 'Equilibrium - Master', marks: 2 }
]

export const allActivities = [...raids, ...dungeons]

export const rules = {
  default: [
    'No Vault Allowed. Start with White Rarity Gear from Collections.',
    'You can only use Raid and Dungeon Drops. No World Drops, Including Exotics.',
    'No Checkpoints, Full Clears Only.',
    'You may use any Exotic Armor or Weapons from Collections.'
  ],
  expert: [
    'No Vault Allowed. Start with White Rarity Gear from Collections.',
    'You can only use Raid and Dungeon Drops. No World Drops, Including Exotics.',
    'No Checkpoints, Full Clears Only.',
    'First Subclass is Free. No Aspect or Fragment Slots until Redeemed. Cannot use Prismatic until Redeemed.',
    'No Relic Perks Allowed until Redeemed.',
    'Exotic Access Unlocks once All Gear Slots are Tier 5.'
  ]
}

export const goals = [
  {
    tier: 'Easy',
    title: 'Complete Each Dungeon Solo without Dying',
    description:
      'Complete every dungeon solo without dying on any difficulty. Deathless completions do not have to be back-to-back.'
  },
  {
    tier: 'Medium',
    title: 'Complete Each Raid and Dungeon without Dying',
    description:
      'Complete every dungeon and raid without dying on any difficulty. Deathless completions do not have to be back-to-back.'
  },
  {
    tier: 'Hard',
    title: 'Complete All Pantheons without Dying',
    description:
      'Complete all 3 Pantheons without dying on default difficulty. Deathless completions must be back-to-back.'
  },
  {
    tier: 'Impossible',
    title: 'Complete All Dungeons Solo without Dying',
    description:
      'Complete all dungeons solo without dying on any difficulty. Deathless completions must be back-to-back.'
  }
]

export const unlockGroups = {
  relics: [
    { name: 'Tier 1', cost: 3 },
    { name: 'Tier 1', cost: 3 },
    { name: 'Tier 2', cost: 5 },
    { name: 'Tier 2', cost: 5 },
    { name: 'Tier 2', cost: 5 },
    { name: 'Tier 3', cost: 10 },
    { name: 'Tier 3', cost: 10 }
  ],
  subclasses: [
    { name: 'Solar' },
    { name: 'Arc' },
    { name: 'Void' },
    { name: 'Stasis' },
    { name: 'Strand' },
    { name: 'Prismatic' }
  ],
  aspects: [
    { name: 'Aspect 1', cost: 5 },
    { name: 'Aspect 2', cost: 5 }
  ],
  fragments: [
    { name: 'Fragment 1', cost: 3 },
    { name: 'Fragment 2', cost: 3 },
    { name: 'Fragment 3', cost: 3 },
    { name: 'Fragment 4', cost: 3 },
    { name: 'Fragment 5', cost: 3 },
    { name: 'Fragment 6', cost: 3 }
  ]
}