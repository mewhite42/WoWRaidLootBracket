import React from "react";
import {
  Checkbox,
  makeStyles,
  FormControlLabel,
  FormLabel,
  FormControl,
  RadioGroup,
} from "@material-ui/core";


const nums = [
  "Any Number",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
];

const BossLootPool = (props) => {

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
  const FormControls = props.lootPool.Drops.sort().map((item, index) => {
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={state[item] || false}
            onChange={handleChange}
            name={item}
            color="primary"
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
      error={count!==props.lootPool.Quant&&props.lootPool.Quant!==0}
      component="fieldset"
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
