# COF POWER DATABASE - COMPLETE SCHEMA
## Dr. LeFevre Classification System + Character Powers
### Updated: November 18, 2025

---

## YOUR POWER CLASSIFICATION SYSTEM (FOUND IT!)

### ORIGIN TYPES:
1. **Enhanced** - Genetically modified by Grays during abduction
2. **Symbiont** - Alien lifeform/consciousness bonded with human
3. **Sage** - Complete knowledge of one subject (no experience initially)
4. **Android/Artificial** - Technology-based or created beings

### THREAT LEVELS (Dr. LeFevre Scale):
- **Level 1** - Minimal (enhanced humans, basic physical)
- **Level 2** - Excellent (single power manifestation)
- **Level 3** - Remarkable (multiple powers or advanced single)
- **Level 4** - Impossible (breaks physics, reality-altering)
- **Level 5** - Existential Threat (ONLY 2 in universe - time travelers)

---

## POWER DATABASE SCHEMA (JSON FORMAT)

```json
{
  "character_id": "unique_identifier",
  "name": "Character Full Name",
  "alias": "Code name or alternate name",
  "country": "Nation of origin",
  "organization": "Affiliation",

  "power_classification": {
    "origin_type": "Enhanced | Symbiont | Sage | Artificial",
    "lefevre_level": "1 | 2 | 3 | 4 | 5",
    "threat_assessment": {
      "pcf": "Power Capacity Factor (0-10)",
      "stam": "Subjective Threat Assessment (0-10)",
      "spam": "Situational Power Assessment (0-10)"
    }
  },

  "powers": {
    "primary_ability": "Main power description",
    "secondary_abilities": ["List", "of", "additional", "powers"],

    "symbiont_details": {
      "creature_type": "If Symbiont: what merged with them",
      "partnership_quality": "Mutual | Forced | Evolving",
      "alien_name": "Name of symbiotic entity if applicable"
    },

    "sage_details": {
      "knowledge_domain": "If Sage: specific subject mastery",
      "experience_level": "Initial | Developing | Mastered"
    },

    "scaling": {
      "starting_power": "How powerful at beginning (1-10)",
      "current_power": "Current power level (1-10)",
      "maximum_potential": "Ceiling (1-10)",
      "growth_mechanism": "How power evolves/strengthens",
      "timeline": "When power peaks"
    },

    "limitations": [
      {
        "type": "Physical | Mental | Environmental | Situational",
        "description": "Specific weakness or limitation",
        "severity": "Minor | Moderate | Severe | Fatal"
      }
    ],

    "negatives": [
      {
        "cost": "What using the power costs",
        "consequence": "Long-term damage or effect",
        "progression": "Does it get worse over time?"
      }
    ]
  },

  "power_origin_story": {
    "before_powers": "Life before abduction/transformation",
    "transformation_event": "How they got powers",
    "first_manifestation": "When powers first appeared",
    "learning_curve": "How they learned to control it"
  },

  "story_arcs": {
    "year_1": "Role and power development",
    "year_2": "Evolution",
    "year_3": "Peak or crisis",
    "year_4_8": "Final arc"
  }
}
```

---

## EXISTING CHARACTERS - FULL POWER BREAKDOWN

### LEVEL 5: EXISTENTIAL THREAT (Only 2 in Universe)

