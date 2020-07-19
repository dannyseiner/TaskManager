const versions = {};
let download_links;
const url = {
  local: {
    package: "../../package.json",
  },
  server: {
    package:
      "https://raw.githubusercontent.com/YoungDaggerDee/ToDoApp/master/package.json",
    version_log:
      "https://raw.githubusercontent.com/YoungDaggerDee/ToDoApp/master/JSON/version_log.json",
  },
};
// LOAD BOTH VERSIONS
$.getJSON(url.local.package, (data) => {
  versions["local"] = versionToInt(data.version);
  download_links = data.download_links;
});
$.getJSON(url.server.package, (data) => {
  versions["server"] = versionToInt(data.version);
});
const versionToInt = (e) => parseInt(e[0] + e[2] + e[4]);
const intToVersion = (e) => e[0] + "." + e[1] + "." + e[2];

if (versions["local"] - versions["server"] != 0) {
  versions["new"] = [];
  $.getJSON(url.server.version_log, (data) => {
    for (index of data) {
      if (versions["local"] < versionToInt(index.version)) {
        versions["new"].push(index);
      }
    }
  });
} else {
  console.log("version up to date");
}
setTimeout(() => {
  if (versions["new"].length == 0) {
    $("#list").append(
      '<h1 class="text-center mt-5"> Current version is up to date</h1>'
    );
    $("#openModal").css("display", "none");
  }

  for (let index = 0; index < versions["new"].length; index++) {
    if (index == 0) $("#download-link").removeClass("d-none");
    let i = versions["new"].length - index - 1;
    let text = versions["new"][i].text;
    let text_string = "";
    if (text.includes("|")) {
      let splitByTags = text.split("|");
      for (let i = 0; i < splitByTags.length; i++) {
        text_string += `<p>${splitByTags[i]}</p>`;
      }
    }
    let final_text = text_string == "" ? versions["new"][i].text : text_string;
    $("#list").append(
      i == versions["new"].length - 1
        ? `<li class="list-group-item"><h3>${versions["new"][i].version} <span class="badge badge-secondary">New</span></h3><p>${final_text}</p><p>${versions["new"][i].datetime}</p></li>`
        : `<li class="list-group-item"><h3>${versions["new"][i].version}</h3><p>${final_text}</p><p class='text-dark' text-grey>${versions["new"][i].datetime}</p></li>`
    );
  }

  $("#spinner").fadeOut("slow");
  $("#list").removeClass("d-none");
  $("#list").fadeIn("slow");
  $("#openModal").removeClass("d-none");
}, 2000);

const downloadFrom = (e) => {
  switch (e) {
    case "google_disk":
      window.location.href = download_links["google-disk"];
      break;
    case "github":
      window.location.href = download_links["github"];
      break;
  }
};
// ONCLICK F
$("#download-google-disk").click(() => {
  downloadFrom("google_disk");
});
$("#download-github").click(() => {
  downloadFrom("github");
});
