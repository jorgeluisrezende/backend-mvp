<h1 align="center"> Gandalf.id </h1>
<p align="center"><i>The simples ID manager of the Middle-Earth.</i></p>

<h3> Dependencies</h3>

- [NodeJS](https://nodejs.org/)
- [Express](https://expressjs.com/)

<h3> Getting started </h3>

1. Create an account on [Gandalf.id](https://gandalf.id/new)

2. Create a a `role` called `users`

3. Add the `permission` to `get` into `/mordor`

4. Create an account called `frodo` and add it to `users`

5. Just install the package:

```console
frodo@shire:~$ npm i gandalf-id
```
6. If you want an authentication (check for `username` and `password`):
```javascript
app.use(require('gandalf-id')(key))
```

7. If you want an authorization (check if an account can use a `method` somewhere):
    
```javascript
const gandalf = require('gandalf-id')(key)

app.get('/mordor', gandalf(['hobbits', 'users']), (req, res, next) => {
  /* You shall not pass...unless you are a hobbit or an user */
})
```