#### 1. **ASHA (INDIA)**
```json
{
  "character_id": "asha",
  "name": "Asha",
  "country": "India",
  "organization": "Establishment 24",

  "power_classification": {
    "origin_type": "Enhanced",
    "lefevre_level": "5",
    "threat_assessment": {
      "pcf": 9.5,
      "stam": 7.0,
      "spam": 8.5
    }
  },

  "powers": {
    "primary_ability": "Time travel to the future ONLY",
    "secondary_abilities": [
      "Object retrieval from future timelines",
      "Future reconnaissance",
      "Temporal intangibility (ghost-like in future)"
    ],

    "scaling": {
      "starting_power": 10,
      "current_power": 10,
      "maximum_potential": 10,
      "growth_mechanism": "INVERSE - Gets weaker with each use",
      "timeline": "Peaked at acquisition, deteriorating"
    },

    "limitations": [
      {
        "type": "Temporal",
        "description": "Can ONLY go forward, never backward",
        "severity": "Fatal"
      },
      {
        "type": "Physical",
        "description": "Appears invisible/intangible in future",
        "severity": "Severe"
      },
      {
        "type": "Temporal",
        "description": "Can only stay 10-15 minutes in future",
        "severity": "Severe"
      },
      {
        "type": "Reality",
        "description": "CANNOT change timeline - snaps back if interferes",
        "severity": "Fatal"
      },
      {
        "type": "Physical",
        "description": "Touching people in future causes headache, pulls her back",
        "severity": "Moderate"
      }
    ],

    "negatives": [
      {
        "cost": "Severe migraines lasting days after each use",
        "consequence": "Gradual memory loss (past AND future)",
        "progression": "YES - Gets worse with every use"
      },
      {
        "cost": "Emotional instability, outbursts, mood swings",
        "consequence": "Paranoia, anxiety, questions reality",
        "progression": "YES - Slowly going insane"
      },
      {
        "cost": "Physical weakening, fatigue, muscle pain",
        "consequence": "Ghost-like existence makes her less human",
        "progression": "YES - Losing her humanity"
      },
      {
        "cost": "Frequent deja vu",
        "consequence": "Can't distinguish past/present/future memories",
        "progression": "YES - Reality blurring"
      }
    ]
  },

  "compelling_aspects": [
    "Starts at maximum power but DEGRADES with use",
    "Must choose between saving world and losing herself",
    "Ghost-like future travel creates existential horror",
    "Has two identical mongoose pets (brought one from future)",
    "Season 6: Travels back to her own past as 'stranger'"
  ]
}
```

#### 2. **ZEPHANIAH MWANGAZA (TANZANIA)** - DECEASED
```json
{
  "character_id": "zephaniah_mwangaza",
  "name": "Zephaniah Mwangaza",
  "country": "Tanzania",
  "organization": "Independent",
  "status": "DECEASED - Decapitated after betrayal",

  "power_classification": {
    "origin_type": "Enhanced",
    "lefevre_level": "5",
    "threat_assessment": {
      "pcf": 9.8,
      "stam": 9.0,
      "spam": 9.5
    }
  },

  "powers": {
    "primary_ability": "Time travel to the past",
    "secondary_abilities": [
      "Mind control",
      "Could control foes' minds",
      "Led military coup"
    ],

    "scaling": {
      "starting_power": 10,
      "current_power": 0,
      "maximum_potential": 10,
      "growth_mechanism": "N/A - Died before development",
      "timeline": "Died pre-Year 1"
    },

    "limitations": [
      {
        "type": "Unknown",
        "description": "Details lost with death",
        "severity": "Unknown"
      }
    ],

    "negatives": [
      {
        "cost": "Unknown",
        "consequence": "Assassinated before full power explored",
        "progression": "Unknown"
      }
    ]
  },

  "compelling_aspects": [
    "ONLY backward time traveler (Asha goes forward)",
    "Combination of time travel + mind control = unstoppable",
    "Betrayed and killed by own team member",
    "Death preserves 'only 2 time travelers' rule",
    "Warning potential before death unexplored"
  ]
}
```

---

### LEVEL 4: IMPOSSIBLE (Breaks Physics)

