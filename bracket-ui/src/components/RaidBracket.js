import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  makeStyles,
  TextField,
  Card,
  CardContent,
  Button,
} from "@material-ui/core";
import { Redirect } from 'react-router-dom';
import BossLoot from "./BossLoot";


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

  const [raid, setRaid] = useState({});
  const [redirect, setRedirect] = useState(false);
  const [choices, setChoices] = useState({});

  useEffect(() => {
    axios.get("localhost:4000/raidLoot/").then((response) => {
      setRaid(response.data);
    });
  }, []);

  const handleChange = (bossPool, lootChoices) => {
    setChoices({ ...choices, [bossPool]: lootChoices });
  };

  const updateName = (event) => {
    setChoices({ ...choices, Name: event.target.value });
  };

  const submit = () => {
        axios.post("localhost:4000/submitBet/", choices).then((response) => {
          setRedirect(true);
        });;
  };

  const checkCompletion = () => {
    if (
      choices.Name === undefined ||
      choices.Name === "" ||
      choices.Name === null
    ) {
      return false;
    }

    return raid.bosses.every((boss) => {
      return boss.LootPools.every((lootPool) => {
        if (
          lootPool.Quant !== 0 &&
          (choices[lootPool.Name] === undefined ||
          choices[lootPool.Name].length !== lootPool.Quant)
        )
          return false;
        else return true;
      });
    });
  };

  const bosses = raid.bosses || [];

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to='/SubmissionLanding' />
    }
  }

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
                      label="Character Name"
                      onChange={updateName}
                    />
                  </Grid>
                  <Grid key="Submit" item>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={!checkCompletion()}
                      onClick={submit}
                    >
                      Submit Bracket
                    </Button>
                    {renderRedirect()}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          {bosses.map((value) => (
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
