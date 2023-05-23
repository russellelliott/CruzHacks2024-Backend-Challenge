import {
  Body,
  Controller,
  Delete,
  Get,
  Path,
  Post,
  Patch,
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
        @Query() id?: string,
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
  
    @Post()
    @Security("jwt", ["Judge"])
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
            return await new PersonService().addPerson(book);
          }
        });
    }

    @Patch()
    @Security("jwt", ["Judge"])
    @Response('401', 'Unauthorized')
    @Response('404', 'Book not found')
    @SuccessResponse('200', 'Book updated')
    public async updateBook(
      @Body() book: Partial<Person>,
      @Query('email') email: string,
    ): Promise<Person|undefined> {
      return new PersonService().get(email)
        .then(async (found: Person|undefined): Promise<Person|undefined> => {
          if (!found) {
            this.setStatus(404);
          } else {
            // Exclude email and application type from update
            const { ...updatedProperties } = book;
            return await new PersonService().updatePerson(found.id, updatedProperties);
          }
        });
    }

    @Delete('{isbn}')
    @Security("jwt", ["Judge"])
    @Response('401', 'Unauthorised')
    @Response('404', 'Book does not exist')
    @SuccessResponse('204', 'Book deleted')
    public async deleteBook(
      @Path() isbn: string,
    ): Promise<void> {
      return new PersonService().get(isbn)
        .then(async (found: Person|undefined): Promise<void> => {
          if (!found) {
            this.setStatus(404);
          } else {
            await new PersonService().delete(isbn);
            this.setStatus(204);
          }
        });
    }
}