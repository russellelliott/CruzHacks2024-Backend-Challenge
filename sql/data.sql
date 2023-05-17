-- Your insert statements go here
DELETE FROM human;

-- table for people, if i can figure out authentication via the database
INSERT INTO human(email, info) VALUES('molly@books.com', '{"email": "molly@books.com","password": "$2b$10$Y00XOZD/f5gBSpDusPUgU.iJufk6Nxx6gAoHRG8t2eHyGgoP2bK4y","roles": ["member"],"name": "Molly Member"}');
INSERT INTO human(email, info) VALUES('anna@books.com', '{"email": "anna@books.com","password": "$2b$10$Y00XOZD/f5gBSpDusPUgU.G1ohpR3oQbbBHK4KzX7dU219Pv/lzze","roles": ["member", "admin"],"name": "Anna Admin"}');
INSERT INTO human(email, info) VALUES('nobby@books.com', '{"email": "nobby@books.com","password": "$2a$12$ZnrvkMk9jn56NlyJGOyTE.biz5xvJUr1iKIFsWyFWPFF/x3j5fUhm","roles": [],"name": "Nobby Nobody"}');
