const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

async function seed() {
  const uri = process.env.MONGODB_URI || 'mongodb+srv://tejashsinghrajput_db_user:33ZVT4Ti5dCKXH9R@cluster0.z2pxjus.mongodb.net/paribesh-prahari';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db();
    const users = db.collection('users');

    const email = 'admin9804@gmail.com';
    const password = 'admin9804';
    const passwordHash = await bcrypt.hash(password, 12);

    const existing = await users.findOne({ email });
    if (existing) {
      await users.updateOne({ email }, { $set: { password: passwordHash } });
      console.log('Updated existing user.');
    } else {
      await users.insertOne({
        username: 'admin',
        email,
        password: passwordHash,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log('Created new user.');
    }
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

seed();