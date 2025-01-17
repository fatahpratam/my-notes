if ('serviceWorker' in navigator)
  navigator.serviceWorker.register('./sw.js');

const notes = JSON.parse(localStorage.getItem('notes')) || [];

function renderNotes(notes) {
  const ul = document.querySelector('#list');

  if (notes.length === 0) {
    const div = document.createElement('div');
    div.classList.add('main__empty');
    div.innerText = 'Press the " + " button to add new note.'
    ul.append(div);
  }
  else {
    notes.forEach(note => {
      const
        li = document.createElement('li'),
        button = document.createElement('button'),
        h2 = document.createElement('h2'),
        p = document.createElement('p')

      li.classList.add('main__li');
      button.classList.add('main__button');
      h2.classList.add('main__h2');
      p.classList.add('main__p');

      h2.innerText = note.title.length === 0 ? 'Untitled' : note.title;
      p.innerText = note.content.length === 0 ? 'Empty' : note.content;

      button.addEventListener('click', () => {
        location.href = `./edit.html?id=${note.id}`
      });

      button.append(h2);
      button.append(p);
      li.append(button);
      ul.append(li);
    });
  }
}
window.addEventListener('DOMContentLoaded', renderNotes(notes));

function handleAddButton() {
  document.querySelector('#add-button').addEventListener('click', () => {
    const newId = Date.now().toString()
    notes.unshift({
      id: newId,
      title: '',
      content: ''
    });
    localStorage.setItem('notes', JSON.stringify(notes));
    location.href = `./edit.html?id=${newId}`;
  });
}
handleAddButton();