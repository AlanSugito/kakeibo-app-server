# Expense Type

## POST
Endpoint: /expense-types

headers:
```json
{
  "Authorization": "Bearer {{token}}"
}
```

body:
```json
{
  "name": String,
  "description": String,
  "user_id": String
}
```
#

## GET
Endpoint: /expense-types

headers:
```json
{
  "Authorization": "Bearer {{token}}"
}
```

query (optional):
```json
{
  "search": String,
  "page": Number
}
```

response:

status 200:
```json
{
  "message": "Succesfully retrieve data",
  "data": [
    {
      "name": "Foods",
      "description": "a expense type for food" 
    }
  ],
  "totals": 3
}
```
#

## PATCH
Endpoint: /expense-types/:id

headers:
```json
{
  "Authorization": "Bearer {{token}}"
}
```

body:
```json
{
  "name"?: String,
  "description"?: String
}
```

response

status 200:
```json
{
  "message": "successfully updated expense type"
}
```

status 404:
```json
{
  "message": "expense type not found"
}
```

#

## DELETE
Endpoint: /expense-types/:id

headers:
```json
{
  "Authorization": "Bearer {{token}}"
}
```

response:

status 200:
```json
{
  "message": "successfully deleted expense type"
}
```

status 404:
```json
{
  "message": "Expense type not found"
}
```




