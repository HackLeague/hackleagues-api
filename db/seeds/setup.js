
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({
          username: 'barry',
          password: 'rowValue1',
        }),
        knex('users').insert({
          username: 'barry2',
          password: 'rowValue1',
        }),
        knex('users').insert({
          username: 'barry3',
          password: 'rowValue1',
        }),
      ]);
    });
};
