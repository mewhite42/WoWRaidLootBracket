import React from "react";
import { Card, makeStyles,  CardContent, Typography , Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';


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

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const SubmissionLanding = (props) => {
  const classes = useStyles();

  return (      
  <Alert severity="success">Thank you for submitting a bet!  Check back later for scores!</Alert>

  );
};

export default SubmissionLanding;
