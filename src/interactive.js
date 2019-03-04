const AWS = require('aws-sdk');

exports.handler = async event => {
  const sns = new AWS.SNS();
  await sns
    .publish({
      Message: event.body,
      Subject: 'Dialog Submission',
      TopicArn: process.env.SNS_ARN,
    })
    .promise();
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: '',
  };
};
