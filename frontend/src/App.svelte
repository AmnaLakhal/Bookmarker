<script>
  import { onMount } from 'svelte';
  import { fade, fly, scale } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  
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
      await fetch(`${API_URL}/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, url })
      });
      editingId = null;
    } else {
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
  
  function getFavicon(url) {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch {
      return '';
    }
  }
  
  onMount(fetchBookmarks);
</script>

<main>
  <div class="background-gradient"></div>
  
  <div class="container" in:fade={{ duration: 600 }}>
    <header class="header">
      <div class="logo">
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25 5L30 20H45L33 29L38 44L25 35L12 44L17 29L5 20H20L25 5Z" fill="url(#gradient)" stroke="#fff" stroke-width="2"/>
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <h1 class="title">Bookmarker</h1>
      <p class="subtitle">Organize your favorite websites beautifully</p>
    </header>
    
    <div class="form-card" in:fly={{ y: 20, duration: 500, delay: 200 }}>
      <h2 class="form-title">
        {#if editingId}
          ✏️ Edit Bookmark
        {:else}
          ➕ Add New Bookmark
        {/if}
      </h2>
      
      <form on:submit|preventDefault={addBookmark}>
        <div class="form-group">
          <label for="name">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
            Site Name
          </label>
          <input 
            id="name"
            type="text" 
            bind:value={name}
            placeholder="e.g., Google, GitHub, YouTube"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="url">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
            </svg>
            Website URL
          </label>
          <input 
            id="url"
            type="url" 
            bind:value={url}
            placeholder="https://example.com"
            required
          />
        </div>
        
        <div class="button-group">
          <button type="submit" class="btn btn-primary">
            {#if editingId}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Update Bookmark
            {:else}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add Bookmark
            {/if}
          </button>
          {#if editingId}
            <button type="button" class="btn btn-secondary" on:click={cancelEdit} transition:scale>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              Cancel
            </button>
          {/if}
        </div>
      </form>
    </div>
    
    {#if bookmarks.length === 0}
      <div class="empty-state" in:fade>
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
        </svg>
        <h3>No bookmarks yet</h3>
        <p>Start adding your favorite websites above!</p>
      </div>
    {:else}
      <div class="bookmarks-grid">
        {#each bookmarks as bookmark (bookmark.id)}
          <div 
            class="bookmark-card" 
            class:editing={editingId === bookmark.id}
            in:scale={{ duration: 300 }}
            out:scale={{ duration: 200 }}
            animate:flip={{ duration: 300 }}
          >
            <div class="bookmark-header">
              <div class="favicon">
                <img src={getFavicon(bookmark.url)} alt="" on:error={(e) => e.target.style.display = 'none'} />
              </div>
              <div class="bookmark-info">
                <h3 class="bookmark-name">{bookmark.name}</h3>
                <a href={bookmark.url} target="_blank" rel="noopener noreferrer" class="bookmark-url">
                  {bookmark.url}
                </a>
              </div>
            </div>
            
            <div class="bookmark-actions">
              <button 
                class="btn-icon btn-visit" 
                on:click={() => visitSite(bookmark.url)}
                title="Visit website"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </button>
              
              <button 
                class="btn-icon btn-edit" 
                on:click={() => editBookmark(bookmark)}
                title="Edit bookmark"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </button>
              
              <button 
                class="btn-icon btn-delete" 
                on:click={() => deleteBookmark(bookmark.id)}
                title="Delete bookmark"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                  <line x1="10" y1="11" x2="10" y2="17"/>
                  <line x1="14" y1="11" x2="14" y2="17"/>
                </svg>
              </button>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</main>

<style>
  :global(*) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :global(body) {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background: #0f0f23;
    color: #e0e0e0;
    overflow-x: hidden;
  }
  
  .background-gradient {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    opacity: 0.1;
    z-index: -1;
  }
  
  main {
    min-height: 100vh;
    padding: 2rem 1rem;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  /* Header */
  .header {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .logo {
    display: inline-block;
    margin-bottom: 1rem;
    animation: float 3s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  .title {
    font-size: 3.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 0.5rem;
    letter-spacing: -1px;
  }
  
  .subtitle {
    font-size: 1.1rem;
    color: #a0a0a0;
    font-weight: 400;
  }
  
  /* Form Card */
  .form-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 2rem;
    margin-bottom: 3rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }
  
  .form-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #e0e0e0;
    font-size: 0.95rem;
  }
  
  input {
    width: 100%;
    padding: 0.875rem 1rem;
    background: rgba(255, 255, 255, 0.08);
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    font-size: 1rem;
    color: #fff;
    transition: all 0.3s ease;
  }
  
  input:focus {
    outline: none;
    border-color: #667eea;
    background: rgba(255, 255, 255, 0.12);
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
  }
  
  input::placeholder {
    color: #666;
  }
  
  .button-group {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
  }
  
  .btn {
    flex: 1;
    padding: 0.875rem 1.5rem;
    border: none;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
  
  .btn-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  }
  
  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
  }
  
  .btn-primary:active {
    transform: translateY(0);
  }
  
  .btn-secondary {
    background: rgba(255, 255, 255, 0.1);
    color: #e0e0e0;
    border: 2px solid rgba(255, 255, 255, 0.2);
  }
  
  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
  }
  
  /* Empty State */
  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
    color: #666;
  }
  
  .empty-state svg {
    opacity: 0.3;
    margin-bottom: 1.5rem;
  }
  
  .empty-state h3 {
    font-size: 1.5rem;
    color: #888;
    margin-bottom: 0.5rem;
  }
  
  .empty-state p {
    font-size: 1rem;
    color: #666;
  }
  
  /* Bookmarks Grid */
  .bookmarks-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1.5rem;
  }
  
  .bookmark-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 1.5rem;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  
  .bookmark-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .bookmark-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
    border-color: rgba(255, 255, 255, 0.2);
  }
  
  .bookmark-card:hover::before {
    opacity: 1;
  }
  
  .bookmark-card.editing {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
  }
  
  .bookmark-header {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  
  .favicon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    overflow: hidden;
  }
  
  .favicon img {
    width: 32px;
    height: 32px;
    object-fit: contain;
  }
  
  .bookmark-info {
    flex: 1;
    min-width: 0;
  }
  
  .bookmark-name {
    font-size: 1.25rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 0.25rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .bookmark-url {
    font-size: 0.875rem;
    color: #888;
    text-decoration: none;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: color 0.2s ease;
  }
  
  .bookmark-url:hover {
    color: #667eea;
  }
  
  .bookmark-actions {
    display: flex;
    gap: 0.75rem;
  }
  
  .btn-icon {
    flex: 1;
    padding: 0.75rem;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.08);
    color: #e0e0e0;
  }
  
  .btn-icon:hover {
    transform: translateY(-2px);
  }
  
  .btn-icon:active {
    transform: translateY(0);
  }
  
  .btn-visit {
    border: 2px solid rgba(76, 175, 80, 0.3);
  }
  
  .btn-visit:hover {
    background: rgba(76, 175, 80, 0.2);
    border-color: rgba(76, 175, 80, 0.5);
    color: #4caf50;
  }
  
  .btn-edit {
    border: 2px solid rgba(255, 152, 0, 0.3);
  }
  
  .btn-edit:hover {
    background: rgba(255, 152, 0, 0.2);
    border-color: rgba(255, 152, 0, 0.5);
    color: #ff9800;
  }
  
  .btn-delete {
    border: 2px solid rgba(244, 67, 54, 0.3);
  }
  
  .btn-delete:hover {
    background: rgba(244, 67, 54, 0.2);
    border-color: rgba(244, 67, 54, 0.5);
    color: #f44336;
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    .title {
      font-size: 2.5rem;
    }
    
    .bookmarks-grid {
      grid-template-columns: 1fr;
    }
    
    .button-group {
      flex-direction: column;
    }
  }
</style>
