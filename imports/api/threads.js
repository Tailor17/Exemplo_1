import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

// Defina sua coleção
export const ThreadsCollection = new Mongo.Collection('threads');

async function insertThread(text) {
  check(text, String);

  await ThreadsCollection.insertAsync({
    text,
    date: new Date()
  });
}

async function clearThreads() {
  if (Meteor.isServer) {
    await ThreadsCollection.remove({});
  }
}

Meteor.methods({
  insertThread,
  clearThreads,
});