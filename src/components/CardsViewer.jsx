/** @format */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

// Components
import RecipeReviewCard from './RecipeReviewCard';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Styles
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3),
    padding: theme.spacing(5),
    backgroundColor: '#ec594e',
  },
}));

export default function CardsViewer({ groupName, cards, onCardDelete }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" color="textPrimary" component="p">
        {groupName}
      </Typography>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        wrap="nowrap"
      >
        {cards.map((card) => (
          <RecipeReviewCard
            key={card.id}
            {...card}
            onCardDelete={onCardDelete}
          />
        ))}
      </Grid>
    </div>
  );
}
