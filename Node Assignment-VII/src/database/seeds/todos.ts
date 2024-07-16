import { Knex } from "knex";

const TABLE_NAME = "todos";

/**
 * Delete existing entries and seed values for table TABLE_NAME.
 *
 * @param   {Knex} knex
 * @returns {Promise}
 */
export function seed(knex: Knex): Promise<void> {
  return knex(TABLE_NAME)
    .del()
    .then(() => {
      return knex(TABLE_NAME).insert([
        {
          id: "1",
          title: "CODE",
          description: "CODE CODE CODE",
          userId: "1",
        },
        {
          id: "2",
          title: "COOK",
          description: "COOK COOK COOK",
          userId: "2",
        },
        {
          id: "3",
          title: "PLAY",
          description: "FOOTBALL",
          userId: "1",
        },
        {
          id: "4",
          title: "ASSIGNMENT",
          description: "Do Assignment",
          userId: "2",
        },
      ]);
    });
}
