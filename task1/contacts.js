const fs = require('fs');
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

function readContacts() {
  return new Promise((resolve, reject) => {
    fs.readFile(contactsPath, 'utf8', (err, data) => {
      if (err) {
        if (err.code === 'ENOENT') {
          resolve([]);
        } else {
          reject(err);
        }
      } else {
        try {
          const contacts = JSON.parse(data);
          resolve(contacts);
        } catch (parseErr) {
          reject(parseErr);
        }
      }
    });
  });
}

function writeContacts(contacts) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(contacts, null, 2);
    fs.writeFile(contactsPath, data, 'utf8', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

module.exports = {
  readContacts,
  writeContacts,
};
