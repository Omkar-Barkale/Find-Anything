import request from 'supertest';
import fs from 'fs';
import path from 'path';
import jwt from 'jsonwebtoken';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { createApp } from '../../src/index.js';
import { connectDB, closeDB } from '../../src/db_connection.js';

let mongod;
let app;
let db;

beforeAll(async () => {
  mongod = await MongoMemoryServer.create();
  process.env.MONGO_URI = mongod.getUri();
  process.env.jwt_secret = process.env.jwt_secret || 'test-secret';

  // Ensure DB connection uses in-memory server
  db = await connectDB();
  app = createApp();
});

afterAll(async () => {
  if(mongod) await mongod.stop();
  await closeDB();
});

test('GET /search/file/:id returns file', async () => {
  // Prepare a test file
  const uploadDir = path.join(process.cwd(), 'uploads', 'documents');
  fs.mkdirSync(uploadDir, { recursive: true });
  const filepath = path.join(uploadDir, 'testfile.txt');
  fs.writeFileSync(filepath, 'hello world');

  // Insert book doc
  const book = {
    name: 'T',
    author: 'A',
    description: 'D',
    user: 'user1',
    filepath: filepath,
    image: null,
    imgType: null,
    comments: [],
    meta: { votes: 0, dislikes: 0, downloads: 0 },
    date: new Date()
  };

  const result = await db.collection('books').insertOne(book);
  const id = result.insertedId.toString();

  // create token
  const token = jwt.sign({_id: id, role: 'user'}, process.env.jwt_secret);

  const res = await request(app)
    .get(`/search/file/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(200);

  expect(res.text).toBe('hello world');

  // verify downloads incremented
  const updated = await db.collection('books').findOne({_id: result.insertedId});
  expect(updated.meta.downloads).toBe(1);
});
