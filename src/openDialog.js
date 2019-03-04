const querystring = require('querystring');
const got = require('got');

exports.handler = async event => {
  const reqBody = querystring.parse(event.body);
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.SLACK_OAUTH}`,
  };
  const body = JSON.stringify({
    trigger_id: reqBody.trigger_id,
    dialog: {
      callback_id: 'ryde-46e2b0',
      title: 'Request a Ride',
      submit_label: 'Request',
      notify_on_cancel: true,
      state: 'Limo',
      elements: [
        {
          type: 'select',
          label: 'Pickup Location',
          name: 'loc_origin',
          options: [
            {
              label: 'Maru',
              value: 'maru',
            },
            {
              label: 'Lil Bub',
              value: 'lilbub',
            },
            {
              label: 'Hamilton the Hipster Cat',
              value: 'hamilton',
            },
          ],
        },
        {
          type: 'select',
          label: 'Dropoff Location',
          name: 'loc_destination',
          options: [
            {
              label: 'Hindu (Indian) vegetarian',
              value: 'hindu',
            },
            {
              label: 'Strict vegan',
              value: 'vegan',
            },
            {
              label: 'Kosher',
              value: 'kosher',
            },
            {
              label: 'Just put it in a burrito',
              value: 'burrito',
            },
          ],
        },
      ],
    },
  });
  await got.post('https://slack.com/api/dialog.open', {
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
