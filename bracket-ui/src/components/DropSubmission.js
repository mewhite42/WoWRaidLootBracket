import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  makeStyles,
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
    axios.get("https://g1wzmbjhr4.execute-api.us-east-1.amazonaws.com/v1/raidLoot/").then((response) => {
      setRaid(response.data);
    });
  }, []);

  const handleChange = (bossPool, lootChoices) => {
    setChoices({ ...choices, [bossPool]: lootChoices });
  };

  const submit = () => {
        choices.Name = "Drops"; 
        axios.post("https://g1wzmbjhr4.execute-api.us-east-1.amazonaws.com/v1/submitBet/", choices).then((response) => {
          setRedirect(true);
        });;
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
                  <Grid key="Submit" item>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={submit}
                    >
                      Submit Drops
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
