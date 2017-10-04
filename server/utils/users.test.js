const expect = require('expect');

const {Users} = require('./users');


describe('Users', () => {

   beforeEach(() => {
      users = new Users();
      users.users = [{
         id: 1,
         name: 'Matt',
         room: 'ORG'
      }, {
         id: 2,
         name: 'Jen',
         room: 'ORG'
      }, {
         id: 3,
         name: 'Steve',
         room: 'PARTAY'
      }];
   });


   it('should add new user', () => {
      var users = new Users();
      var user = {
         id: 123,
         name: 'ME',
         room: 'LoveLounge'
      };
      var resUser = users.addUser(user.id, user.name, user.room);
      expect(users.users).toEqual([user]);
   });

   it('should remove a user', () => {
      var userId = 3;
      var user = users.removeUser(userId);
      expect(user.id).toEqual(userId);
      expect(users.users.length).toEqual(2);
   });

   it('should not remove a user', () => {
      var user = users.removeUser(10);
      expect(users.users.length).toEqual(3);
   });

   it('should find a user', () => {
      var userId = 2;
      var user = users.getUser(userId);
      expect(user.id).toEqual(userId);
   });

   it('should not find a user', () => {
      var user = users.getUser(10);
      expect(user).toBeUndefined();
   });


   it('should return names for ORG room', () => {
      var userList = users.getUserList('ORG');
      expect(userList).toEqual(['Matt', 'Jen']);
   });

   it('should return names for PARTAY room', () => {
      var userList = users.getUserList('PARTAY');
      expect(userList).toEqual(['Steve']);
   });
});
