window.onload = function () {
    createPost();
}

function createPost() {
    // Retrieve form-data
    const form = document.getElementById('createPostForm');
    form.addEventListener('submit', async function (e) {
        e.preventDefault();


        // Send request
        try {
            await fetch('http://localhost:5000/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'

                },
                body: formDatatoJSON(e.target)
            });

          window.location.replace('index.html');
        } catch (error) {
            console.log(error);
        }
    });
}


function formDatatoJSON(form) {

    let formInput = new FormData(form);
    let obj = {};
    for (let key of formInput.keys()) {
        let inputData = formInput.getAll(key);
        if (inputData.length > 1) {
            obj[key] = inputData;
        } else {
            obj[key] = inputData[0];
        }
    }

        return JSON.stringify(obj);
}