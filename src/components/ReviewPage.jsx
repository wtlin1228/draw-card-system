/** @format */

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// Components
import Grid from '@material-ui/core/Grid';
import AddCardForm from './AddCardFrom';
import DrawCardForm from './DrawCardForm';
import CardsViewer from './CardsViewer';
import Typography from '@material-ui/core/Typography';
import StudentReviewCard from './StudentReviewCard';

// MockData
import { mockCards } from '../mockdata/cards';

// Styles
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(100),
  },
  mgTop7: {
    marginTop: theme.spacing(20),
  },
  bg: {
    width: '100vw',
    marginTop: theme.spacing(20),
    paddingBottom: theme.spacing(20),
    backgroundColor: '#ec594e',
  },
}));

// Utils
const groupCards = (cards) =>
  cards.reduce((acc, curr) => {
    const groupName = curr.groupName;
    if (groupName in acc) {
      return { ...acc, [groupName]: [...acc[groupName], curr] };
    } else {
      return { ...acc, [groupName]: [curr] };
    }
  }, {});

export default function ReviewPage() {
  const classes = useStyles();

  const [cards, setCards] = useState(mockCards);

  const defaultStudentCards = [{ ...mockCards[0], progress: 92 }];
  const [studentCards, setStudentCards] = useState(defaultStudentCards);

  const groupedCards = groupCards(cards);

  const availableCardsForStudentToDraw = cards.filter(
    (card) => !studentCards.find((studentCard) => studentCard.id === card.id)
  );

  const groupedCardsForStudentToDraw = groupCards(
    availableCardsForStudentToDraw
  );

  return (
    <Grid
      className={classes.root}
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      <Typography
        className={classes.mgTop7}
        variant="h3"
        color="textPrimary"
        component="p"
      >
        後台 - 我們是卡片群組
      </Typography>
      <div>
        {Object.keys(groupedCards).map((groupName, index) => (
          <CardsViewer
            key={`group-card-${groupName}-${index}`}
            groupName={groupName}
            cards={groupedCards[groupName]}
            onCardDelete={(id) =>
              setCards(cards.filter((card) => id !== card.id))
            }
          />
        ))}
      </div>
      <Typography
        className={classes.mgTop7}
        variant="h3"
        color="textPrimary"
        component="p"
      >
        後台 - 來新增卡片吧
      </Typography>
      <AddCardForm onCardCreate={(card) => setCards([...cards, card])} />
      <Grid
        className={classes.bg}
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Typography
          className={classes.mgTop7}
          variant="h3"
          color="textPrimary"
          component="p"
        >
          前台 - 來抽卡囉
        </Typography>
        <DrawCardForm
          cards={groupedCardsForStudentToDraw}
          onStudentCardsUpdate={(newCard) =>
            setStudentCards([...studentCards, newCard])
          }
        />
      </Grid>
      <Typography
        className={classes.mgTop7}
        variant="h3"
        color="textPrimary"
        component="p"
      >
        前台 - 抽到的卡在這邊
      </Typography>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        wrap="nowrap"
      >
        {studentCards.map((card) => (
          <StudentReviewCard key={card.id} {...card} />
        ))}
      </Grid>
    </Grid>
  );
}
