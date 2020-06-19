# Task Manager System 

Created Task Manager System backend using Node.js, Express.js and MongoDB to manage tasks for different users. Deployed backend API's on heroku server and are ready to use. Used Authentication using tokens to protect the routes and data of other users. 

## Base URL : https://keep-tasks.herokuapp.com/api

## User API's
- Create User :  {{Base URl}}/users
- Get User Profile : {{Base URl}}/users/me
- User Login : {{Base URl}}/login
- User Logout : {{Base URl}}/logout
- User Logout All Sessions : {{Base URl}}/logoutAll
- User Update : {{Base URl}}/users/me (PATCH)
- User Delete : {{Base URl}}/users/me (DELETE)

## Tasks API's
- Create Task :  {{Base URl}}/tasks
- Get All Tasks : {{Base URl}}/tasks (params : sortBy, value: created, optional: desc or asc)
- Get Task by Id : {{Base URl}}/tasks/:id
- Update Task by Id : {{Base URl}}/tasks/:id (PATCH)
- Delete Task by Id : {{Base URl}}/tasks/:id (DELETE)


