/** @format */

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { format } from 'date-fns';

// MockData
import { MathG3 } from '../mockdata/tasks';

// Components
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PlayArrow from '@material-ui/icons/PlayArrow';
import StarRate from '@material-ui/icons/StarRate';
import { green } from '@material-ui/core/colors';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

// Styles
const useStyles = makeStyles((theme) => ({
  root: {},
  form: {
    width: '600px',
    marginTop: theme.spacing(1),
  },
  mgRight3: {
    marginRight: theme.spacing(3),
  },
  taskFormControl: {
    margin: theme.spacing(3, 0, 2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(3, 0, 3, 0),
    fontSize: '24px',
    backgroundColor: green[500],
  },
}));

/**
 * Card Interface:
 *     String  groupName               群組名稱相同的卡片會被群組在一起
 *     String  title
 *     String  introduction
 *     String  url
 *     String  badgeUrl                徽章的圖片連結
 *     Number  countMaxCards           最多幾張卡片
 *     Number  countSoldCards          領卡的數量
 *     Number  countAccomplishedCards  完成的卡片數量
 *     Number  countSoldBadges         領獎的數量
 *     Date    drawBeginDate           抽卡開始
 *     Date    drawEndDate             抽卡結束
 *     Date    practiceBeginDate       計算完成開始, null 表示全部都算
 *     Date    practiceEndDate         計算完成結束
 *     Task[]  tasks
 */

/**
 * Task Interface:
 *     String  title
 *     String  type       可以是 'Video', 'Exercise'
 *     String  url
 *     string  progressId  用來比對 user process cache
 */

// Utils
const taskOptions = MathG3.child
  .filter(({ type }) => type === 'Video' || type === 'Exercise')
  .map(({ id, title, type, url, progressId }) => ({
    id,
    title,
    type,
    url,
    progressId,
  }));

const formatYMD = (date) => format(date, 'yyyy/MM/dd');

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function AddCardForm({ onCardCreate }) {
  const classes = useStyles();

  // Card
  const [groupName, setGroupName] = useState('夏日大作戰');
  const [title, setTitle] = useState('白米臺灣吧徽章（挑戰難度：★）');
  const [introduction, setIntroduction] = useState(
    '完整觀看「當代臺灣」裡全部的動畫（共 4 部）'
  );
  const [url, setUrl] = useState(
    'https://www.junyiacademy.org/junyi-competency/v972-new-topic?growth=WP_SummerBadge_20200616'
  );
  const [badgeUrl, setBadgeUrl] = useState(
    'https://storage.googleapis.com/wpassets.junyiacademy.org/1/2020/07/%E8%87%BA%E7%81%A3%E5%90%A7-3-150x150.png'
  );

  const today = new Date();
  const [countMaxCards, setCountMaxCards] = useState(1000);
  const [drawBeginDate, setDrawBeginDate] = useState(today);
  const [drawEndDate, setDrawEndDate] = useState(today);
  const [practiceBeginDate, setPracticeBeginDate] = useState(today);
  const [practiceEndDate, setPracticeEndDate] = useState(today);

  // Tasks
  const [selectedTasks, setSelectedTasks] = useState([
    taskOptions[0],
    taskOptions[1],
    taskOptions[2],
    taskOptions[3],
    taskOptions[4],
    taskOptions[5],
  ]);
  const [currentTask, setCurrentTask] = useState(taskOptions[0]);

  const handleSubmit = (event) => {
    event.preventDefault();

    onCardCreate({
      id: uuid(),
      groupName,
      title,
      introduction,
      url,
      badgeUrl,
      countMaxCards,
      countSoldCards: 0,
      countAccomplishedCards: 0,
      countSoldBadges: 0,
      drawBeginDate: formatYMD(drawBeginDate),
      drawEndDate: formatYMD(drawEndDate),
      practiceBeginDate: formatYMD(practiceBeginDate),
      practiceEndDate: formatYMD(practiceEndDate),
      tasks: selectedTasks,
    });

    // Reset Card
    // setGroupName('');
    // setTitle('');
    // setIntroduction('');
    // setUrl('');
    // setBadgeUrl('');
    // setCountMaxCards(0);
    // setDrawBeginDate(null);
    // setDrawEndDate(null);
    // setPracticeBeginDate(null);
    // setPracticeEndDate(null);

    // Reset Tasks
    setSelectedTasks([]);
  };
  return (
    <div className={classes.root}>
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="title"
          label="卡片的名稱"
          name="title"
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="introduction"
          label="卡片的簡介"
          name="introduction"
          autoFocus
          value={introduction}
          onChange={(e) => setIntroduction(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="group-name"
          label="卡片的群組"
          name="group-name"
          autoFocus
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="url"
          label="卡片的連結"
          name="url"
          autoFocus
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="badge-url"
          label="徽章圖片連結"
          name="badge-url"
          autoFocus
          value={badgeUrl}
          onChange={(e) => setBadgeUrl(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="count-max-cards"
          label="最多幾張卡片"
          name="count-max-cards"
          autoFocus
          value={countMaxCards}
          onChange={(e) => setCountMaxCards(e.target.value)}
        />

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            className={classes.mgRight3}
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="draw-begin-date"
            label="抽卡開始"
            value={drawBeginDate}
            onChange={setDrawBeginDate}
            KeyboardButtonProps={{
              'aria-label': 'change draw begin date',
            }}
          />
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="draw-end-date"
            label="抽卡結束"
            value={drawEndDate}
            onChange={setDrawEndDate}
            KeyboardButtonProps={{
              'aria-label': 'change draw end date',
            }}
          />
          <KeyboardDatePicker
            className={classes.mgRight3}
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="practice-begin-date"
            label="開始計算"
            value={practiceBeginDate}
            onChange={setPracticeBeginDate}
            KeyboardButtonProps={{
              'aria-label': 'change practice begin date',
            }}
          />
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="normal"
            id="practice-end-date"
            label="結束計算"
            value={practiceEndDate}
            onChange={setPracticeEndDate}
            KeyboardButtonProps={{
              'aria-label': 'change practice end date',
            }}
          />
        </MuiPickersUtilsProvider>

        <FormControl className={classes.taskFormControl}>
          <InputLabel id="select-task-label">任務</InputLabel>
          <Select
            labelId="select-task-label"
            id="select-task"
            value={currentTask}
            onChange={(e) => {
              setCurrentTask(e.target.value);
              if (selectedTasks.find(({ id }) => id === e.target.value.id))
                return;
              setSelectedTasks([...selectedTasks, e.target.value]);
            }}
          >
            {taskOptions.map((option) => (
              <MenuItem key={`task-${option.id}`} value={option}>
                {option.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <div>
          <List dense={false}>
            {selectedTasks.map((task) => (
              <ListItem key={`list-task-${task.id}`}>
                <ListItemAvatar>
                  <Avatar>
                    {task.type === 'Video' && <PlayArrow />}
                    {task.type === 'Exercise' && <StarRate />}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={task.title} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() =>
                      setSelectedTasks(
                        selectedTasks.filter(({ id }) => id !== task.id)
                      )
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </div>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          卡片，就決定是你了
        </Button>
      </form>
    </div>
  );
}
