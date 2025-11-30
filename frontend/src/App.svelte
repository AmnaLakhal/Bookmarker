<script>
  import { onMount } from 'svelte';
  
  const API_URL = 'http://localhost:5000/api/bookmarks';
  
  let bookmarks = [];
  let name = '';
  let url = '';
  let editingId = null;
  
  async function fetchBookmarks() {
    const response = await fetch(API_URL);
    bookmarks = await response.json();
  }
  
  async function addBookmark() {
    if (!name || !url) return;
    
    if (editingId) {
      // Mode modification
      await fetch(`${API_URL}/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, url })
      });
      editingId = null;
    } else {
      // Mode ajout
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, url })
      });
    }
    
    name = '';
    url = '';
    fetchBookmarks();
  }
  
  function editBookmark(bookmark) {
    name = bookmark.name;
    url = bookmark.url;
    editingId = bookmark.id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  function cancelEdit() {
    name = '';
    url = '';
    editingId = null;
  }
  
  async function deleteBookmark(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchBookmarks();
  }
  
  function visitSite(url) {
    window.open(url, '_blank');
  }
  
  onMount(fetchBookmarks);
</script>

<main>
  <div class="container">
    <h1 class="title">Bookmarker</h1>
    <p class="subtitle">📗 Bookmark your favorite sites 📗</p>
    
    <form on:submit|preventDefault={addBookmark}>
      <div class="form-group">
        <label>🔖 Site Name</label>
        <input 
          type="text" 
          bind:value={name}
          placeholder="Bookmarker Name"
        />
      </div>
      
      <div class="form-group">
        <label>🔗 Site URL</label>
        <input 
          type="url" 
          bind:value={url}
          placeholder="Website URL"
        />
      </div>
      
      <div class="button-group">
        <button type="submit" class="btn-submit">
          {editingId ? 'Update' : 'Submit'}
        </button>
        {#if editingId}
          <button type="button" class="btn-cancel" on:click={cancelEdit}>
            Cancel
          </button>
        {/if}
      </div>
    </form>
    
    <table>
      <thead>
        <tr>
          <th>Index</th>
          <th>Website Name</th>
          <th>Visit</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {#each bookmarks as bookmark, i}
          <tr>
            <td>{i + 1}</td>
            <td>{bookmark.name}</td>
            <td>
              <button 
                class="btn-visit" 
                on:click={() => visitSite(bookmark.url)}
              >
                🌐 Visit
              </button>
            </td>
            <td>
              <button 
                class="btn-edit" 
                on:click={() => editBookmark(bookmark)}
              >
                ✏️ Edit
              </button>
            </td>
            <td>
              <button 
                class="btn-delete" 
                on:click={() => deleteBookmark(bookmark.id)}
              >
                🗑️ Delete
              </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background: #f5f0e8;
  }
  
  .container {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    background: #f5f0e8;
  }
  
  .title {
    text-align: center;
    font-family: 'Brush Script MT', cursive;
    font-size: 3em;
    margin: 20px 0 10px;
    color: #333;
  }
  
  .subtitle {
    text-align: center;
    color: #7cb342;
    font-size: 1.1em;
    margin-bottom: 30px;
    border-top: 2px dotted #ccc;
    border-bottom: 2px dotted #ccc;
    padding: 10px 0;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
  }
  
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1em;
    box-sizing: border-box;
  }
  
  .button-group {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin: 20px 0;
  }
  
  .btn-submit {
    padding: 10px 40px;
    background: #d32f2f;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1em;
  }
  
  .btn-submit:hover {
    background: #b71c1c;
  }
  
  .btn-cancel {
    padding: 10px 40px;
    background: #757575;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1em;
  }
  
  .btn-cancel:hover {
    background: #616161;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    background: white;
  }
  
  th, td {
    padding: 12px;
    text-align: center;
    border: 1px solid #ddd;
  }
  
  th {
    background: #f5f5f5;
    font-weight: bold;
  }
  
  .btn-visit {
    background: #4caf50;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-visit:hover {
    background: #45a049;
  }
  
  .btn-edit {
    background: #ff9800;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-edit:hover {
    background: #f57c00;
  }
  
  .btn-delete {
    background: #f44336;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .btn-delete:hover {
    background: #da190b;
  }
</style>
