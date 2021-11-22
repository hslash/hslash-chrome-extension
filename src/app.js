const addTask = document.querySelector("#save");
const close = document.querySelector("#close");

close.addEventListener("click", e => {
  window.close();
})

addTask.addEventListener("click", e => {
  e.preventDefault();

  let url = document.querySelector("#link").value;
  let shortcut = "http://h/" + document.querySelector("#shortcut").value;


  if (!url.length) {
    alert("Please add a task to add");
  } else {
    const obj = {
      url,
      shortcut,
      id: Date.now(),
    };

    chrome.runtime.sendMessage({ type: "save", obj }, function(response) {
      console.log(obj, response.ok);
    });

    document.querySelector("#link").value = "";
    document.querySelector("#shortcut").value = "";
    window.close();
  }
});

