# SaveTwitterTimeline
Node script for downloading twitter timeline (up to 3200 tweets) of specific user and saving it into a text file.

##Usage:

Navigate to the project root.

Run ```npm install```

Fill in the corresponding authConfig fields with your twitter app tokens in the saveTimeline.js file:

```
const authConfig = {
  consumer_key: '...',
  consumer_secret: '...',
  access_token: '...',
  access_token_secret: '...',
};
```

Fill in initialParams: 

```
const initialParams = {
  screen_name: 'twocyana', //target username
  include_rts: true, // if false -  don't include retweets
  exclude_replies: false, // if true - don't include replies
  count: 200 //max count per request, I'd recommend to leave it as it is
};
```

Run ```node saveTimeline```. Tweets will be saved into the 'tweets' folder.
