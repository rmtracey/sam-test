const got = require('got');
const AWS = require('aws-sdk');

exports.handler = async event => {
  const payload = JSON.parse(decodeURIComponent(event.Records[0].Sns.Message).slice(8));
  let text = JSON.stringify(payload, null, 2);
  const docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });
  const params = {
    Item: {
      date: Date.now(),
      id: payload.user.id,
      origin: payload.submission.loc_origin,
      destination: payload.submission.loc_destination,
    },
    TableName: process.env.DB_TABLE_NAME,
  };
  await docClient
    .put(params, err => {
      if (err) {
        text = err;
      }
    })
    .promise();
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.SLACK_OAUTH}`,
  };
  const body = JSON.stringify({
    channel: payload.channel.id,
    text,
    user: payload.user.id,
    as_user: false,
  });
  await got.post('https://slack.com/api/chat.postEphemeral', {
    headers,
    body,
  });
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: '',
  };
};
