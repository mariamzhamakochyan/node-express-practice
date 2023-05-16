const { MongoClient, ObjectId } = require('mongodb');
async function connectToDatabase() {
  const uri = 'mongodb://localhost:27017/your-database-name';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    return client.db();
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    throw error;
  }
}
const User = {
  collectionName: 'users',

  async create(user) {
    const db = await connectToDatabase();
    const result = await db.collection(this.collectionName).insertOne(user);
    return result.insertedId;
  },

  async findById(id) {
    const db = await connectToDatabase();
    return db.collection(this.collectionName).findOne({ _id: ObjectId(id) });
  },

  // Add more methods for update, delete, and other operations as needed
};
module.exports = User;
