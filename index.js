const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
token: 'xoxb-5074506755382-5082423921859-WXYYpJ2VPFN0YYsc7Ks18J8p',
name: 'myweather'
});

//Start Handler
bot.on('start', () => {
  const params = {
    icon_emoji: ':sun:'
  };

  bot.postMessageToChannel(
    'myweatherr',
    'How the day looks like!!',
    params
  );
});

//Error Handler
bot.on('error', (err) => console.log(err));

//Message Handler
bot.on('message', (data) => {
 if(data.type !== 'message'){
   return;
 }

  handleMessage(data.text);
});


// Resppond to Data
function handleMessage(message){
  if(message.includes(' timezone')) {
    tzReport();
  } 
}

//Tell a Weather Forcast of Singapore
function tzReport(){
 axios.get('https://api.openweathermap.org/data/2.5/weather?q=Singapore,sg&APPID=ce8c237c706d31d1d46d7bcd755f07b0')
 .then(res => {
    const cc = res.data.name;
    const tz = res.data.timezone;
    const lon = res.data.coord.lon;
    const desc = res.data.main.pressure;
    const  ws = res.data.wind.speed;


    const params = {
     icon_emoji: ':sun_with_face:'
   };
 
   bot.postMessageToChannel('myweatherr', `Weather report for ${cc} is \n ${tz} and details are ${lon} and air prressure ${desc}`, params);

 });
}