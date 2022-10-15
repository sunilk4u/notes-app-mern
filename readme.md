
# My Notes - Notes App with Authentication

My Notes is a notes app with user authentication features. In this application 
user can perform (CRUD Operations) read, write, save , update, delete operations.

## Features of My Notes

* Sign Up as User.
* Login and authenticate yourself.
* Edit user accunt details.
* Delete user account.
* Update user profile photo.
* Create your notes.
* Edit your notes.
* Delete your notes.
* Download your notes as text file.
* Logout and de-authenticate yourself.

## Tools & Technologies Used

#### Client

* React Framework
* Material UI
* Redux & Redux Thunk
* Axios
* React Router

#### Server

* Node
* Express
* Mongoose
* Multer
* Json Web Token
* Bcrypt

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

#### Client

 - `REACT_APP_API_URI`: Express server REST API Endpoint.

#### Server

 - `PORT`: Port of Express server listening to.
 - `MONGO_URL`: MongoDB connection URL with database name.
 - `JWT_SECRET`: JSON web token secret key to sign the data and create token.
 - `CORS_ORIGIN`: Client URL with listening port.

## How to install

#### Client

 - CD into client folder and run command `npm install`.
 - Run client using command `npm run start`.
 - Your client is now running.
 - (Optional) Run `npm run build` to create static files of the client.

#### Server

 - CD into server folder and run command `npm install`.
 - Run server using command `npm run start`.
 - Your server is now running.