#### 3. **MOSES APIO (UGANDA)** - Best Scaling Example
```json
{
  "character_id": "moses_apio",
  "name": "Moses Apio",
  "country": "Uganda",
  "organization": "Hand of Uganda",
  "age": 20,

  "power_classification": {
    "origin_type": "Symbiont",
    "lefevre_level": "4",
    "threat_assessment": {
      "pcf": 2.7,
      "stam": 4.1,
      "spam": 6.3
    }
  },

  "powers": {
    "primary_ability": "Atlas Protocol - Ancient alien liquid weapon consciousness",
    "secondary_abilities": [
      "Shapeshifting liquid metal from bracelet",
      "Weapon formation (swords, shields, armor)",
      "Defensive structures",
      "Offensive projectiles",
      "Healing factor from alien partnership"
    ],

    "symbiont_details": {
      "creature_type": "Ancient alien liquid weapon consciousness",
      "partnership_quality": "Evolving from distrust to cooperation",
      "alien_name": "Atlas Protocol",
      "vessel": "Indonesian bracelet containing liquid alien"
    },

    "scaling": {
      "starting_power": 2,
      "current_power": 5,
      "maximum_potential": 10,
      "growth_mechanism": "Trust and cooperation with alien consciousness",
      "timeline": "Year 0: No powers → Year 1: Basic → Year 4+: Advanced"
    },

    "limitations": [
      {
        "type": "Environmental",
        "description": "Extreme cold makes alien consciousness sluggish",
        "severity": "Severe"
      },
      {
        "type": "Technological",
        "description": "Electromagnetic interference disrupts communication",
        "severity": "Moderate"
      },
      {
        "type": "Physical",
        "description": "Bracelet removal = complete power loss",
        "severity": "Fatal"
      },
      {
        "type": "Relational",
        "description": "Alien can refuse to cooperate",
        "severity": "Severe"
      },
      {
        "type": "Strategic",
        "description": "Must align with alien's agenda",
        "severity": "Moderate"
      }
    ],

    "negatives": [
      {
        "cost": "Initial: Alien doesn't trust him, barely responds",
        "consequence": "Failed spectacularly against Cato gang leader",
        "progression": "IMPROVES - Trust builds over time"
      },
      {
        "cost": "Range limitations (10m initially)",
        "consequence": "Cannot fight at distance",
        "progression": "IMPROVES - Eventually reaches 50m+"
      },
      {
        "cost": "Mental strain from alien presence",
        "consequence": "Headaches, fatigue when overused",
        "progression": "ADAPTS - Body acclimates"
      }
    ]
  },

  "power_origin_story": {
    "before_powers": "Normal mechanic student from Mbarara village",
    "transformation_event": "Abducted at Lake Victoria, given Indonesian bracelet",
    "first_manifestation": "Liquid barely extended from bracelet, failed to protect him",
    "learning_curve": "Year 1: Abandoned vigilante activities → Year 2-3: Training with Hand of Uganda"
  },

  "story_arcs": {
    "year_0": "Normal student, dreams of fixing things",
    "year_1": "Abduction, receives Atlas Protocol, initial failures",
    "year_2_3": "Training, learning cooperation with alien",
    "year_4_8": "Advanced combat, potential leadership, part of 3-piece galactic weapon system"
  },

  "compelling_aspects": [
    "PERFECT scaling example: Starts weak, grows through relationship",
    "Symbiont relationship = character development",
    "Part of larger 3-piece galactic weapon (mystery to explore)",
    "Failure at beginning makes growth satisfying",
    "Alien consciousness has own personality/agenda"
  ]
}
```

