const settings = {};
$.getJSON("../Settings.json", (data) => {
  settings["local"] = data;
});

const setMode = (e) => {
  settings["local"]["dark_mode"] = e.checked;
  saveSettings``;
};

const setFirst = (e) => {
  settings["local"]["from"] = e.checked;
  saveSettings``;
};

const saveSettings = () => {
  console.log("Settigns saved!");
};
