window.onload = function() {
 fetchPost();
}

async function fetchPost() {
  let queryString = window.location.search;
  let urlParams = new URLSearchParams(window.location.search);
  let postId = urlParams.get('id');  
  
  try {
    const response = await fetch('http://localhost:5000/posts/' + postId);
    const post = await response.json();
    console.log(post);
    let time = new Date(post.date);
    
    document.getElementById('post-content').innerHTML = `
      <h3>${post.title}</h3>
      <p class="author-and-date">Post by <span>${post.author}</span> / ${dateFormat(time)}</p><br>
      <p>${post.content}<br><br>
      <p class="list-item-tags">Tags:<span> ${post.tags}</span></p>
    `; 
    
  } catch (error) {
    console.log(error);
  }
}

// Format created date and time
function dateFormat(time){
  let month =['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${time.getFullYear()} ${time.getDate()} ${month[time.getMonth()]}  ${time.getHours()}:${time.getMinutes()}`
}