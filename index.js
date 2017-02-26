const Twit = require('twit');
const Long = require('long');
const fs = require('fs');
const Progress = require('ts-progress');

const authConfig = {
  consumer_key: '...',
  consumer_secret: '...',
  access_token: '...',
  access_token_secret: '...',
  timeout_ms: 60 * 1000
};

const initialParams = {
  screen_name: '...',
  include_rts: true,
  exclude_replies: false,
  count: 200
};

const tw = new Twit(authConfig);

const progress = Progress.create({
  total: 10,
  textColor: 'red',
  pattern: 'Downloading: {bar.white.red.30}'
});

const getTimeline = (params, cb, acc = []) => {
  return tw.get('statuses/user_timeline/', params, (err, data) => {
    if (err) {
      throw err;
    }
    progress.update();
    acc = [...acc, ...data];

    if (data.length) {
      const maxId = data[data.length - 1].id_str;
      const maxIdInt = new Long.fromString(maxId);
      const shift = maxIdInt.subtract(1).toString();
      const newParams = Object.assign({}, params, { max_id: shift });

      return getTimeline(newParams, cb, acc);
    } else {
      progress.done();
      cb(acc);
    }
  }).catch(err => console.log(err));
};

const writeTweetsToFile = (data) => {
  const name = data[0].user.screen_name;
  const separator = '\n==============================================\n';
  const tweets = data.map(tweet => `${tweet.created_at}\n\n${tweet.text.trim()}`).join(separator);

  if (!fs.existsSync('./tweets')) {
    fs.mkdirSync('./tweets');
  }

  fs.writeFileSync(`./tweets/${name}.txt`, tweets);
  console.log(`All available tweets saved to ${name}.txt`);
};

getTimeline(initialParams, writeTweetsToFile);
