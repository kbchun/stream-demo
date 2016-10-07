const [express, request] = [require('express'), require('request')];

// creates server
const app = express();

const user = {username: 'bob', pw: 'loblaw', signedIn: false};

// authenticates user's username and password
app.get('/auth', (req, res) => {
  let data = '';
  req.on('data', chunk => {
    data += chunk;
  }).on('end', () => {
    // username='bob'&pw='loblaw' ----> 
    // [[username, 'bob'], [pw, 'loblaw']]
    let creds = data.split('&')
                .map(el => el.split('=')[1]);

    if (creds[0] === user.username && creds[1] === user.pw) {
      user.signedIn = true;
      res.status(200).end();
    } else {
      res.status(400).end();
    }
  });
});

// checks if user is signed in or not
app.get('/session', (req, res) => {
  req.on('data', () => {})
    .on('end', () => {
      if (user.signedIn) {
        res.status(200).end();
      } else {
        res.status(400).end();
      }
    });
});

app.listen(4000, () => { console.log('listening on 4000'); });