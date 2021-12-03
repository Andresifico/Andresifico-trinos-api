# Trinos API

## How to run?
```bash
docker-compose up
```

## Run tests
```bash
docker-compose exec api npm run test
```

## Estudiante : Andres Meza
## Código: 200115774

## Documentación en postman
```bash
https://documenter.getpostman.com/view/18553028/UVJeGwuA
```

## Linter output
```bash
> trinos-api@1.0.0 linter /usr/src/app
> eslint bin/www src/**/*.js app.js


/usr/src/app/bin/www
  66:7  warning  Unexpected console statement  no-console
  70:7  warning  Unexpected console statement  no-console
  87:3  warning  Unexpected console statement  no-console

✖ 3 problems (0 errors, 3 warnings)
```

## users test
```bash
 PASS  tests/users.test.js
  Users routes
    ✓ Should create user (109 ms)
    ✓ Should return bad request on create user with invalid payload (5 ms)
    ✓ Should return bad request with missmatch passwords (4 ms)
    ✓ Should get user by id (18 ms)
    ✓ Should return bad request when user does not exist (19 ms)
    ✓ Should return bad request on get a deactivated user (21 ms)
    ✓ Should update user (29 ms)
    ✓ Should return unauthorized on update deactivated user (4 ms)
    ✓ Should return bad request on update user with invalid payload (12 ms)
    ✓ Should deactivate user (30 ms)
    ✓ Should return unauthorized on deactivate user when does not exist (5 ms)
    ✓ Should login with username and password (108 ms)
    ✓ Should return error on login with wrong password (96 ms)
    ✓ Should admin role get all users (21 ms)
    ✓ Should return unauthorized on get all users without auth token (7 ms)
    ✓ Should return JWT error on get all users with malformed auth token (3 ms)
    ✓ Should return forbidden on get all users with regular role (2 ms)
    ✓ Should go to next page on get all users (21 ms)
    ✓ Should send password reset with username (680 ms)
    ✓ Should return error on send password reset with wrong username (15 ms)
    ✓ Should return bad request on send password reset with invalid payload (3 ms)
    ✓ Should reset password (214 ms)
    ✓ Should return bad request on reset password with invalid payload (18 ms)
    ✓ Should return access token required on update password when token is null (4 ms)
    ✓ Should return bad request on update password with missmatch passwords (3 ms)
    ✓ Should logout sucessfully (13 ms)
    ✓ Should throw error by invalid token (4 ms)
    ✓ Should return unauthorized on update password when token does not exist (3 ms)
``` 
## tweets test
```bash
 FAIL  tests/tweets.test.js
  Tweets routes
    ✓ Should return an incorrect request when obtained the information without token (26 ms)
    ✓ Should return wrong request when post tweet without token (20 ms)
    ✕ Should return a Bad request when trying to post a tweet with invalid payload (8 ms)
    ✕ Should create tweet (36 ms)
    ✕ Should my tweet feed (28 ms)
    ✕ Should return tweet not found  (17 ms)
    ✕ Should return tweet from the consulted id (12 ms)
    ✓ Should return Access token required on delete tweet (4 ms)
    ✕ Should return tweet not found on delete (12 ms)
    ✕ Should delete tweet (16 ms)
    ✓ Should return Access token required on like tweet (9 ms)
    ✓ Should return Tweet not found on like tweet (13 ms)
    ✓ Should return Tweet on like tweet (33 ms)
    ✕ Should return Tweet not found on post coments tweet (20 ms)
    ✓ Should return Access token required on coments tweet (3 ms)
    ✕ Should return Bad request on post comments tweet (3 ms)
    ✓ Should create comment (13 ms)
    ✕ Should return User not found on user feed (12 ms)
    ✓ Should return User info on user feed (43 ms)
``` 

## coments test
```bash
 FAIL  tests/coments.test.js
  Coments routes
    ✓ Should return Access token required on like coment (4 ms)
    ✕ Should like coment (15 ms)
    ✓ Should return comment not found when like a coment (61 ms)
    ✕ Should delete coment (49 ms)
    ✓ Should return Coments not found error on coment delete (47 ms)
    ✓ Should return Coment not found (14 ms)
```

### Output tests
![image](https://user-images.githubusercontent.com/50928089/144325677-47693f29-b898-4cf2-a16a-dc61f58e8fa8.png)


