import {Person} from './person';

import {pool} from '../db';

export class PersonService {
  public async getAll(id?: string): Promise<Person[]> {
    let select = 'SELECT * FROM people';
    if (id) {
      select += ` WHERE id = $1`;
    }
    const query = {
      text: select,
      values: id ? [`${id}`] : [],
    };
    const {rows} = await pool.query(query);
    const books = [];
    for (const row of rows) {
      books.push(row.book);
    }
    return rows;
  }

  //get by id or email
  public async get(identifier: string): Promise<Person | undefined> {
    let query;
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/; //regex for uuid
    if (uuidRegex.test(identifier)) {
      const selectById = 'SELECT * FROM people WHERE id = $1';
      query = {
        text: selectById,
        values: [identifier],
      };
    } else {
      const selectByEmail = 'SELECT * FROM people WHERE email = $1';
      query = {
        text: selectByEmail,
        values: [identifier],
      };
    }
    const { rows } = await pool.query(query);
    return rows.length === 1 ? rows[0] : undefined;
  }
  

  /*public async create(book: Person): Promise<Person> {
    const insert = 'INSERT INTO channel(id, work) VALUES ($1, $2)';
    const query = {
      text: insert,
      values: [book.id, book.owner],
    };
    await pool.query(query);
    return book;
  }*/

  //delete by id or email
  public async delete(identifier: string): Promise<Person|undefined> {
    let query;
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/; //regex for uuid
    if (uuidRegex.test(identifier)) {
      const selectById = 'DELETE FROM people WHERE id = $1';
      query = {
        text: selectById,
        values: [identifier],
      };
    } else {
      const selectByEmail = 'DELETE FROM people WHERE email = $1';
      query = {
        text: selectByEmail,
        values: [identifier],
      };
    }
    const { rows } = await pool.query(query);
    return rows.length === 1 ? rows[0] : undefined;
  }
}