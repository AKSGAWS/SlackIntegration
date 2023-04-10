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
/*  let msg = message.split(' ');
  console.log("First value is " + msg[0]);
  console.log("Second (Country) value is " + msg[1]);
  console.log("Third (Parameter) value is " + msg[2]);
  if(msg[2].includes('timezone')) {
    tzReport(msg[1])*/
  if(message.includes('timezone')) {
    tzReport();
  }   
}

//Tell a Name
function tzReport(){
//function tzReport(country){
 // console.log("Within tzReport " + country);
 axios.get('https://api.openweathermap.org/data/2.5/weather?q=Singapore,sg&APPID=ce8c237c706d31d1d46d7bcd755f07b0')
// axios.get('https://api.openweathermap.org/data/2.5/weather?q=${country}&APPID=ce8c237c706d31d1d46d7bcd755f07b0')
 .then(res => {
    const cc = res.data.name;
    const tz = res.data.timezone;
    const lon = res.data.coord.lon;
    const desc = res.data.main.pressure;

    const params = {
     icon_emoji: ':sun_with_face:'
   };
 
   bot.postMessageToChannel('myweatherr', `Timezone for ${cc} is ${tz} and details are ${lon} and ${desc}`, params);

 });
}