#### 4. **RAGHAVAN REDDY (INDIA)** - Establishment 24 Leader
```json
{
  "character_id": "raghavan_reddy",
  "name": "Colonel Raghavan Reddy",
  "alias": "Gourav (writer's old name)",
  "country": "India",
  "organization": "Establishment 24 - Leader",
  "age": 30,

  "power_classification": {
    "origin_type": "Symbiont",
    "lefevre_level": "4",
    "threat_assessment": {
      "pcf": 8.5,
      "stam": 6.0,
      "spam": 7.5
    }
  },

  "powers": {
    "primary_ability": "Divine Metamorphosis - Garuda transformation",
    "secondary_abilities": [
      "Golden armor (living plastic alien lifeform)",
      "Flight with gold wings",
      "Eagle/bird transformation",
      "Enhanced strength and durability",
      "Aerial combat mastery"
    ],

    "symbiont_details": {
      "creature_type": "Golden plastic lifeform (living armor)",
      "partnership_quality": "Mutual - God-like partnership",
      "alien_name": "Garuda Entity (based on Hindu mythology)"
    },

    "scaling": {
      "starting_power": 7,
      "current_power": 8,
      "maximum_potential": 9,
      "growth_mechanism": "Emotional state affects power level",
      "timeline": "Powerful from start, peaks during critical battles"
    },

    "limitations": [
      {
        "type": "Environmental",
        "description": "Loses powers when submerged in water",
        "severity": "Fatal"
      },
      {
        "type": "Physical",
        "description": "Gets tired after extended use (unusual for god-like being)",
        "severity": "Moderate"
      },
      {
        "type": "Psychological",
        "description": "Survivor's guilt affects performance",
        "severity": "Moderate"
      }
    ],

    "negatives": [
      {
        "cost": "Family died in bus crash that triggered transformation",
        "consequence": "Haunted by not saving wife Nitya Reddy",
        "progression": "Grief-driven, affects decision-making"
      },
      {
        "cost": "Die-hard patriot - India above all",
        "consequence": "Can be manipulated through nationalism",
        "progression": "Potentially becomes too rigid"
      }
    ]
  },

  "compelling_aspects": [
    "Garuda = Hindu mythology connection",
    "Gold wings visual = iconic",
    "Leads assassination squad (morally complex)",
    "Water weakness = strategic vulnerability",
    "Year 7: Volunteers for space suicide mission"
  ]
}
```

---

### LEVEL 3: REMARKABLE (Multiple Powers)

#### 5. **KAISER EZIOBI (NIGERIA)**
```json
{
  "character_id": "kaiser_eziobi",
  "name": "Kaiser Eziobi",
  "country": "Nigeria",
  "organization": "Independent (Exiled)",
  "age": 56,

  "power_classification": {
    "origin_type": "Symbiont",
    "lefevre_level": "3",
    "threat_assessment": {
      "pcf": 6.0,
      "stam": 7.5,
      "spam": 8.0
    }
  },

  "powers": {
    "primary_ability": "Collective Memory - Knowledge of the dead",
    "secondary_abilities": [
      "Memories of everyone alive in one specific moment",
      "Geographic limit: Within Zuma Rock radius",
      "Super wisdom from thousands of lifetimes",
      "Strategic foresight from collective experience"
    ],

    "symbiont_details": {
      "creature_type": "Life Form 0 - Slug creature",
      "partnership_quality": "Forced merger during helicopter crash",
      "alien_name": "Life Form 0"
    },

    "scaling": {
      "starting_power": 5,
      "current_power": 7,
      "maximum_potential": 8,
      "growth_mechanism": "Learns to process collective memories without overwhelm",
      "timeline": "Year 0: Crash → Year 6: Assassinated"
    },

    "limitations": [
      {
        "type": "Geographic",
        "description": "Only works within Zuma Rock radius",
        "severity": "Severe"
      },
      {
        "type": "Temporal",
        "description": "Memories of the dead, not the living",
        "severity": "Moderate"
      },
      {
        "type": "Psychological",
        "description": "Haunted by death memories constantly",
        "severity": "Severe"
      }
    ],

    "negatives": [
      {
        "cost": "Betrayed best friend Justus (10-year friendship)",
        "consequence": "Guilt-ridden, replays last meeting daily",
        "progression": "Emotional burden worsens"
      },
      {
        "cost": "Stopped believing in anything years ago",
        "consequence": "Goes through motions of prayer without faith",
        "progression": "Spiritual emptiness"
      },
      {
        "cost": "Igbo identity struggles (born in Lagos, Yoruba territory)",
        "consequence": "Accepted by neither culture",
        "progression": "Isolation"
      },
      {
        "cost": "Struggles with possible homosexuality",
        "consequence": "Betrayed Justus partly to 'stand with straight people'",
        "progression": "Internalized homophobia"
      }
    ]
  },

  "compelling_aspects": [
    "56 years old - older protagonist",
    "Complex identity struggles (ethnic + sexual)",
    "Betrayal of Justus = moral complexity",
    "Collective memory = strategic asset in war",
    "Year 6: ASSASSINATED by America for taunting them",
    "Becomes martyr, almost starts US-Nigeria war"
  ]
}
```

