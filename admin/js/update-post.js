window.onload = function(){
    updatePost();
    prefill()
}
//Update function
async function updatePost(){
    //Retrieve ID which will be updated
    let retrieve = window.location.search;
    let params = new URLSearchParams(retrieve);
    let idPost = params.get('id');
    //console.log(idPost);
    const updatePost = document.getElementById('update-post');
    updatePost.addEventListener('submit',async function(e){
        e.preventDefault();
        //console.log(e.target);
    try{
        await fetch('http://localhost:5000/posts/'+idPost,{
            method:'PATCH',
            headers: {
                  'Content-Type': 'application/json'
                },
                body:AllData(e.target)
        }); window.location.replace('index.html');
    }
    catch(error){
        console.log(error);
    }
    });
    
}
//Retrieve data from form enteard element
function AllData(form) {
    let obj = {};
    let formData = new FormData(form);
    
    for (let key of formData.keys()) {
        //console.log(key);
        let inputData = formData.getAll(key);
        //console.log(inputData);

        if (inputData.length > 1) {
            obj[key] = inputData;
        } else {
            obj[key] = inputData[0];
        }
    }

     console.log(obj);
    return JSON.stringify(obj);
}

//Prefill original contents in the form
async function prefill(){
    //Retrieve ID 
    let retrieve = window.location.search;
    let params = new URLSearchParams(retrieve);
    let idPost = params.get('id');
    //console.log(idPost);
    try{
        let response=await fetch('http://localhost:5000/posts/'+idPost);
        let post = await response.json();
        //console.log(post);
        //Filling original contents in form
        document.getElementById('title').value=post.title;
        document.getElementById('author').value=post.author;
        document.getElementById('content').innerHTML=post.content;
    }
    catch(error){
        console.log(error);
    }
}