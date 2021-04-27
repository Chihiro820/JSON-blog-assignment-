//Reload the page when browser is load
window.onload = function(){
    fetchAllPosts();
}

async function fetchAllPosts(){
    try{
        //fetch all data
        const response = await fetch('http://localhost:5000/posts');
        const post = await response.json();
        console.log(post);
        //Loop all data and extract the datas 
        let data = "";
        for(let x of post){
            let time = new Date(x.date);
            const shortText = x.content.slice(0, 100);
            console.log(shortText);
        data +=`
            <li>
                <h3>${x.title}</h3>
                <p class="author-and-date">Posted by <span>${x.author}</span> / ${dateFormat(time)}</p><br>
                <p>${shortText}... <a href="post.html?id=${x['_id']}">Read More</a><br><br>
                <p class="list-item-tags">Tags:<span> ${x.tags}</span></p>
            </li>
           
        `
        } 
        document.getElementById('content').innerHTML=data;
    }
    catch(error){
        console.log(error);
    }
}

// Format created date and time
function dateFormat(time){
    let month =['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    return `${time.getFullYear()} ${time.getDate()} ${month[time.getMonth()]}  ${time.getHours()}:${time.getMinutes()}`
}