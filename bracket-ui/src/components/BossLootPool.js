import React from "react";
import {
  Checkbox,
  makeStyles,
  FormControlLabel,
  FormLabel,
  FormControl,
  RadioGroup,
} from "@material-ui/core";

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
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const nums = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const BossLootPool = (props) => {
  const classes = useStyles();

  const [state, setState] = React.useState({});

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    if (props.handleChange){
        var choices = [];
        if( event.target.checked){
            choices.push(event.target.name);
        }
        Object.keys(state).forEach(key => {
          if(state[key] && key!==event.target.name){
              choices.push(key);
          }
        });
        props.handleChange(props.lootPool.Name, choices)
    }
  };

  const FormControls = props.lootPool.Drops.map((item, index) => {
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={state[item] || false}
            onChange={handleChange}
            name={item}
          />
        }
        label={item}
        key={item}
      />
    );
  });

  var count = 0;
  Object.keys(state).forEach(key => {
    if(state[key])
        count++;
  });

  return (
    <FormControl
      required
      error={count!==props.lootPool.Quant}
      component="fieldset"
      className={classes.formControl}
    >
      <FormLabel component="legend">
        {"Select " + nums[props.lootPool.Quant]}
      </FormLabel>
      <RadioGroup
        aria-label={props.lootPool.Name}
        name={props.lootPool.Name}
        onChange={handleChange}
      >
        {FormControls}
      </RadioGroup>
    </FormControl>
  );
};

export default BossLootPool;
