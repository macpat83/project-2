async function editFormHandler(event) {
  event.preventDefault();
  const albumart_url = document.querySelector('input[name="album-art"]').value;
  const album_title = document.querySelector('input[name="album-title"]').value;
  const album_artist = document.querySelector('input[name="album-artist"]').value;
  const review = document.querySelector('input[name="album-review"]').value;

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  const response = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
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
    document.location.replace('/dashboard/');
  } else {
    alert(response.statusText);
  }

}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);