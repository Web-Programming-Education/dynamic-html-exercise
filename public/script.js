const postJson = async function(url, obj) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  });
  return res.ok;
}

async function sendComment(e) {
  e.preventDefault()
  
  const inputData = document
    .forms['add-comment']
    .elements

  const jsonData = {
    "username": inputData['username'].value,
    "title": inputData['title'].value,
    "content": inputData['content'].value
  }

  if (jsonData.username.length < 4) {
    alert("Benutzername zu kurz. Sollte mindestens 4 Zeichen lang sein.");
    return;
  }
  if( jsonData.username.length > 20) {
    alert("Benutzername zu lang. Sollte maximal 20 Zeichen lang sein.");
    return;
  }
  if (!jsonData.title) {
    alert("Kommentar-Titel fehlt.");
    return;
  }
  if (jsonData.content.split(' ').length < 2 && jsonData.content.split('\n').length < 2) {
    alert("Kommentar nicht hilfreich. Sollte mindestens 2 Wörter enthalten.");
    return;
  }

  const successful = await postJson('/comments', jsonData);
  if (successful) {
    renderComment(document.querySelector('#comments'), jsonData)
  } else {
    alert("Failed to add your comments")
  }
}

async function getComments() {
  const response = await fetch('/comments');
  return await response.json()
}

function renderComment(element, comment) {
    const commentElement = document.createElement("div");
    commentElement.classList.add('comment');
    
    const title = document.createElement("h3");
    title.textContent = comment.title
    const user = document.createElement("span");
    user.textContent = comment.username
    const content = document.createElement("p");
    content.textContent = comment.content
    
    commentElement.appendChild(title)
    commentElement.appendChild(user)
    commentElement.appendChild(content)

    element.appendChild(commentElement)
}

function renderComments(element, comments) {
  comments.forEach(c => renderComment(element, c));
}

async function renderComments() {
  const comments = await getComments();
  const container = document.querySelector('#comments');
  comments.forEach(c => renderComment(container, c));
}

renderComments();