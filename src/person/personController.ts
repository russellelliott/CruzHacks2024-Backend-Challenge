import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Query,
  Response,
  Route,
  Security,
  SuccessResponse,
} from 'tsoa';

import {Person} from './person';
import {PersonService} from "./personService"

@Route('Person')
export class PersonController extends Controller {
    @Get('')
    @Security("jwt", ["Judge"])
    @Response('401', 'Unauthorised')
    public async getAll(
        @Query() id: string,
    ): Promise<Person[]> {
        return new PersonService().getAll(id);
    }
  
    @Get('{isbn}')
    @Security("jwt", ["Judge"])
    @Response('401', 'Unauthorised')
    @Response('404', 'Book not found')
    public async getBook(
      @Path() isbn: string,
    ): Promise<Person|undefined> {
      return new PersonService().get(isbn)
        .then((book: Person|undefined): Person|undefined => {
          if (!book) {
            this.setStatus(404);
          }
          return book;
        });
    }
  
    /*@Post()
    @Security("jwt", ["admin"])
    @Response('401', 'Unauthorised')
    @Response('409', 'Book with ISBN exists')
    @SuccessResponse('201', 'Book created')
    public async createBook(
      @Body() book: Person,
    ): Promise<Person|undefined> {
      return new PersonService().get(book.id)
        .then(async (found: Person|undefined): Promise<Person|undefined> => {
          if (found) {
            this.setStatus(409);
          } else {
            return await new PersonService().create(book);
          }
        });
    }*/

    @Delete('{isbn}')
    @Security("jwt", ["Judge"])
    @Response('401', 'Unauthorised')
    @Response('404', 'Book does not exist')
    @SuccessResponse('201', 'Book created')
    public async deleteBook(
      @Path() isbn: string,
    ): Promise<string|undefined> {
      return new PersonService().get(isbn)
        .then(async (found: Person|undefined): Promise<string|undefined> => {
          if (!found) {
            this.setStatus(404);
          } else {
            return await new PersonService().delete(isbn);
          }
        });
    }
}