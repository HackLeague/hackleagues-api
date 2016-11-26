import * as Knex from 'knex';

export  function seed (knex:Knex, Promise:any) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({
          email: 'aa@aa.com',
          username: 'barry',
        }),
        knex('users').insert({
          email: 'aa@bb.com',
          username: 'barry2',
        }),
        knex('users').insert({
          email: 'aa@cc.com',
          username: 'barry3',
        }),
      ]);
    });
};
