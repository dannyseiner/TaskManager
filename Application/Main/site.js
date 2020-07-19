const timerStart = Date.now();
const url = {
  github: "https://github.com/YoungDaggerDee/ToDoApp",
  settings: "../../JSON/settings.json",
  package: "../../package.json",
  version_log: "../../JSON/version_log.json",
  local_storage: {
    saved_tasks: "../../local_storage/saved_task.json",
  },
  github_package:
    "https://raw.githubusercontent.com/YoungDaggerDee/ToDoApp/master/package.json",
};
let dev_mode = (direction = false);
let tasks = [];
const versions = {};
let priority = 0;
const body = document.querySelector("body");
const elements = {
  ul: document.querySelector(".list-group"),
  input: document.querySelector("#input"),
};
// LOAD VERSION && CHECK IF ITS UP TO DATE
$.getJSON(url.package, (local_data) => {
  versions["local"] = local_data.version;
  console.log(local_data["log-message"]);
});
$.getJSON(url.github_package, (data) => {
  versions["local"] = versionInt(versions["local"]);
  versions["server"] = versionInt(data.version);
  if (versions["server"] - versions["local"] >= 0) {
    $("#updates-count").html(versions["server"] - versions["local"]);
    $("#updates-count").removeClass("d-none");
  } else {
    $("#updates-count").addClass("d-none");
  }
});
// MAKE INT FROM VERSION
const versionInt = (e) => {
  return parseInt(e[0] + e[2] + e[4]);
};
// LOAD SETTINGS
$.getJSON(url.settings, (data) => {
  fillList(data.from);
  mode(!data.dark_mode);
});
// DEVELOPMENT MODE
$.getJSON(url.package, (data) => {
  if (data.mode.toLowerCase() == "development") {
    margin = 3;
    $("#app-header").html(`${data.version} - DEV`);
    $("#devtoggle").removeClass("d-none");
    $("#loadtime").removeClass("d-none");
    $("#copyright").addClass("d-none");
    $("#github").removeClass("d-none");
  }
  if (data.mode.toLowerCase() == "production") {
    margin = 4;
    $("#footer-text").css("display", "none");
    $("#devtoggle").addClass("d-none");
    $("#github").addClass("d-none");
    $("#loadtime").addClass("d-none");
    updateSize``;
  }
});
// TASK CLASS
class Task {
  constructor(text, priority) {
    this.text = text;
    this.priority = priority;
    this.favorite = false;
    this.done = false;
  }
}
// MARK OR UNMARK: AS DONE
function setActive(e) {
  if (e.classList.contains("t")) {
    e.innerHTML = `<del class="text-muted">${tasks[e.id].text}</del>`;
    tasks[e.id].done = true;
    e.classList.remove("t");
  } else {
    e.classList.add("t");
    tasks[e.id].done = false;
    e.innerHTML = tasks[e.id].text;
  }
}
// SET PRIORITY
const setPriority = (e) => {
  priority = e;
};
// ADD TASK
function Add() {
  if (tasks.includes(input.value) || input.value.length <= 0) {
    alert("Invalid Task!");
    return;
  } else {
    if (input.value.includes("#1")) {
      let tmp = input.value.replace("#1", "");
      tasks.push(new Task(tmp.trim(), 0));
    } else if (input.value.includes("#2")) {
      let tmp = input.value.replace("#2", "");
      tasks.push(new Task(tmp.trim(), 1));
    } else if (input.value.includes("#3")) {
      let tmp = input.value.replace("#3", "");
      tasks.push(new Task(tmp.trim(), 2));
    } else if (priority != 0) {
      tasks.push(new Task(input.value, priority));
    } else {
      tasks.push(new Task(input.value, 0));
    }
    fillList("none", "none");
    updateSize``;
    input.value = "";
  }
}
// REMOVE TASK
const removeTask = (e) => {
  let id = e.id;
  tasks.splice(id, 1);
  fillList("none", "none");
  updateSize``;
};

