import { Meteor } from 'meteor/meteor';
import { ThreadsCollection } from '../imports/api/threads';

Meteor.startup(async () => {

  Meteor.publish("threads", function () {
    return ThreadsCollection.find();
  });
});