const fs = require('fs');

const localStorage = {
  _path: process.env.LOCAL_STORAGE_JSON,
  _data: {},
  _load: function () {
    try {
      this._data = JSON.parse(fs.readFileSync(this._path));
    } catch (err) {
      this._data = {};
    }
  },
  _store: function () {
    fs.writeFileSync(this._path, JSON.stringify(this._data));
  },
  setItem: function (id, val) {
    this._data[id] = String(val);
    this._store();
  },
  getItem: function (id) {
    this._load();
    return this._data.hasOwnProperty(id) ? this._data[id] : null;
  },
  removeItem: function (id) {
    delete this._data[id];
    this._store();
  },
  clear: function () {
    this._data = {};
    this._store();
  },
};

delete window.localStorage;
window.localStorage = localStorage;
