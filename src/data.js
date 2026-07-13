export const STORAGE_KEY = 'rad-progress-v1'

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
    'Must be a "Fresh" Character — no vault allowed. Start with white rarity gear from Collections.',
    'You can only use raid and dungeon drops. No world drops.',
    'No checkpoints. Full clears only.',
    'You may use any exotic armor or weapons from Collections.'
  ],
  expert: [
    'Must be a "Fresh" Character — no vault allowed. Start with white rarity gear from Collections.',
    'You can only use raid and dungeon drops. No world drops.',
    'No checkpoints. Full clears only.',
    'First subclass is free. No aspect or fragment slots until redeemed. Cannot use Prismatic until redeemed.',
    'No relic perks allowed until redeemed.',
    'Exotic access unlocks once all gear slots are Tier 5.'
  ]
}

export const goals = [
  {
    tier: 'Easy',
    title: 'Complete each dungeon solo without dying',
    description: 'Complete every dungeon solo without dying on any difficulty. Deathless completions do not have to be back-to-back.'
  },
  {
    tier: 'Medium',
    title: 'Complete each raid and dungeon without dying',
    description: 'Complete every dungeon and raid without dying on any difficulty. Deathless completions do not have to be back-to-back.'
  },
  {
    tier: 'Hard',
    title: 'Complete all Pantheons without dying',
    description: 'Complete all 3 Pantheons without dying on default difficulty. Deathless completions must be completed back-to-back.'
  },
  {
    tier: 'Impossible',
    title: 'Complete all dungeons solo without dying',
    description: 'Complete all dungeons solo without dying on any difficulty. Deathless completions must be completed back-to-back.'
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