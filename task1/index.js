const yargs = require('yargs');
const { readContacts, writeContacts } = require('./contacts');



const argv = yargs(process.argv.slice(2))
  .command('list', 'List all contacts')
  .command('get', 'Get a contact by ID', {
    id: {
      describe: 'Contact ID',
      demandOption: true,
      type: 'string',
    },
  })
  .command('add', 'Add a new contact', {
    name: {
      describe: 'Contact name',
      demandOption: true,
      type: 'string',
    },
    email: {
      describe: 'Contact email',
      demandOption: true,
      type: 'string',
    },
    phone: {
      describe: 'Contact phone number',
      demandOption: true,
      type: 'string',
    },
  })
  .command('remove', 'Remove a contact by ID', {
    id: {
      describe: 'Contact ID',
      demandOption: true,
      type: 'string',
    },
  })
  .help()
  .argv;

function invokeAction(action, args) {
  switch (action) {
    case 'list':
      readContacts()
        .then((contacts) => {
          console.log('Contacts:', contacts);
        })
        .catch((error) => {
          console.error('Error reading contacts:', error);
        });
      break;
    case 'get':
      readContacts()
        .then((contacts) => {
          const contact = contacts.find((c) => c.id === args.id);
          if (contact) {
            console.log('Contact:', contact);
          } else {
            console.log('Contact not found.');
          }
        })
        .catch((error) => {
          console.error('Error reading contacts:', error);
        });
      break;
    case 'add':
      const newContact = {
        id: Math.random().toString(36).substr(2, 9),
        name: args.name,
        email: args.email,
        phone: args.phone,
      };

      readContacts()
        .then((contacts) => {
          contacts.push(newContact);
          return writeContacts(contacts);
        })
        .then(() => {
          console.log('New contact added and saved successfully.');
        })
        .catch((error) => {
          console.error('Error adding and saving contact:', error);
        });
      break;
    case 'remove':
      readContacts()
        .then((contacts) => {
          const contactIndex = contacts.findIndex((c) => c.id === args.id);
          if (contactIndex !== -1) {
            contacts.splice(contactIndex, 1);
            return writeContacts(contacts);
          } else {
            console.log('Contact not found.');
          }
        })
        .then(() => {
          console.log('Contact removed and saved successfully.');
        })
        .catch((error) => {
          console.error('Error removing and saving contact:', error);
        });
      break;
    default:
      console.log('Invalid action.');
  }
}

const action = argv._[0];
invokeAction(action, argv);
