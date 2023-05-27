import {Person, PartialPerson} from './person';

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
  

  public async addPerson(person: Person): Promise<Person> {
    const insertQuery = `
      INSERT INTO people (id, name, gender, other_gender, email, password, age, application_type, is_ucsc_student, other_school, current_company)
      VALUES (gen_random_uuid(), $1, $2, $3, $4, crypt($5, gen_salt('bf')), $6, $7, $8, $9, $10)
    `;
    const insertValues = [
      person.name,
      person.gender,
      person.other_gender,
      person.email,
      person.password,
      person.age,
      person.application_type,
      person.is_ucsc_student,
      person.other_school,
      person.current_company
    ];
  
    await pool.query(insertQuery, insertValues);
    console.log('Person added successfully!');
    return person;
  }

  /*public async updatePerson2(id: string, updatedProperties: Partial<Person>): Promise<Person> {
    const { email, application_type, ...otherProperties } = updatedProperties;
    const updateValues: any[] = [];
    let updateQuery = `UPDATE people SET`;
  
    let paramCount = 1;
    Object.keys(otherProperties).forEach((key, index) => {
      updateQuery += ` ${key} = $${paramCount}`;
      updateValues.push(otherProperties[key]);
      paramCount++;
  
      if (index < Object.keys(otherProperties).length - 1) {
        updateQuery += `,`;
      }
    });
  
    updateQuery += ` WHERE id = $${paramCount} RETURNING *`;
    updateValues.push(id);
  
    try {
      const result = await pool.query(updateQuery, updateValues);
      const updatedPerson = result.rows[0];
      console.log('Person updated successfully!');
      return updatedPerson;
    } catch (error) {
      console.error('Error occurred while updating the person:', error);
      throw error;
    }
  }*/

  
  
  public async updatePerson(id: string, updatedProperties: PartialPerson): Promise<Person> {
    const { email, application_type, ...otherProperties } = updatedProperties;
    const updateValues: any[] = [];
    let updateQuery = `UPDATE people SET`;
  
    let paramCount = 1;
    Object.keys(otherProperties).forEach((key, index) => {
      updateQuery += ` ${key} = $${paramCount}`;
      updateValues.push(otherProperties[key]);
      paramCount++;
  
      if (index < Object.keys(otherProperties).length - 1) {
        updateQuery += `,`;
      }
    });
  
    updateQuery += ` WHERE id = $${paramCount} RETURNING *`;
    updateValues.push(id);
  
    
    const result = await pool.query(updateQuery, updateValues);
    const updatedPerson = result.rows[0];
    console.log('Person updated successfully!');
    return updatedPerson;
    
  }

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