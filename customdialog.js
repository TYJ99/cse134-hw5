const result = document.querySelector("#result");
const alertDialog = document.querySelector("#alertDialog");
const alertOkBtn = document.querySelector("#alertOk");
const confirmDialog = document.querySelector("#confirmDialog");
const confirmOkBtn = document.querySelector("#confirmOk");
const confirmCancelBtn = document.querySelector("#confirmCancel");
const saferPromptDialog = document.querySelector("#saferPromptDialog");
const saferPromptOkBtn = document.querySelector("#saferPromptOk");
const saferPromptCancelBtn = document.querySelector("#saferPromptCancel");
const dialog = document.querySelectorAll("dialog");
const alertBtn = document.querySelector("#alert");
const confirmBtn = document.querySelector("#confirm");
const saferPromptBtn = document.querySelector("#saferPrompt");
const inputName = document.querySelector("#name");

alertBtn.addEventListener("click", triggerAlert);
confirmBtn.addEventListener("click", triggerConfirm);
saferPromptBtn.addEventListener("click", triggerSaferPrompt);
alertOkBtn.addEventListener("click", closeAlertDialog);
confirmOkBtn.addEventListener("click", setConfirmOk);
confirmCancelBtn.addEventListener("click", setConfirmCancel);
saferPromptOkBtn.addEventListener("click", getInputName);
saferPromptCancelBtn.addEventListener("click", cancelInputName);

function createResult(text, resultText) {
    result.style.display = "block";
    result.classList.add("styleResult");
    result.innerHTML = text + " result: " + resultText;
    result.style.border = "thick double black";
    result.style.padding = "10px";
    result.style.height = "auto";
    result.style.width = "fit-content";
    // result.style.fontWeight = "bold";
}

// function createDialogPosition(index) {
//     dialog[index].style.display = "flex";   
//     dialog[index].style.justifyContent = "center";
//     dialog[index].style.alignItems = "center";
//     // result.style.fontWeight = "bold";
// }

function removeResult() {
    result.style.display = "none";            
}

function closeAlertDialog() {
    alertDialog.close();
}

function triggerAlert() {
    if(result.style.display === "block") {
        removeResult();
    }
    // setTimeout("createAlert()", 100);
    alertDialog.showModal();
}

function setConfirmOk() {
    confirmDialog.close();
    createResult("Confirm", true);    
}

function setConfirmCancel() {
    confirmDialog.close();
    createResult("Confirm", false);
}

function createConfirm() {
    confirmDialog.showModal();
    // setTimeout('createResult("Confirm", isConfirmed)', 600);
}

function triggerConfirm() {
    removeResult();
    setTimeout("createConfirm()", 100);
}

function createSaferPrompt() {
    // let res = DOMPurify.sanitize(prompt("What is your name?", ""));
    // if (res === null) {
    //     res = DOMPurify.sanitize("User didn't enter anything");
    // }
    // createResult("Safer Prompt", res);
    saferPromptDialog.showModal();    
}

function getInputName() {
    theName = DOMPurify.sanitize(inputName.value);
    
    if(theName === "") {
        theName = DOMPurify.sanitize("User didn't enter anything");
    }
    createResult("Safer Prompt", theName);
    saferPromptDialog.close();
}

function cancelInputName() {
    theName = DOMPurify.sanitize("User didn't enter anything");    
    createResult("Safer Prompt", theName);
    saferPromptDialog.close();
}

function triggerSaferPrompt() {
    removeResult();
    setTimeout("createSaferPrompt()", 100);
}


