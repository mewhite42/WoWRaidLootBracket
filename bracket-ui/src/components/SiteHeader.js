import React from "react";
import { Button, makeStyles, IconButton, Typography, Toolbar, AppBar } from "@material-ui/core";
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
  },
  pos: {
    marginBottom: 12,
  },
});

const SiteHeader = (props) => {
  const classes = useStyles();

  return (
    <AppBar position="static">
        <Typography variant="h3" className={classes.title} align="center">
          Sundies Loot Bracket
        </Typography>
    </AppBar>
  );
};

export default SiteHeader;
