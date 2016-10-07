const [express, request] = [require('express'), require('request')];

// creates server
const app = express();

// import files
app.use(express.static(__dirname));

// handle POST requests
app.post('/signin', (req, res, next) => { 
  const path = '/auth';
  authenticate(req, res, next, path); 
});

// handle GET requests
app.get('/restricted', (req, res, next) => { 
  const path = '/session';
  authenticate(req, res, next, path); 
});

// a.pipe(b) ===> returns b
const authServer = 'http://localhost:4000';
function authenticate(req, res, next, path) {
  let response = req.pipe(request.get(authServer + path));
  response.on('response', () => {
    const statusCode = response.responseContent.statusCode;

    if (statusCode === 200) {
      // let user through
      res.sendFile('./restricted.html', {root: '.'});

    } else {
      // redirect user to root
      res.redirect('/');
    }
  });
}

app.listen(3000, () => { console.log('listening on 3000'); });