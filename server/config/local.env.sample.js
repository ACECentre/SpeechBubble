'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN:           'http://localhost:9000',
  SESSION_SECRET:   'speechbubble-secret',

  FACEBOOK_ID:      'app-id',
  FACEBOOK_SECRET:  'secret',

  TWITTER_ID:       'app-id',
  TWITTER_SECRET:   'secret',

  GOOGLE_ID:        'app-id',
  GOOGLE_SECRET:    'secret',

  MAILCHIMP_API_KEY: 'api-key',
  MAILCHIMP_LIST_ID: 'list-id',

  MANDRILL_API_KEY: 'api-key',

  SUPPORT_EMAIL: 'example@example.com',

  CAPTCHA_API_KEY: 'api-key',

  UPLOAD_DIR: '/path/to/upload/dir',
  
  DISQUS_PUBLIC: '',
  DISQUS_SECRET: '',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
