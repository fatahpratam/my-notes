// Fungsi if ini digunakan untuk mengecek apakah serviceWorker telah didukung oleh browser client. Jika Ya, maka akan melanjutkan untuk menginstall service worker.
if ('serviceWorker' in navigator)
  navigator.serviceWorker.register('./sw.js');

// Mengambil dan menyimpan daftar notes dari localStorage. Jika localStorage kosong, maka akan membuat daftar kosong baru.
let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Fungsi untuk mengembalikan id note dari url.
function getId() {
  return location.search.slice(4);
}

// Fungsi untuk menambah fungsionalitas ke tombol kembali. Jika tombol diklik, maka akan kembali ke halaman utama (index.html).
function handleBackButton() {
  document.querySelector('#back-button').addEventListener('click', () => {
    location.href = './index.html';
  });
}
handleBackButton();

// Fungsi untuk menambah fungsionalitas ke tombol 🗑. Jika tombol diklik, maka akan menghapus note dan juga kembali ke halaman utama.
function handleDeleteButton() {
  document.querySelector('#delete-button').addEventListener('click', () => {
    notes = notes.filter(note => note.id !== getId());
    localStorage.setItem('notes', JSON.stringify(notes));
    location.href = './index.html';
  });
}
handleDeleteButton();

// Fungsi untuk menampilkan judul note dan konten note ke halaman.
function renderNote(notes, id) {
  const note = notes.find(note => note.id === id);
  document.querySelector('#title').value = note.title;
  document.querySelector('#content').innerText = note.content;
}
renderNote(notes, getId())

// Fungsi yang digunakan untuk menyimpan berbagai perubahan ke localStorage ketika pengguna mengetik di input judul note dan input konten note.
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