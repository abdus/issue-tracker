let new_issue__div = document.getElementById('new-issue');
let issue_form__div = document.querySelector('#issue-form');

issue_form__div.toggle_stats = false;
new_issue__div.onclick = () => {
  issue_form__div.toggle_stats = issue_form__div.classList.toggle('issue-form-show');
  if (issue_form__div.toggle_stats) {
    new_issue__div.innerHTML = 'Close';
    new_issue__div.style.background = 'red';
    document.body.style.height = '100vh';
    document.body.style.overflow = 'hidden';
  } else {
    new_issue__div.innerHTML = 'New Issue';
    new_issue__div.style.background = 'darkgreen';
    document.body.style.height = 'auto';
    document.body.style.overflow = 'auto';
  }
  
}

const updateIssueStatus = (id, status, password) => {
  return fetch(`/issue/${id}`, {
    body: JSON.stringify({ status: status, password: password }),
    method: 'PUT',
    headers: {
    'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
}

let closed__span = document.querySelectorAll('.status-close');
let in_progress__span = document.querySelectorAll('.status-in-progress');
let open__span = document.querySelectorAll('.status-open');

[...closed__span].forEach(e => e.addEventListener('click', f => {
  updateIssueStatus(e.getAttribute('data-id'), 'closed', getCookie('password'))
  .then(r => r.code !== 202 ? null : window.location.reload());
}));

[...in_progress__span].forEach(e => e.addEventListener('click', f => {
  updateIssueStatus(e.getAttribute('data-id'), 'in-progress', getCookie('password'))
  .then(r => r.code !== 202 ? null : window.location.reload());
}));

[...open__span].forEach(e => e.addEventListener('click', f => {
  updateIssueStatus(e.getAttribute('data-id'), 'open', getCookie('password'))
  .then(r => r.code !== 202 ? null : window.location.reload());
}));





const getCookie = (cname) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
} 