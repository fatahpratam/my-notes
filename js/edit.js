if ('serviceWorker' in navigator)
  navigator.serviceWorker.register('/sw.js');

let notes = JSON.parse(localStorage.getItem('notes')) || [];

function getId() {
  return location.search.slice(4);
}

function handleBackButton() {
  document.querySelector('#back-button').addEventListener('click', () => {
    location.href = '/index.html';
  });
}
handleBackButton();

function handleDeleteButton() {
  document.querySelector('#delete-button').addEventListener('click', () => {
    notes = notes.filter(note => note.id !== getId());
    localStorage.setItem('notes', JSON.stringify(notes));
    location.href = '/index.html';
  });
}
handleDeleteButton();

function renderNote(notes, id) {
  const note = notes.find(note => note.id === id);
  document.querySelector('#title').value = note.title;
  document.querySelector('#content').innerText = note.content;
}
renderNote(notes, getId())

function handleInputChange() {
  const id = getId();
  document.querySelector('#title').addEventListener('change', e => {
    notes = notes.map(note => {
      if (note.id === id) {
        return { ...note, title: e.target.value };
      }
      return { ...note };
    });
    localStorage.setItem('notes', JSON.stringify(notes));
  });
  document.querySelector('#content').addEventListener('change', e => {
    notes = notes.map(note => {
      if (note.id === id) {
        return { ...note, content: e.target.value };
      }
      return { ...note };
    });
    localStorage.setItem('notes', JSON.stringify(notes));
  });
}
handleInputChange();