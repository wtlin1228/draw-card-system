/** @format */

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// Components
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';

// Styles
const useStyles = makeStyles((theme) => ({
  root: {},
  form: {
    width: '600px',
    marginTop: theme.spacing(1),
  },
  drawFormControl: {
    width: '100%',
    margin: theme.spacing(3, 0, 2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(3, 0, 3, 0),
    fontSize: '24px',
    backgroundColor: green[600],
  },
}));

// Utils
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export default function DrawCardForm({ cards, onStudentCardsUpdate }) {
  const classes = useStyles();

  const cardGroups = Object.keys(cards);

  const [selectedCardGroup, setSelectedCardGroup] = useState(cardGroups[0]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const candidateCards = cards[selectedCardGroup];
    const newCard = candidateCards[getRandomInt(candidateCards.length)];

    onStudentCardsUpdate({ ...newCard, progress: 0 });
  };

  return (
    <div className={classes.root}>
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <FormControl className={classes.drawFormControl}>
          <InputLabel id="select-card-group-label">選擇活動</InputLabel>
          <Select
            labelId="select-card-group-label"
            id="select-card-group"
            value={selectedCardGroup}
            onChange={(e) => setSelectedCardGroup(e.target.value)}
          >
            {cardGroups.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          type="submit"
          disabled={!cards[selectedCardGroup]}
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          我要抽到最稀有的卡
        </Button>
      </form>
    </div>
  );
}