---

### LEVEL 2-3: SYMBIONT (Muo Spheres)

#### 6. **LIU XIAO (CHINA)**
```json
{
  "character_id": "liu_xiao",
  "name": "Liu Xiao",
  "country": "China",
  "organization": "Protector of China (CCP-designated)",
  "age": 49,

  "power_classification": {
    "origin_type": "Symbiont",
    "lefevre_level": "3",
    "threat_assessment": {
      "pcf": 7.5,
      "stam": 5.5,
      "spam": 8.5
    }
  },

  "powers": {
    "primary_ability": "Muo Sphere Control - Power granting",
    "secondary_abilities": [
      "Enhanced healing (from Mother Muo)",
      "Heightened hearing",
      "Can see in dark",
      "CURED BLINDNESS",
      "Command basketball-sized alien Muo Spheres",
      "Muo Spheres attach to others, grant temporary RANDOM superpowers"
    ],

    "symbiont_details": {
      "creature_type": "Mother Muo + Multiple Muo Spheres",
      "partnership_quality": "Mother Muo in cerebral cortex (permanent), Muo Spheres (psionically bonded)",
      "alien_name": "Mother Muo (implant), Muo Spheres (6-foot tentacled aliens)"
    },

    "scaling": {
      "starting_power": 6,
      "current_power": 7,
      "maximum_potential": 8,
      "growth_mechanism": "Number of Muo Spheres increases, control improves",
      "timeline": "Year 1: 3-5 Muos → Year 6: Potentially dozens"
    },

    "limitations": [
      {
        "type": "Proximity",
        "description": "Muo Spheres most comfortable within 20 feet",
        "severity": "Moderate"
      },
      {
        "type": "Randomness",
        "description": "Cannot control WHAT power the Muo gives someone",
        "severity": "Severe"
      },
      {
        "type": "Temporary",
        "description": "Powers disappear when Muo detaches",
        "severity": "Moderate"
      },
      {
        "type": "Environmental - CRITICAL",
        "description": "Muo Spheres PANIC near nanites (Iron Eaters)",
        "severity": "FATAL"
      }
    ],

    "negatives": [
      {
        "cost": "Sister taken by CCP years ago for having Muo Spheres",
        "consequence": "Liu hid while authorities took her, haunted by cowardice",
        "progression": "Guilt-driven loyalty to CCP"
      },
      {
        "cost": "Enhanced healing leads to cigarette addiction",
        "consequence": "Smokes constantly because he can heal the damage",
        "progression": "Physical dependency"
      },
      {
        "cost": "CATASTROPHIC: Muos near Iron Eaters = Muo death",
        "consequence": "Dead Muos emit BLACK POWDER → BRAIN-EATING NANOVIRUS",
        "progression": "Year 5: Liu deploys Muos in war → Creates plague"
      },
      {
        "cost": "2nd most popular man in China (after President)",
        "consequence": "Constant surveillance, propaganda tool",
        "progression": "Loss of freedom"
      }
    ]
  },

  "power_origin_story": {
    "before_powers": "49-year-old BLIND masseuse in Beijing massage parlor",
    "transformation_event": "Son Lee didn't pick him up, walked home in rain, abducted by Grays",
    "first_manifestation": "Woke up days later, Muo Spheres rising from mud, giving random people temporary powers",
    "learning_curve": "CCP studied him for months, then made him 'Protector of China'"
  },

  "story_arcs": {
    "year_0": "Blind masseuse, simple life",
    "year_1": "Abduction, transformation, CCP control",
    "year_2_4": "Protector of China, game show involvement",
    "year_5": "Deploys Muos against Iron Eaters → NANOVIRUS CREATED",
    "year_6": "Decision: Join moon rebellion or stay loyal to CCP?"
  },

  "compelling_aspects": [
    "Was BLIND - transformation cured him (massive character moment)",
    "Can give others powers but can't control WHAT power",
    "Muo Spheres have personalities and temperaments",
    "Make humming sounds, like alien pets",
    "CRITICAL PLOT: Muo + Iron Eater = Apocalyptic nanovirus",
    "Loyalty pattern: Further back in time, more loyal to government",
    "Chinese time traveler discovers this by going into his past"
  ]
}
```

