// USER.JS
// Will store the user data in an array of OBJECTS


class Users {
   constructor () {
      this.users = [];
   }
   addUser (id, name, room) {
      var user = {id, name, room};
      this.users.push(user);
      return user;
   }

   removeUser (id) {
      var user = this.getUser(id);
      if (user) {
         this.users = this.users.filter((user) => user.id !== id);
      }
      return user;
   }

   getUser (id) {
      return this.users.filter((user) => user.id === id)[0];
   }

   getUserList (room) {
      var users = this.users.filter((user) => {     // This filters out any users not in room
         return user.room === room;
      });
      var namesArray = users.map((user) => {        // This filters out everything but list of names
         return user.name;
      });
      return namesArray;
   }
}



module.exports = {Users};

// ADD USER via addUser(id, name, room)


// REMOVE USER via removeUser(id)


// FETCH A USER via getUser(id)


// GET USER LIST via getUserList(room)






// [{
//    id: 'aoiujaldkjdja',
//    name: 'Matt',
//    room: 'TheLoveLounge'
// }]

// We could do this using a regular function setup such as:

// var users = [];
//
// var addUser = (id, name, room) => {
//    users.push({'some': 'data'});
// };
//
// module.exports = {addUser};


// But instead we are going to use ES6 Classes

// ES6 Class structure
// Making a class for a person, which allows us to set data for that person
// Constructor function automatically starts and initializes new instance of class
// Methods can be any function, they may take arguments or not
// PAY ATTENTION TO SYNTAX, IT'S WEIRD
// class Person {
//    constructor (name, age) {        // gets called by default
//       this.name = name;
//       this.age = age;
//    }
//    getUserDescription() {
//       return `${this.name} is ${this.age} year(s) old.`;
//    }
// }
//
// var me = new Person('Matt', 41);
// var desc = me.getUserDescription();
// console.log(desc);
