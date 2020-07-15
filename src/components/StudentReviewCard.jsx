/** @format */

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

// Components
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { green } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PlayArrow from '@material-ui/icons/PlayArrow';
import StarRate from '@material-ui/icons/StarRate';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';

function LinearProgressWithLabel({ value }) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" value={value} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

// Styles
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 375,
    margin: theme.spacing(2),
    display: 'inline-block',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    backgroundSize: 'contain',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: green[600],
  },
  taskIcon: {
    marginRight: theme.spacing(3),
  },
}));

// Utils

export default function StudentReviewCard({
  id,
  groupName,
  title,
  introduction,
  url,
  badgeUrl,
  countMaxCards,
  countSoldCards,
  countAccomplishedCards,
  countSoldBadges,
  drawBeginDate,
  drawEndDate,
  practiceBeginDate,
  practiceEndDate,
  tasks,
  progress,
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <LinearProgressWithLabel value={progress} />
      <CardHeader title={title} subheader={introduction} />
      <CardMedia className={classes.media} image={badgeUrl} title={title} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          抽卡區間： {drawBeginDate} ~ {drawEndDate}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          計算區間： {practiceBeginDate} ~ {practiceEndDate}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          有 {countSoldCards} 人抽到
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          剩 {countMaxCards - countSoldCards} 張卡片
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          已經有 {countAccomplishedCards} 人完成卡片
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          已經有 {countSoldBadges} 人領到了徽章
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {tasks.map(({ id, title, type, url }) => (
            <Grid
              key={id}
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
            >
              <Avatar className={classes.taskIcon}>
                {type === 'Video' && <PlayArrow />}
                {type === 'Exercise' && <StarRate />}
              </Avatar>
              <p>{title}</p>
            </Grid>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}
