# Authorization

## POST
Endpoint: /user/register

body: 
```json
  {
    "first_name": String,
    "last_name": String,
    "email": String,
    "password": String,
  }
```

response:

status 201:
```json
{
  "message": "Succesfully registered"
}
```

status 400:
```json
{
  "message": "Email is not valid"
}
```


Endpoint: /user/login

body:
```json
{
  "email": String,
  "password": String,
}
```
response:

status 200:
```json
{
  "message": "Successfully logged in",
  "data": {
    "user_id": "1",
    "access_token": "token",
    "refresh_token": "token",
  }
  
}
```

status 404:
```json
{
  "message": "User not found"
}
```
#
## GET
Endpoint: /token

Cookies:
```json
{
  "rft": "{{refresh_token}}"
}
```

response:

status 200:
```json
{
  "message": "Succesfully generated new token",
  "data": {
    "access_token": "{{token}}"
  }
}
```

status 401:
```json
{
  "message": "Unauthorized user",
  "data": null
}
```



