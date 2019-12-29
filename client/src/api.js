const api ='http://localhost:3000/api'

function getHeader(contentType='application/json') {
  const headers = new Headers()
  if (contentType) {
     headers.append('Content-Type', contentType)
  }
  return headers;
}

export function getBoards() {
  return fetch(`${api}/boards`, {
     method: 'GET',
  }).then(resp => resp.json())
}

export function addNewBoard(values) {
  return fetch(`${api}/board/new`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(values),
  }).then(resp => resp.json())
}

export function getLists(id) {
  return fetch(`${api}/lists/${id}`, {
     method: 'GET',
  }).then(resp => resp.json())
}

export function addNewList(values) {
  return fetch(`${api}/list/new`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(values),
  }).then(resp => resp.json())
}

export function updateTaskAssociation(values) {
  return fetch(`${api}/tasks/update_association`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(values),
  }).then(resp => resp.json())
}

export function addTaskInfo(values) {
  return fetch(`${api}/task/new`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(values),
  }).then(resp => resp.json())
}

export function getTaskInfo(id) {
  return fetch(`${api}/task/ind/${id}`, {
     method: 'GET',
  }).then(resp => resp.json())
}

export function addComment(values) {
  return fetch(`${api}/comment/new`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(values),
  }).then(resp => resp.json())
}

export function deleteComment(values) {
  return fetch(`${api}/comment/delete`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(values),
  }).then(resp => resp.json())
}

export function deleteTask(values) {
  return fetch(`${api}/task/delete`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(values),
  }).then(resp => resp.json())
}