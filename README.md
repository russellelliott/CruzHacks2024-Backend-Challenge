# CruzHacks 2024 Backend Challenge
This is my implementation of the CruzHacks 2024 Backend Challenge. React/Typescript Frontend, OpenAPI for RESTful API, PostgreSQL database.

## Setup / Running the app
run `npm install` to install all the necessary packages
run `docker compose up -d` to start the PostgreSQL database via Docker.
run `docker compose down` to top the PostgreSQL database via Docker.
run `npm run dev` to run the API at http://localhost:3010/api/v0/docs/
run `npm run test` to run all the tests. For the best testing experience, reset the database by running `docker compose down` followed by `docker compose up -d` before running the tests. There definitely is a way to get that working without resetting the database, but I couldn't figure it out for this project for whatever reason.

## Files
The schema for the project is in `schema.sql`. The data inserted into the tables is in `data.sql`
The file `secrets.json` contains the JWT access token used for the application.
The Authentication capability is in `src/auth` and the functionality for the CRUD operations for Hackers/Judges are in `src/person`
* `[name].ts`: contains the types
* `[name]Controller.ts`: contains the functions and the status codes they return in certain conditions
* `[name]Service.ts`: functions that interact with the PostgreSQL database and return data
* `expressAuth.ts`: file in `src/auth` responsible for authenticating and checking the user permissions

The `.env` file contains the postgres database name and its username and password.

`app.ts`, `db.ts` and `server.ts` are the core files for the functionality/intractability of the app, database, and server respectably.
`tsoa.json` and `tsconfig.json` are config file for the RESTful API and the Typescript of the application respectably.

## Endpoints

`/login`: for logging in as a user. Enter their email and password as JSON.
```json
{
  "email": "string",
  "password": "string"
}
```
<table>
	<tr>
		<th>Email</th>
		<th>Password</th>
		<th>Role</th>
	</tr>
	<tr>
		<td>molly@books.com</td>
		<td>mollymember</td>
		<td>Hacker</td>
	</tr>
	<tr>
		<td>anna@books.com</td>
		<td>annaadmin</td>
		<td>Judge</td>
	</tr>
	<tr>
		<td>nobby@books.com</td>
		<td>nobbynobody</td>
		<td>None</td>
	</tr>
</table>

If the credentials are correct, you will receive a JSON object with their name, access token, and their permission scopes.
```json
{
  "name": "string",
  "accessToken": "string",
  "scopes": [
    "string"
  ]
}
```
In the OpenAPI window, click the lock and add the accessToken in the corresponding field to log that person in as to get the necessary permission for the following functions. For now, all the API routes are accessible only through judges.
 
GET `/person/{isbn}`: get a person by their UUID or their email. REGEX string used to determine whether a UUID or email was entered.
POST: add a new person to the database, specifying their properties.
```json
{
  "id": "string",
  "name": "string",
  "gender": "string",
  "other_gender": "string",
  "email": "string",
  "password": "string",
  "age": 0,
  "application_type": "string",
  "is_ucsc_student": true,
  "other_school": "string",
  "current_company": "string"
}
```
PATCH. Provide the email of the person to change as well as the properties to change. Can change any amount of fields except the email and applicant type.
```json
{
  "id": "string",
  "name": "string",
  "gender": "string",
  "other_gender": "string",
  "password": "string",
  "age": 0,
  "is_ucsc_student": true,
  "other_school": "string",
  "current_company": "string"
}
```
DELETE `/person/{isbn}`: delete a person by their UUID or their email. REGEX string used to determine whether a UUID or email was entered.

## Resources
Code based off CSE187 starter code, which uses the same stack.