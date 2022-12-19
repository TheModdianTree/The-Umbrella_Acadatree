addLayer("L", {
  name: "luther", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "L", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() {
    return {
      unlocked: true,
      points: new Decimal(0),
    };
  },
  milestones: {
    0: {
      requirementDescription: "100 Luther's Strength",
      effectDescription:
        "Get 1% of passive generation from Luther's Strength every second.",
      done() {
        return player.L.points.gte(100);
      },
    },
    1: {
      requirementDescription: "1000 Luther's Strength",
      effectDescription:
        "Get 5% of passive generation from Luther's Strength every second.",
      done() {
        return player.L.points.gte(1000);
      },
    },
  },
  tabFormat: {
    "Main tab": {
      content: [
        "infoboxes",
        "main-display",
        "prestige-button",
        "blank",
        [
          "display-text",
          function () {
            return "I have " + format(player.points) + " Power";
          },
        ],
        "blank",
        "upgrades",
      ],
    },
    Milestones: {
      content: ["main-display", "milestones"],
    },
  },
  color: "#d98314",
  passiveGeneration() {
    if (hasMilestone("L", 1)) return 0.05;
    else if (hasMilestone("L", 0)) return 0.01;
    else return 0;
  },
  requires: new Decimal(5), // Can be a function that takes requirement increases into account
  resource: "Luther's Strength", // Name of prestige currency
  baseResource: "power", // Name of resource prestige is based on
  baseAmount() {
    return player.points;
  }, // Get the current amount of baseResource
  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 0.5, // Prestige currency exponent
  gainMult() {
    // Calculate the multiplier for main currency from bonuses
    mult = new Decimal(1);
    if(hasUpgrade("L", 12)) mult = mult.add(Decimal.log(player.points.max(1), 6).add(1))
    return mult;
  },
  gainExp() {
    // Calculate the exponent on main currency from bonuses
    return new Decimal(1);
  },
  row: 0, // Row the layer is in on the tree (0 is the first row)
  hotkeys: [],
  layerShown() {
    return true;
  },
  infoboxes: {
    lore: {
      title: "Luther",
      body() {
        return "I'm losing my power, i need you to help get it back. I think possibly 1 million of my strength will be enough to get it back.";
      },
    },
  },
  upgrades: {
    11: {
      title: "Number One",
      description: "Boost Power gain by Luther's Strength",
      effectDisplay() {
        return format(Decimal.log(player.L.points.max(1), 6).add(1)) + "x";
      },
      cost: new Decimal(5),
    },
    12: {
      title: "It'll Get Easier",
      description: "Boost Luther's Strength gain by Power",
      effectDisplay() {
    return format(Decimal.log(player.points.max(1), 6).add(1)) + "x";
  },
      cost: new Decimal(30),
    }
  },
});
