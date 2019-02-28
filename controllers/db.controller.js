const issueSchema = require('../database/issue.schema');
const userSchema = require('../database/users.schema');

const DB = {};

DB.addNew = ({
  issueTitle,
  issueDescription,
  issueRepository,
  issueCreator,
  issueProject
}) => {
  if (!issueTitle || !issueCreator || !issueProject)
    return new Promise((resolve, reject) =>
      reject(new Error(`'issueTitle' can't be empty`))
    );

  return issueSchema.insertMany({
    issueTitle: issueTitle,
    issueDescription: issueDescription,
    issueRepository: issueRepository || '#',
    issueCreator: issueCreator,
    issueProject: issueProject,
    date: Date.now(),
    issueStatus: 'open'
  });
};

DB.find = cond => issueSchema.find(cond).sort({ date: -1 });

DB.updateStatus = (id, status) =>
  status === 'closed'
    ? issueSchema.findByIdAndUpdate(id, { issueStatus: 'closed' })
    : status === 'in-progress'
    ? issueSchema.findByIdAndUpdate(id, { issueStatus: 'in-progress' })
    : status === 'open'
    ? issueSchema.findByIdAndUpdate(id, { issueStatus: 'open' })
    : Promise.reject('Not a valid issue status');

DB.newUser = (email, password) => {
  return userSchema.insertMany({
    email: email,
    password: password
  });
};

module.exports = DB;
