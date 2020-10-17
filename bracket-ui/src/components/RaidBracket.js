import React from "react";
import {
  Grid,
  makeStyles,
  TextField,
  Card,
  CardContent,
  Button,
} from "@material-ui/core";
import BossLoot from "./BossLoot";

const exampleBosses = [
  {
    Name: "Razorgore",
    LootPools: [
      {
        Name: "RG1",
        Drops: [
          "Stormrage Bracers",
          "Dragonstalker's Bracers",
          "Netherwind Bindings",
          "Judgement Bindings",
          "Bindings of Transcendence",
          "Bloodfang Bracers",
          "Bracers of Ten Storms",
          "Nemesis Bracers",
          "Bracelets of Wrath",
        ],
        Quant: 1,
      },
      {
        Name: "RG2",
        Drops: [
          "Stormrage Bracers",
          "Dragonstalker's Bracers",
          "Netherwind Bindings",
          "Judgement Bindings",
          "Bindings of Transcendence",
          "Bloodfang Bracers",
          "Bracers of Ten Storms",
          "Nemesis Bracers",
          "Bracelets of Wrath",
        ],
        Quant: 1,
      },
      {
        Name: "RG3",
        Drops: [
          "Arcane Infused Gem",
          "The Black Book",
          "Gloves of Rapid Evolution",
          "Mantle of the Blackwing Cabal",
          "Spineshatter",
          "The Untamed Blade",
        ],
        Quant: 1,
      },
    ],
  },
  {
    Name: "Vaelastrasz the Corrupt",
    LootPools: [
      {
        Name: "V1",
        Drops: [
          "Stormrage Belt",
          "Dragonstalker's Belt",
          "Netherwind Belt",
          "Judgement Belt",
          "Belt of Transcendence",
          "Bloodfang Belt",
          "Belt of Ten Storms",
          "Nemesis Belt",
          "Waistband of Wrath",
        ],
        Quant: 1,
      },
      {
        Name: "V2",
        Drops: [
          "Stormrage Belt",
          "Dragonstalker's Belt",
          "Netherwind Belt",
          "Judgement Belt",
          "Belt of Transcendence",
          "Bloodfang Belt",
          "Belt of Ten Storms",
          "Nemesis Belt",
          "Waistband of Wrath",
        ],
        Quant: 1,
      },
      {
        Name: "V3",
        Drops: [
          "Rune of Metamorphosis",
          "Mind Quickening Gem",
          "Dragonfang Blade",
          "Pendant of the Fallen Dragon",
          "Red Dragonscale Protector",
        ],
        Quant: 2,
      },
    ],
  },
  {
    Name: "Vaelastrasz the Corrupt",
    LootPools: [
      {
        Name: "V1",
        Drops: [
          "Stormrage Belt",
          "Dragonstalker's Belt",
          "Netherwind Belt",
          "Judgement Belt",
          "Belt of Transcendence",
          "Bloodfang Belt",
          "Belt of Ten Storms",
          "Nemesis Belt",
          "Waistband of Wrath",
        ],
        Quant: 1,
      },
      {
        Name: "V2",
        Drops: [
          "Stormrage Belt",
          "Dragonstalker's Belt",
          "Netherwind Belt",
          "Judgement Belt",
          "Belt of Transcendence",
          "Bloodfang Belt",
          "Belt of Ten Storms",
          "Nemesis Belt",
          "Waistband of Wrath",
        ],
        Quant: 1,
      },
      {
        Name: "V3",
        Drops: [
          "Rune of Metamorphosis",
          "Mind Quickening Gem",
          "Dragonfang Blade",
          "Pendant of the Fallen Dragon",
          "Red Dragonscale Protector",
        ],
        Quant: 2,
      },
    ],
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));
const RaidBracket = (props) => {
  const classes = useStyles();
  const boss = exampleBosses;

  const [state, setState] = React.useState({});

  const handleChange = (bossPool, lootChoices) => {
    setState({ ...state, [bossPool]: lootChoices });
  };

  const updateName = (event) => {
    setState({ ...state, Name: event.target.value });
  };

  const submit = () => {
    console.log(state);
  };

  return (
    <Grid container className={classes.root} spacing={2} justify="center">
      <Grid item xs={11}>
        <Grid container justify="center" spacing={2}>
          <Grid key="Header" item xs={12}>
            <Card className={classes.root}>
              <CardContent>
                <Grid container justify="center" spacing={4}>
                  <Grid key="Name" item>
                    <TextField
                      id="standard-basic"
                      label="Charecter Name"
                      onChange={updateName}
                    />
                  </Grid>
                  <Grid key="Submit" item>
                    <Button variant="contained" color="primary" onClick={submit}>
                      Submit Bracket
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          {exampleBosses.map((value) => (
            <Grid key={value.Name} item xs={12} sm={6}>
              <BossLoot boss={value} handleChange={handleChange} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RaidBracket;
