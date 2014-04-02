coll = new Meteor.Collection('coll');
coll2 = new Meteor.Collection('coll2');

if (Meteor.isClient) {
  Template.hello.record = function () {
    console.log(coll2.findOne());
    return coll.find({}, {sort: {i:1}}).fetch();
  };
  Router.configure({
    'loadingTemplate': 'loading'
  });
  Router.map(function () {
    this.route('hello', {
      path: '/',
      waitOn:function () {
        return [
          Meteor.subscribe('2'),
          Meteor.subscribe('1'),
          Meteor.subscribe('3')
        ];
      }
    });
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    coll.remove({});
    coll2.remove({});
    for (var i = 0; i < 50; ++i) {
      coll.insert({ i: i });
      coll2.insert({ i: i });
    }
  });

  Meteor.publish('1', function () {
    return coll.find({}, {limit: 25});
  });

  Meteor.publish('2', function () {
    return coll.find({}, {limit:25, skip:25});
  });

  Meteor.publish('3', function () {
    return coll2.find();
  });
}
