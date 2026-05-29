window.SAX_SCHEMA = {
  "instrument": "Saxophone",
  "types": [
    "Alto",
    "Tenor"
  ],
  "total_keys": 23,
  "version": "3.0",
  "description": "Standard alto/tenor saxophone fingering chart. Key presses are identical on both instruments; written pitch differs by transposition (Eb alto, Bb tenor).",
  "pitch_notation": "Scientific pitch (e.g. Bb3, C5). Middle C = C4.",
  "registers": {
    "low": "Written notes below D, using pinky spatula keys (Low Bb through Low C#).",
    "main": "First register without octave key (D through B). Labeled D1, Eb1, … B1 in method books.",
    "middle": "Throat register without full octave stack (middle C and C#). Labeled C2, C#2.",
    "upper": "Octave-key register (D through C#). Labeled D2, Eb2, … C#3.",
    "palm": "Palm-key and altissimo range (High D and above)."
  },
  "key_legend": {
    "8ve": {
      "name": "Octave key",
      "hand": "left_thumb",
      "location": "Back of horn, operated by left thumb",
      "chart_alias": "octave"
    },
    "Aux": {
      "name": "Auxiliary key (Front F#)",
      "hand": "left",
      "location": "Front/top of body; opens alternate F# vent",
      "chart_alias": "frontF",
      "notes": "Listed for completeness; not used in primary fingerings below."
    },
    "L1": {
      "name": "Left hand 1 (index)",
      "hand": "left",
      "location": "Main stack, top pearl",
      "chart_alias": "lh1"
    },
    "Bis": {
      "name": "Bis Bb key",
      "hand": "left",
      "location": "Small key between L1 and palm keys",
      "chart_alias": "bis"
    },
    "L2": {
      "name": "Left hand 2 (middle)",
      "hand": "left",
      "location": "Main stack, middle pearl",
      "chart_alias": "lh2"
    },
    "L3": {
      "name": "Left hand 3 (ring)",
      "hand": "left",
      "location": "Main stack, bottom pearl",
      "chart_alias": "lh3"
    },
    "R1": {
      "name": "Right hand 1 (index)",
      "hand": "right",
      "location": "Main stack, top pearl",
      "chart_alias": "rh1"
    },
    "R2": {
      "name": "Right hand 2 (middle)",
      "hand": "right",
      "location": "Main stack, middle pearl",
      "chart_alias": "rh2"
    },
    "R3": {
      "name": "Right hand 3 (ring)",
      "hand": "right",
      "location": "Main stack, bottom pearl",
      "chart_alias": "rh3"
    },
    "C1": {
      "name": "Palm D",
      "hand": "left",
      "location": "Upper palm cluster, lowest palm key",
      "chart_alias": "palmD"
    },
    "C2": {
      "name": "Palm Eb",
      "hand": "left",
      "location": "Upper palm cluster, middle palm key",
      "chart_alias": "palmE"
    },
    "C4": {
      "name": "Palm F",
      "hand": "left",
      "location": "Upper palm cluster, highest palm key",
      "chart_alias": "palmF"
    },
    "C3": {
      "name": "Side Eb (Side E)",
      "hand": "left",
      "location": "Left side cluster, top key",
      "chart_alias": "sideE"
    },
    "TC": {
      "name": "Side C (Table C)",
      "hand": "left",
      "location": "Left side cluster, middle key",
      "chart_alias": "sideC"
    },
    "TA": {
      "name": "Side Bb",
      "hand": "left",
      "location": "Left side cluster, bottom key",
      "chart_alias": "sideBb"
    },
    "C5": {
      "name": "Side F# (High F#)",
      "hand": "left",
      "location": "Lower-left fork F# key",
      "chart_alias": "highFSharp"
    },
    "TF": {
      "name": "Front F (Top F)",
      "hand": "left",
      "location": "Front/top of body",
      "chart_alias": "frontF"
    },
    "G_sharp": {
      "name": "G# spatula",
      "hand": "left_pinky",
      "location": "Left pinky table, top",
      "chart_alias": "spatTop"
    },
    "B_low": {
      "name": "Low B spatula",
      "hand": "left_pinky",
      "location": "Left pinky table",
      "chart_alias": "spatLeft"
    },
    "C_sharp_low": {
      "name": "Low C# spatula",
      "hand": "left_pinky",
      "location": "Left pinky table",
      "chart_alias": "spatRight"
    },
    "Bb_low": {
      "name": "Low Bb spatula",
      "hand": "left_pinky",
      "location": "Left pinky table, bottom",
      "chart_alias": "spatLow"
    },
    "Eb_low": {
      "name": "Low Eb key",
      "hand": "right_pinky",
      "location": "Right pinky table, top",
      "chart_alias": "lowB"
    },
    "C_low": {
      "name": "Low C key",
      "hand": "right_pinky",
      "location": "Right pinky table, bottom",
      "chart_alias": "lowBb"
    }
  },
  "key_map_order": {
    "octave": [
      "8ve"
    ],
    "left_hand_main": [
      "Aux",
      "L1",
      "Bis",
      "L2",
      "L3"
    ],
    "right_hand_main": [
      "R1",
      "R2",
      "R3"
    ],
    "palm_keys": [
      "C1",
      "C2",
      "C4"
    ],
    "side_keys": [
      "C3",
      "TC",
      "TA",
      "C5",
      "TF"
    ],
    "left_pinky": [
      "G_sharp",
      "B_low",
      "C_sharp_low",
      "Bb_low"
    ],
    "right_pinky": [
      "Eb_low",
      "C_low"
    ]
  },
  "fingerings": [
    {
      "note": "Bb3",
      "display_label": "Low Bb",
      "register": "low",
      "register_label": "Low Bb",
      "pressed_keys": [
        "L1",
        "L2",
        "L3",
        "R1",
        "R2",
        "R3",
        "G_sharp",
        "B_low",
        "C_sharp_low",
        "Bb_low",
        "C_low"
      ]
    },
    {
      "note": "B3",
      "display_label": "Low B",
      "register": "low",
      "register_label": "Low B",
      "pressed_keys": [
        "L1",
        "L2",
        "L3",
        "R1",
        "R2",
        "R3",
        "B_low",
        "C_low"
      ]
    },
    {
      "note": "C4",
      "display_label": "Low C",
      "register": "low",
      "register_label": "Low C",
      "pressed_keys": [
        "L1",
        "L2",
        "L3",
        "R1",
        "R2",
        "R3",
        "C_low"
      ]
    },
    {
      "note": "C#4",
      "display_label": "Low C#",
      "register": "low",
      "register_label": "Low C#",
      "pressed_keys": [
        "L1",
        "L2",
        "L3",
        "R1",
        "R2",
        "R3",
        "C_sharp_low"
      ]
    },
    {
      "note": "D4",
      "display_label": "D",
      "register": "main",
      "register_label": "D1",
      "pressed_keys": [
        "L1",
        "L2",
        "L3",
        "R1",
        "R2",
        "R3"
      ]
    },
    {
      "note": "Eb4",
      "display_label": "Eb",
      "register": "main",
      "register_label": "Eb1",
      "pressed_keys": [
        "L1",
        "L2",
        "L3",
        "R1",
        "R2",
        "R3",
        "Eb_low"
      ]
    },
    {
      "note": "E4",
      "display_label": "E",
      "register": "main",
      "register_label": "E1",
      "pressed_keys": [
        "L1",
        "L2",
        "L3",
        "R1",
        "R2"
      ]
    },
    {
      "note": "F4",
      "display_label": "F",
      "register": "main",
      "register_label": "F1",
      "pressed_keys": [
        "L1",
        "L2",
        "L3",
        "R1"
      ]
    },
    {
      "note": "F#4",
      "display_label": "F#",
      "register": "main",
      "register_label": "F#1",
      "pressed_keys": [
        "L1",
        "L2",
        "L3",
        "R2"
      ]
    },
    {
      "note": "G4",
      "display_label": "G",
      "register": "main",
      "register_label": "G1",
      "pressed_keys": [
        "L1",
        "L2",
        "L3"
      ]
    },
    {
      "note": "G#4",
      "display_label": "G#",
      "register": "main",
      "register_label": "G#1",
      "pressed_keys": [
        "L1",
        "L2",
        "L3",
        "G_sharp"
      ]
    },
    {
      "note": "A4",
      "display_label": "A",
      "register": "main",
      "register_label": "A1",
      "pressed_keys": [
        "L1",
        "L2"
      ]
    },
    {
      "note": "Bb4",
      "display_label": "Bb (Bis)",
      "register": "main",
      "register_label": "Bb1",
      "pressed_keys": [
        "L1",
        "Bis"
      ],
      "alternatives": [
        {
          "name": "Side",
          "display_label": "Bb (Side)",
          "register_label": "Bb1 (Side)",
          "pressed_keys": [
            "L1",
            "TA"
          ]
        }
      ]
    },
    {
      "note": "B4",
      "display_label": "B",
      "register": "main",
      "register_label": "B1",
      "pressed_keys": [
        "L1"
      ]
    },
    {
      "note": "C5",
      "display_label": "C",
      "register": "middle",
      "register_label": "C2",
      "pressed_keys": [
        "L2"
      ],
      "alternatives": [
        {
          "name": "Side",
          "display_label": "C (Side)",
          "register_label": "C2 (Side)",
          "pressed_keys": [
            "L1",
            "TC"
          ]
        }
      ]
    },
    {
      "note": "C#5",
      "display_label": "C#",
      "register": "middle",
      "register_label": "C#2",
      "pressed_keys": []
    },
    {
      "note": "D5",
      "display_label": "D",
      "register": "upper",
      "register_label": "D2",
      "pressed_keys": [
        "8ve",
        "L1",
        "L2",
        "L3",
        "R1",
        "R2",
        "R3"
      ]
    },
    {
      "note": "Eb5",
      "display_label": "Eb",
      "register": "upper",
      "register_label": "Eb2",
      "pressed_keys": [
        "8ve",
        "L1",
        "L2",
        "L3",
        "R1",
        "R2",
        "R3",
        "Eb_low"
      ]
    },
    {
      "note": "E5",
      "display_label": "E",
      "register": "upper",
      "register_label": "E2",
      "pressed_keys": [
        "8ve",
        "L1",
        "L2",
        "L3",
        "R1",
        "R2"
      ]
    },
    {
      "note": "F5",
      "display_label": "F",
      "register": "upper",
      "register_label": "F2",
      "pressed_keys": [
        "8ve",
        "L1",
        "L2",
        "L3",
        "R1"
      ]
    },
    {
      "note": "F#5",
      "display_label": "F#",
      "register": "upper",
      "register_label": "F#2",
      "pressed_keys": [
        "8ve",
        "L1",
        "L2",
        "L3",
        "R2"
      ]
    },
    {
      "note": "G5",
      "display_label": "G",
      "register": "upper",
      "register_label": "G2",
      "pressed_keys": [
        "8ve",
        "L1",
        "L2",
        "L3"
      ]
    },
    {
      "note": "G#5",
      "display_label": "G#",
      "register": "upper",
      "register_label": "G#2",
      "pressed_keys": [
        "8ve",
        "L1",
        "L2",
        "L3",
        "G_sharp"
      ]
    },
    {
      "note": "A5",
      "display_label": "A",
      "register": "upper",
      "register_label": "A2",
      "pressed_keys": [
        "8ve",
        "L1",
        "L2"
      ]
    },
    {
      "note": "Bb5",
      "display_label": "Bb",
      "register": "upper",
      "register_label": "Bb2",
      "pressed_keys": [
        "8ve",
        "L1",
        "Bis"
      ]
    },
    {
      "note": "B5",
      "display_label": "B",
      "register": "upper",
      "register_label": "B2",
      "pressed_keys": [
        "8ve",
        "L1"
      ]
    },
    {
      "note": "C6",
      "display_label": "C",
      "register": "upper",
      "register_label": "C3",
      "pressed_keys": [
        "8ve",
        "L2"
      ]
    },
    {
      "note": "C#6",
      "display_label": "C#",
      "register": "upper",
      "register_label": "C#3",
      "pressed_keys": [
        "8ve"
      ]
    },
    {
      "note": "D6",
      "display_label": "High D",
      "register": "palm",
      "register_label": "High D",
      "pressed_keys": [
        "8ve",
        "C1"
      ]
    },
    {
      "note": "Eb6",
      "display_label": "High Eb",
      "register": "palm",
      "register_label": "High Eb",
      "pressed_keys": [
        "8ve",
        "C1",
        "C2"
      ]
    },
    {
      "note": "E6",
      "display_label": "High E",
      "register": "palm",
      "register_label": "High E",
      "pressed_keys": [
        "8ve",
        "C1",
        "C2",
        "C4",
        "C3"
      ]
    },
    {
      "note": "F6",
      "display_label": "High F",
      "register": "palm",
      "register_label": "High F",
      "pressed_keys": [
        "8ve",
        "C1",
        "C2",
        "C4"
      ]
    },
    {
      "note": "F#6",
      "display_label": "High F#",
      "register": "palm",
      "register_label": "High F#",
      "pressed_keys": [
        "8ve",
        "C1",
        "C2",
        "C4",
        "C5"
      ]
    },
    {
      "note": "G6",
      "display_label": "High G",
      "register": "palm",
      "register_label": "High G",
      "pressed_keys": [
        "8ve",
        "C1",
        "C2",
        "C4",
        "C3",
        "TA"
      ],
      "alternatives": [
        {
          "name": "Front F",
          "display_label": "High G (Front F)",
          "register_label": "High G (Front F)",
          "pressed_keys": [
            "8ve",
            "C1",
            "C2",
            "C4",
            "TF"
          ]
        }
      ]
    },
    {
      "note": "G#6",
      "display_label": "High G#",
      "register": "palm",
      "register_label": "High G#",
      "pressed_keys": [
        "8ve",
        "C1",
        "C2",
        "C4",
        "C5",
        "G_sharp"
      ]
    },
    {
      "note": "A6",
      "display_label": "High A",
      "register": "palm",
      "register_label": "High A",
      "pressed_keys": [
        "8ve",
        "C1",
        "C2",
        "C4",
        "C5",
        "TA"
      ]
    },
    {
      "note": "Bb6",
      "display_label": "High Bb",
      "register": "palm",
      "register_label": "High Bb",
      "pressed_keys": [
        "8ve",
        "C1",
        "C2",
        "C4",
        "C3",
        "C5"
      ]
    }
  ]
};
