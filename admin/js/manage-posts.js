window.onload = function() {

  admin();
}

async function admin() {
  try {
    const response = await fetch('http://localhost:5000/posts');
    const posts = await response.json();
    
    let postList = '';
    for (let post of posts) {
     //Time function
      let time = new Date(post.date)
      postList += `
        <tr>
          <td>${post.title}</td>
          <td>${post.author}</td>
          <td>${post.tags}</td>
          <td>${dateFormat(time)}</td>
          <td><a href="update-post.html?id=${post._id}">Update</a>|<a href="#" class="delete-post-link" data-id="${post['_id']}">Delete</a></td>
        </tr>
      `;

      document.getElementById('tableBody').innerHTML = postList;
    }
    
    // Delete function
    deletePostEvent();

  } catch (error) {
    console.log(error);
  }
}

// Function for deleting a post
function deletePostEvent() {
  let deletePostLinks = document.getElementsByClassName('delete-post-link');

  for (deletePostLink of deletePostLinks) {
    deletePostLink.addEventListener('click', async function(e) {
      e.preventDefault();

      // connects the clicked link with the right post
      let clickedLink = e.target;
      console.log(clickedLink);
      let postId = clickedLink.dataset.id;
      console.log(postId);
       try {
        //fetches the post
        await fetch('http://localhost:5000/posts/' + postId, {
          method: 'DELETE'
        });

        //Removes the td and the tr of the clicked object
        clickedLink.parentNode.parentNode.remove();
      } catch(error){
        console.log(error);
      }
    })
  }
}
// Format created date and time
function dateFormat(time){
    let month =['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    return `${time.getFullYear()} ${time.getDate()} ${month[time.getMonth()]}  ${time.getHours()}:${time.getMinutes()}`
}
/* ●admin/index.html○A link at the top of the page, which navigates tothe blog page, ie toindex.html
○Button/link that navigates toadmin/create-post.html○
A list of all posts displayed in a table <table>
○The table should have the following columns■
Title: Displays post titles■
Author: Displays author names■
Date: Display when the posts were created■

2 buttons/links●
Button/link for updating existing post ----Navigatestoadmin/update-post.html●
Button/link for deleting existing post */