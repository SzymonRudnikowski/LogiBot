//const { SingleSignOn } = require('eve-sso') ;
const { Koa } = require('koa');
const { Router } = require('koa-router');

exports.sso = function () {
// Get the client ID and secret from the Eve developers section
const CLIENT_ID = config.CLIENT_ID;
const SECRET = config.SECRET;
// The callback URI as defined in the application in the developers section
const CALLBACK_URI = 'http://localhost:3001/sso';

const sso = new SingleSignOn(CLIENT_ID, SECRET, CALLBACK_URI, {
  endpoint: 'https://login.eveonline.com', // optional, defaults to this
  userAgent: 'my-user-agent' // optional
});
    

    const app = new Koa()
    const router = new Router()
    
    // Show a login redirect link
    router.get('/login', async ctx => {
      // The first argument is a required state, which you can verify in the callback
      // The second argument is an optional space-delimited string or string array of scopes to request
      ctx.body = `<a href="${sso.getRedirectUrl('my-state')}">Login to Eve Online</a>`
    })
    
    // Handle the SSO callback (this route is the CALLBACK_URI above)
    router.get('/sso', async ctx => {
      // Get the one-time access code
      const code = ctx.query.code
      // NOTE: usually you'd want to validate the state (ctx.query.state) as well
    
      // Swap the one-time code for an access token
      const info = await sso.getAccessToken(code)
    
      // Usually you'd want to store the access token
      // as well as the refresh token
      console.log('info', info)
      
      // Do whatever, for example, redirect to user page
      ctx.body = 'You are now authenticated!'
    })
    
    app.use(router.middleware())
    app.listen(3001, () => {
      console.log('Server listening on port 3001')
    })

};

