
const form = document.querySelector("#form");
const postBtn = document.querySelector("#postBtn");
const getBtn = document.querySelector("#getBtn");
const putBtn = document.querySelector("#putBtn");
const deleteBtn = document.querySelector("#deleteBtn");
const outputResponse = document.querySelector("#response");
const outputTemplate = document.querySelector("#outputTemplate");

postBtn.addEventListener("click", handlePost);
getBtn.addEventListener("click", handleGet);
putBtn.addEventListener("click", handlePut);
deleteBtn.addEventListener("click", handleDelete); 

async function handlePost() {   
    outputResponse.innerHTML = "";
    form.date.value = new Date(); 
    const formData = new FormData(form);
    const data = new URLSearchParams(formData);
    const options = {
        method: "post",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: data
    };

    try {
        const response = await fetch("https://httpbin.org/post", options);
        if (!response.ok) {
            const message = 'Post Error: ' + response.status;
            throw new Error(message);
        }
        const data = await response.json();
        console.log(data);
        const formData = data.form;
        console.log(formData);
        const outputHeader = outputTemplate.content.querySelector("h3");
        const outputID = outputTemplate.content.querySelector("#outputID");
        const outputArticleName = outputTemplate.content.querySelector("#outputArticleName");
        const outputArticleBody = outputTemplate.content.querySelector("#outputArticleBody");
        const outputArticleDate = outputTemplate.content.querySelector("#outputArticleDate");
        console.log(outputID);
        outputHeader.textContent = "The article you POST to the server: "
        outputID.textContent = formData.id;
        outputArticleName.textContent = formData.article_name;
        outputArticleBody.textContent = formData.article_body;
        outputArticleDate.textContent = formData.date;
        let clone = document.importNode(outputTemplate.content, true);
        outputResponse.append(clone);

        const pre = document.createElement("pre");
        pre.innerHTML = `POST: <br>${JSON.stringify(data, undefined, 2)}`;
        outputResponse.append(pre);

    }catch(err) {
        console.log('Post Error:' + err);
    }
    
}

async function handleGet() {
    outputResponse.innerHTML = "";
    const options = {
        method: "get",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": "token-value",
        }
    };

    try {
        const response = await fetch("https://httpbin.org/get", options);
        if (!response.ok) {
            const message = 'Get Error: ' + response.status;
            throw new Error(message);
        }
        const data = await response.json();
        console.log(data);
        const pre = document.createElement("pre");
        pre.innerHTML = `GET: <br>${JSON.stringify(data, undefined, 2)}`;
        outputResponse.append(pre);

    }catch(err) {
        console.log('Get Error:' + err);
    }
    
}

async function handlePut() {   
    outputResponse.innerHTML = "";
    form.date.value = new Date(); 
    const formData = new FormData(form);
    const data = new URLSearchParams(formData);
    const options = {
        method: "put",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: data
    };

    try {
        const response = await fetch("https://httpbin.org/put", options);
        if (!response.ok) {
            const message = 'Put Error: ' + response.status;
            throw new Error(message);
        }
        const data = await response.json();
        console.log(data);
        const formData = data.form;
        console.log(formData);
        const outputHeader = outputTemplate.content.querySelector("h3");
        const outputID = outputTemplate.content.querySelector("#outputID");
        const outputArticleName = outputTemplate.content.querySelector("#outputArticleName");
        const outputArticleBody = outputTemplate.content.querySelector("#outputArticleBody");
        const outputArticleDate = outputTemplate.content.querySelector("#outputArticleDate");
        console.log(outputID);
        outputHeader.textContent = "The article you PUT to the server: "
        outputID.textContent = formData.id;
        outputArticleName.textContent = formData.article_name;
        outputArticleBody.textContent = formData.article_body;
        outputArticleDate.textContent = formData.date;
        let clone = document.importNode(outputTemplate.content, true);
        outputResponse.append(clone);

        const pre = document.createElement("pre");
        pre.innerHTML = `PUT: <br>${JSON.stringify(data, undefined, 2)}`;
        outputResponse.append(pre);

    }catch(err) {
        console.log('Put Error:' + err);
    }
    
}

async function handleDelete() {  
    outputResponse.innerHTML = "";       
    const options = {
        method: "delete",
    };

    try {
        const response = await fetch("https://httpbin.org/delete", options);
        if (!response.ok) {
            const message = 'Put Error: ' + response.status;
            throw new Error(message);
        }
        const data = await response.json();
        console.log(data);
        const pre = document.createElement("pre");
        pre.innerHTML = `DELETE: <br>${JSON.stringify(data, undefined, 2)}`;
        outputResponse.append(pre);

    }catch(err) {
        console.log('Put Error:' + err);
    }
    
}



