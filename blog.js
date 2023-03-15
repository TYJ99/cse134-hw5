function initializePage() {
    if(localStorage.length <= 1) {
        for (const element of noPost){
            element.style.display = "inline";
        }
        localStorage.setItem("posts", JSON.stringify({}));
        localStorage.setItem("id", "0");
        localStorage.setItem("availableId", JSON.stringify([]));
        localStorage.setItem("order", JSON.stringify([]));
    }else if(localStorage.length > 1){
        let posts = JSON.parse(localStorage.getItem("posts"));
        let order = JSON.parse(localStorage.getItem("order"));
        let addingIds = Object.keys(posts);
        if(addingIds.length > 0) {
            for (const element of hasPost){
                element.style.display = "block";
            }
            for(const ord in order) {
                console.log("order: ", ord);
                let title = posts[order[ord]].title;
                let date = posts[order[ord]].date;
                let summary = posts[order[ord]].summary;
                let record = `${title}: ${summary} - ${date}`;
                addRecordOnScreen(record, ord, title, date, summary);
            }
        }else {
            for (const element of noPost){
                element.style.display = "inline";
            }
        }
    }
}
window.onload = function(){
    initializePage();
}
const currDate = new Date();

let day = currDate.getDate();
let month = currDate.getMonth() + 1;
let year = currDate.getFullYear();
let currentDate = "";
if(month >= 10) {
    currentDate = `${year}-${month}-${day}`;
}else {
    currentDate = `${year}-0${month}-${day}`;
}

// let posts = {};
// let id = 0;
// let availableId = [];

function getID() {
    let id = parseInt(localStorage.getItem("id"));
    let availableId = JSON.parse(localStorage.getItem("availableId"));
    let res = id;
    if(availableId.length == 0) {
        id++;
        localStorage.setItem("id", id.toString());
        return res;
    }
    res = availableId.shift();
    localStorage.setItem("availableId", JSON.stringify(availableId));
    return res;
}

const addPostDialog = document.querySelector("#addPostDialog");
const addPostBtns = document.querySelectorAll(".addPostBtn");
const addPostOkBtn = document.querySelector("#addPostOkBtn");
const addPostCancelBtn = document.querySelector("#addPostCancelBtn");
const postTitle = document.querySelector("#title");
const postDate = document.querySelector("#date");
const postSummary = document.querySelector("#summary");
const listOfPosts = document.querySelector("#listOfPosts");
const hasPost = document.querySelectorAll(".hasPost");
const noPost = document.querySelectorAll(".noPost");
const deleteBtns = document.querySelectorAll(".deleteBtn");
// const records = document.querySelectorAll(".record");
const deletePostDialog = document.querySelector("#deletePostDialog");
const deletePostNoBtn = document.querySelector("#deletePostNoBtn");
const deletePostYesBtn = document.querySelector("#deletePostYesBtn");


let deleteBtnId = "";
let editBtnId = "";
let currMode = "";

for(const addPostBtn of addPostBtns) {
    addPostBtn.addEventListener("click", triggerAddPost);
}

function triggerAddPost() {
    currMode = "add";
    addPostDialog.showModal(); 
    cleanAddPostDialog();
}

deletePostNoBtn.addEventListener("click", () => {
    deletePostDialog.close();
}) 

deletePostYesBtn.addEventListener("click", () => {
    console.log("deleteBtnId: ", deleteBtnId);
    let order = JSON.parse(localStorage.getItem("order"));
    for( let i = 0; i < order.length; i++){ 
        console.log("order[i]: ", order[i]);
        console.log("deleteBtnId: ", deleteBtnId);
        if ( order[i] == deleteBtnId) {
            order.splice(i, 1); 
            console.log("in order: ", order);
        }
     }
    localStorage.setItem("order", JSON.stringify(order));

    deleteRecordFromScreen(deleteBtnId);
    let posts = JSON.parse(localStorage.getItem("posts"));
    if(Object.keys(posts).length == 0) {
        for (const element of hasPost){
            element.style.display = "none";
        }
        for (const element of noPost){
            element.style.display = "inline";
        }
    }
    deletePostDialog.close();
})

