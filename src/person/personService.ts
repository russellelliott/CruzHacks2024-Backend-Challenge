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
  public async get(isbn: string): Promise<Person|undefined> {
    const select = 'SELECT * FROM people WHERE id = $1 OR email = $1';
    const query = {
      text: select,
      values: [isbn],
    };
    const {rows} = await pool.query(query);
    return rows.length == 1 ? rows[0] : undefined;
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
  public async delete(isbn: string): Promise<string|undefined> {
    const insert = 'DELETE FROM people WHERE id = $1 OR email = $1';
    const query = {
      text: insert,
      values: [isbn],
    };
    await pool.query(query);
    return isbn;
  }
}