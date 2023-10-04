# Category

## POST
Endpoint: /categories

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
Endpoint: /categories

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
      "description": "a category for food" 
    }
  ],
  "totals": 3
}
```
#

## PATCH
Endpoint: /categories/:id

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
  "message": "successfully updated category"
}
```

status 404:
```json
{
  "message": "Category not found"
}
```

#

## DELETE
Endpoint: /categories/:id

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
  "message": "successfully deleted category"
}
```

status 404:
```json
{
  "message": "Category not found"
}
```




