import React from "react";
import { Card, makeStyles, CardContent, Typography } from "@material-ui/core";
import BossLootPool from "./BossLootPool";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 20,
  },
  pos: {
    marginBottom: 12,
  },
});

const BossLoot = (props) => {
  const classes = useStyles();
  
  const LootPools = props.boss.LootPools.map((item, index) => {
    return (
      <BossLootPool
        lootPool={item}
        handleChange={props.handleChange}
        key={props.boss.Name.concat(index + 1)}
      />
    );
  });

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title}>{props.boss.Name}</Typography>
        {LootPools}
      </CardContent>
    </Card>
  );
};

export default BossLoot;