function deleteRecordFromScreen(dBtnId) {
    const records = document.querySelectorAll(".record");
    for(const record of records) {
        console.log("dBtnId: ", dBtnId);
        console.log("record.id: ", record.id);
        if(dBtnId === record.id) {
            record.remove();
            let posts = JSON.parse(localStorage.getItem("posts"));
            delete posts[record.id];
            localStorage.setItem("posts", JSON.stringify(posts));
            let availableId = JSON.parse(localStorage.getItem("availableId"));
            availableId.push(parseInt(dBtnId));
            localStorage.setItem("availableId", JSON.stringify(availableId));
            break;
        }
    }
}

function cleanAddPostDialog() {
    postTitle.value = "";
    postDate.value = "";
    postSummary.value = "";
}

function addRecordOnScreen(record, addingId, title, date, summary) {
    let posts = JSON.parse(localStorage.getItem("posts"));
    if(Object.keys(posts).length == 1) {
        for (const element of hasPost){
            element.style.display = "block";
        }
        for (const element of noPost){
            element.style.display = "none";
        }
    }
    const li = document.createElement("li");
    const deleteBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    deleteBtn.id = addingId;
    editBtn.id = addingId;
    li.id = addingId;
    deleteBtn.classList.add("deleteBtn");
    li.classList.add("record");
    editBtn.classList.add("editBtn");
    deleteBtn.innerHTML = "delete";
    editBtn.innerHTML = "edit";
    li.appendChild(document.createTextNode(record));
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    listOfPosts.appendChild(li);
    deleteBtn.addEventListener("click", () => {
        deleteBtnId = deleteBtn.id;
        deletePostDialog.showModal();
    })
    editBtn.addEventListener("click", () => {
        currMode = "edit";
        editBtnId = editBtn.id;
        addPostDialog.showModal();
        initializeEditDialog(title, date, summary);
    })
}

function initializeEditDialog(title, date, summary) {
    postTitle.value = title;
    postDate.value = date;
    postSummary.value = summary;
}

function editRecordOnScreen(recordStr, post) {
    const records = document.querySelectorAll(".record");
    for(const record of records) {
        console.log("editBtnId: ", editBtnId);
        console.log("record.id: ", record.id);
        if(editBtnId === record.id) {
            record.innerHTML = recordStr;
            let posts = JSON.parse(localStorage.getItem("posts"));
            posts[record.id] = post;
            localStorage.set("posts", JSON.stringify(posts));
            break;
        }
    }
}

addPostOkBtn.addEventListener("click", () => {
    let title = DOMPurify.sanitize(postTitle.value);
    let date = DOMPurify.sanitize(postDate.value);
    let summary = DOMPurify.sanitize(postSummary.value);
    if(!title) {
        title = "no title";
    }
    if(!date) {
        date = currentDate;
    }
    if(!summary) {
        summary = "no summary";
    }

    let post = {
        title: title,
        date: date,
        summary: summary
    }
    let record = `${title}: ${summary} - ${date}`;
    if(currMode === "add") {
        const addingId = getID().toString();
        let order = JSON.parse(localStorage.getItem("order"));
        order.push(addingId);
        localStorage.setItem("order", JSON.stringify(order));
        let posts = JSON.parse(localStorage.getItem("posts"));
        console.log("posts: ", posts);
        posts[addingId] = post;
        localStorage.setItem("posts", JSON.stringify(posts));
        addRecordOnScreen(record, addingId, title, date, summary);
    }else if(currMode === "edit") {
        editRecordOnScreen(record, post);
    }
    addPostDialog.close();
})

addPostCancelBtn.addEventListener("click", () => {
    addPostDialog.close();
})