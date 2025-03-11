const { builder } = require('@netlify/functions');

async function handler(event, context) {
  // Get path from event
  const path = event.path.replace('/.netlify/functions/next', '');
  
  // Return a simple response for the root path
  if (path === '') {
    return {
      statusCode: 302,
      headers: {
        Location: '/',
      },
    };
  }

  // Return a 404 for non-existent paths
  return {
    statusCode: 404,
    body: 'Not Found',
  };
}

exports.handler = builder(handler); 