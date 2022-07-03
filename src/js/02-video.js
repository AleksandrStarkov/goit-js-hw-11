import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const TIME_CURRENT_KEY = 'videoplayer-current-time';

const onPlayTime = function (timeupdate) {
  localStorage.setItem(TIME_CURRENT_KEY, JSON.stringify(timeupdate));
  console.log(timeupdate);
};
player.on('timeupdate', throttle(onPlayTime, 1000));

const timeStop = localStorage.getItem(TIME_CURRENT_KEY);
// const pausedTime = JSON.parse(timeStop);
if (timeStop) {
  player.setCurrentTime(timeStop);
}
console.log(timeStop);