// FILL
function fillList(switcher, e) {
  elements.ul.innerHTML = "";
  if (switcher == "none") {
  } else if (switcher == false) {
    direction = false;
  } else if (switcher) {
    direction = true;
  }
  for (let i = 0; i < tasks.length; i++) {
    if (direction) {
      switch (tasks[i].priority) {
        case 0:
          color = "text-dark";
          break;
        case 1:
          color = "text-primary";
          break;
        case 2:
          color = "text-danger";
          break;
      }
      if (body.style.backgroundColor == "black") {
        if (color == "text-dark") {
          color = "text-light";
        }
        if (tasks[i].done) {
          elements.ul.innerHTML += `<li class="list-group-item bg-dark well margin t ${color}" onclick='setActive(this)'  ondblclick="removeTask(this)" id='${i}'><del class="text-muted">${tasks[i].text}</del></li>`;
        } else {
          elements.ul.innerHTML += `<li class="list-group-item bg-dark well margin t ${color}" onclick='setActive(this)'  ondblclick="removeTask(this)" id='${i}'>${tasks[i].text}</li>`;
        }
      } else {
        if (tasks[i].done) {
          elements.ul.innerHTML += `<li class="list-group-item bg-white well margin t ${color}" onclick='setActive(this)'  ondblclick="removeTask(this)" id='${i}'><del class="text-muted">${tasks[i].text}</del></li>`;
        } else {
          elements.ul.innerHTML += `<li class="list-group-item bg-white well margin t ${color}" onclick='setActive(this)'  ondblclick="removeTask(this)" id='${i}'>${tasks[i].text}</li>`;
        }
      }
    } else {
      let tmpInt = tasks.length - i - 1;
      switch (tasks[tmpInt].priority) {
        case 0:
          color = "text-dark";
          break;
        case 1:
          color = "text-primary";
          break;
        case 2:
          color = "text-danger";
          break;
      }
      if (body.style.backgroundColor == "black") {
        if (color == "text-dark") {
          color = "text-light";
        }
        if (tasks[tmpInt].done) {
          elements.ul.innerHTML += `<li class="list-group-item bg-dark well margin t ${color}" onclick='setActive(this)'  ondblclick="removeTask(this)" id='${tmpInt}'><del class="text-muted">${tasks[tmpInt].text}</del></li>`;
        } else {
          elements.ul.innerHTML += `<li class="list-group-item bg-dark well margin t ${color}" onclick='setActive(this)'  ondblclick="removeTask(this)" id='${tmpInt}'>${tasks[tmpInt].text}</li>`;
        }
      } else {
        if (tasks[tmpInt].done) {
          elements.ul.innerHTML += `<li class="list-group-item bg-white well margin t ${color}" onclick='setActive(this)' ondblclick="removeTask(this)" id='${tmpInt}'><del class="text-muted">${tasks[tmpInt].text}</del></li>`;
        } else {
          elements.ul.innerHTML += `<li class="list-group-item bg-white well margin t ${color}" onclick='setActive(this)' ondblclick="removeTask(this)" id='${tmpInt}'>${tasks[tmpInt].text}</li>`;
        }
      }
    }
  }
}
// CLEAR LIST FUNCTION
const clearList = () => {
  tasks.length = 0;
  fillList("none", "none");
};

const backgroundControl = () => {
  if ($("body").css("background-color") == "transparent") {
    $("body").css("background-color", "white");
  } else {
    $("body").css("background-color", "transparent");
  }
};

// ADD ON ENTER
elements.input.onkeyup = (e) => {
  if (e.keyCode == 13) Add();
};

// VERSION STUFF
$.getJSON(url.version_log, (json) => {
  $("#version_log").html("");
  if (json == "[]") {
    console.error("ERROR WITH LOADING VERSION_LOG! VERSION LOG IS EMPTY");
    $("#version_log").html("Version log is empty, please check console");
  }
  for (s of json) {
    let textSplit = s.text.split`|`;
    let text = textSplit.length == 1 ? s.text : "";
    for (part of textSplit) {
      text += `<li> ${part} </li>`;
    }
    $("#version_log").append(
      s.text == json[json.length - 1].text
        ? `<h3>${s.version}   <span class ="badge badge-secondary"> New </span></h3><p>${text}</p><p class='text-right text-secondary '>${s.datetime}</p>`
        : `<h3>${s.version}</h3><p>${text}</p><p class='text-right text-secondary '>${s.datetime}</p>`
    );
  }
});

const mode = (e) => {
  $(elements.ul).fadeOut("fast");
  $("body").css("background-color", e ? "white" : "black");
  fillList("none", e ? "white" : "black");
  $(elements.ul).fadeIn("slow");
};
// SEARCH
$(document).ready(function () {
  $("#search").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#list li").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});
// SEARCH CONTROL
const removeSearch = () => $("#search").val("");

// SAVE LIST
$("#saveList").click(() => {
  console.log("something");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(
    new Blob([JSON.stringify(tasks, null, 2)], {
      type: "json",
    })
  );
  a.setAttribute("download", "saved_list.json");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});
$("#search").on("keydown", (e) => {
  if (e.keyCode == 27) {
    removeSearch();
  }
});
// $('#search').focus(() => {
// $('#list').addClass('margin3')
// })
$("#search").focusout(() => {
  $("#seach").val("");
});
let push = false;
const contentPush = () => {
  if (!push) {
    $("#list").addClass(margin == 3 ? "margin3" : "margin4");
    push = !push;
  } else {
    $("#list").removeClass(margin == 3 ? "margin3" : "margin4");
    push = !push;
  }
};

const showSize = () => {
  if ($("#footer-text").css("display") == "block") {
    $("#footer-text").fadeOut("slow");
  } else {
    $("#footer-text").fadeIn("slow");
  }
};

const updateSize = () => $("#footer-text").html(tasks.length);

const load_saved_tasks = () => {
  let files = document.getElementById("selectFiles").files;
  if (files.length <= 0) {
    return false;
  }
  let fileType = files[0].name.split(".");
  if (fileType[fileType.length - 1] != "json") {
    alert("You can upload only json files!");
    return;
  }
  let fr = new FileReader();
  fr.onload = function (e) {
    console.log(fileType[fileType.length - 1]);
    let result = JSON.parse(e.target.result);
    tasks = result;
    fillList("none");
  };

  fr.readAsText(files.item(0));
};
$("#loadList").click(() => load_saved_tasks());

// HOW LONG DOES SITE NEEDS TO LOAD ?
$(document).ready(function () {
  const loadSpeed = Date.now() - timerStart;
  $("#loadtime").html("Load time: " + loadSpeed + "ms");
  $("#github").html("<a href=" + url.github + ' target="popup"> Github </a>');
});