---

## POWER SELECTION CRITERIA (Based on Your Universe)

### ✅ COMPELLING POWERS MUST HAVE:

1. **CLEAR LIMITATIONS**
   - Environmental (water, cold, EM interference)
   - Relational (symbiont refuses, must cooperate)
   - Geographic (radius limits)
   - Temporal (time limits, cooldowns)

2. **MEANINGFUL NEGATIVES**
   - Physical cost (migraines, fatigue, addiction)
   - Mental cost (memory loss, insanity, guilt)
   - Emotional cost (isolation, grief, paranoia)
   - Social cost (surveillance, loss of freedom)

3. **SCALING POTENTIAL**
   - **Growth Option A:** Starts weak, grows through experience/relationship
   - **Growth Option B:** Starts strong, DEGRADES with use (Asha model)
   - **Growth Option C:** Constant power, learns new applications (Sage model)

4. **STORY INTEGRATION**
   - Power connects to character backstory (Liu's blindness cured)
   - Power creates plot consequences (Muo + Iron Eater = virus)
   - Power has strategic value in war (collective memory, time travel)
   - Power creates moral dilemmas (assassination ability, mind control)

5. **SYMBIONT RELATIONSHIPS** (If applicable)
   - Alien partner has own personality
   - Partnership quality affects power
   - Potential for betrayal or sacrifice
   - Visual/physical manifestation (bracelet, armor, spheres)

### ❌ AVOID:

- Generic "elemental manipulation" without unique twist
- Powers with no clear weaknesses
- Powers that can't be countered
- Powers that don't scale or change
- Powers with no emotional/physical cost
- Powers disconnected from alien origin story

---

## NEXT STEPS FOR YOUR POWER DATABASE

### What We Need to Complete:

1. **6 More Establishment 24 Core Agents**
   - Need: Names, powers, symbiont details
   - Should represent different origin types
   - Should have diverse limitations

2. **Unnamed Chinese Time Traveler**
   - Name
   - Level 5 classification
   - Can travel to PAST (opposite of Asha)
   - Limitations and negatives

3. **Sages** (Year 2 Reveal)
   - List of knowledge domains
   - Which countries have them
   - How they're weaponized

4. **Additional LSWs from Underrepresented Regions**
   - South America
   - Middle East
   - Southeast Asia
   - North Africa

5. **Power Interaction Rules**
   - What happens when X meets Y?
   - Power counters and synergies
   - Forbidden combinations

---

## JSON DATABASE STRUCTURE

We should build:
```
C:\git\COF\database\
  ├── characters.json (existing - needs power detail expansion)
  ├── powers.json (new - all powers catalogued)
  ├── symbionts.json (new - all alien entities)
  ├── limitations.json (new - all known weaknesses)
  └── power_interactions.json (new - how powers interact)
```

**Want me to:**
1. Expand the existing characters.json with full power details?
2. Create the new database files?
3. Build a power selection tool using Superpower Wiki + your rules?
4. Propose 6 new E24 members with compelling powers?

**What's your priority?**
