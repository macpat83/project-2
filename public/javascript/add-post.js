async function newFormHandler(event) {
    event.preventDefault();
  
    const albumart_url = document.querySelector('input[name="album-art"]').value;
    const album_title = document.querySelector('input[name="album-title"]').value;
    const album_artist = document.querySelector('input[name="album-artist"]').value;
    const review = document.querySelector('input[name="album-review"]').value;
  
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        album_artist,
        album_title,
        albumart_url,
        review
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
