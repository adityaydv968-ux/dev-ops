// 1. Select DOM elements
const noteForm = document.getElementById('note-form');
const noteTitle = document.getElementById('note-title');
const noteContent = document.getElementById('note-content');
const notesContainer = document.getElementById('notes-container');

// 2. Load existing notes from browser's LocalStorage or start with empty array
let notes = JSON.parse(localStorage.getItem('dev_notes')) || [];

// 3. Function to display notes on screen
function renderNotes() {
  notesContainer.innerHTML = '';
  
  if (notes.length === 0) {
    notesContainer.innerHTML = '<p style="color: #64748b; text-align: center;">No notes added yet.</p>';
    return;
  }

  notes.forEach((note, index) => {
    const card = document.createElement('div');
    card.classList.add('note-card');
    card.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
    `;
    notesContainer.appendChild(card);
  });
}

// 4. Function to add a new note
noteForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevents page refresh on submit
  
  const newNote = {
    title: noteTitle.value,
    content: noteContent.value
  };

  notes.push(newNote);
  localStorage.setItem('dev_notes', JSON.stringify(notes)); // Save to browser storage
  
  noteTitle.value = '';
  noteContent.value = '';
  renderNotes();
});

// 5. Function to delete a note
function deleteNote(index) {
  notes.splice(index, 1);
  localStorage.setItem('dev_notes', JSON.stringify(notes));
  renderNotes();
}

// Initial render call when page loads
renderNotes();