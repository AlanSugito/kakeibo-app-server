# Income

## POST
Endpoint: /incomes

headers:
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer {{token}}"
}
```

body:
```json
  {
    "date": String,
    "nominal": Number,
    "information": String,
  }
```

response:

status 201:
```json
{
  "message": "Succesfully added income",
}
```

status 400:
```json
{
  "message": "Nominal is required!",
}
```
#
## GET
Endpoint: /incomes

headers:
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer {{token}}"
}
```

query (optional):

```json
{
  "month": Number,
  "year": Number,
  "page": Number,
  "search": String,
}
```

response:

status 200:
```json
  {
    "message": "Successfully retrieve data",
    "data": {
      "incomes": [],
      "totals": 20
    }
  }
```

status 500:
```json
{
  "message": "Internal server error",
  "data": null
}
```




