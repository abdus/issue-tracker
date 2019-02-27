const R = require('express').Router();
const DBController = require('../controllers/db.controller')

R.get('/', (req, res) => DBController.find().then(d => res.render('pages/index', { issues: d})));

R.post('/issue/new', (req, res) => {
  
  DBController.addNew({
    issueTitle: req.body['issue-title'],
    issueRepository: req.body['issue-repository'],
    issueDescription: req.body['issue-description'],
    issueProject: req.body['issue-project-name'],
    issueCreator: req.body['issue-creator']
  })
  .then(d => res.redirect('/'))
  .catch(e => {
    console.log(e.message);
    return res.send(`'Title of the Issue' field is required.`)
  })
})

R.put('/issue/:id', (req, res) => {
  if (process.env.USER_PASSWORD === req.body.password) {
    DBController.updateStatus(req.params.id, req.body.status)
    .then(() => res.json({ message: 'success', code: 202 }))
    .catch(err => res.json({ message: err.message || 'no message', code: 402 }))
  } else {
    res.json({ message: 'Password Error', code: 400 })
  }
})

module.exports = R;