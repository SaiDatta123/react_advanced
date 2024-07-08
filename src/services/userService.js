const apiUrl = 'http://localhost:8000/users';

export async function fetchUsers() {
  const response = await fetch(apiUrl);
  return response.json();
}

export async function addUser(user) {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  return response.json();
}

export async function updateUser(id, user) {
  const response = await fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  return response.json();
}

export async function deleteUser(id) {
  const response = await fetch(`${apiUrl}/${id}`, {
    method: 'DELETE'
  });
  return response.json();
}

export async function getUser(id) {
  const response = await fetch(`${apiUrl}/${id}`);
  return response.json();
}
