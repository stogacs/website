const Times = {
  breakfastOver: 11,
  smashStart: 12,
  lunchStart: 13,
  lunchOver: 14,
  judgeStart: 17,
};

const now = new Date();
const hours = now.getHours();
const bg = document.getElementById('splash');

switch (true) {
  case hours < Times.breakfastOver:
    bg.style.backgroundImage = 'url(/media/banners/donut-boxes.jpg)';
    break;
  case hours < Times.smashStart:
    bg.style.backgroundImage = 'url(/media/banners/smash.jpg)';
    break;
  case hours < Times.lunchStart:
    bg.style.backgroundImage = 'url(/media/banners/sponsor24.png)';
    console.log('Lunch is ongoing');
    break;
  case hours < Times.judgeStart:
    bg.style.backgroundImage = 'url(/media/banners/sponsor24.png)';
    break;
  default:
    console.log('Judging in progress');
    bg.style.backgroundImage = 'url(/media/banners/judging.jpg)';
    break;
}
