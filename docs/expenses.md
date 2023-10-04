# Expenses

## POST
Endpoint: /expenses

headers:
```json
{
  "Authorization": "Bearer {{token}}",
  "Content-Type": "application/json"
}
```

body:
```json
{
  "date": String,
  "nominals": Number,
  "category_id": String,
  "expense_type_id": String,
  "information": String,
}
```

response:

status 200:
```json
{
  "message": "Successfully add an expense",
}
```
status 400:
```json
{
  "message": "Nominal is required"
}
```

## GET
Endpoint: /expenses

headers:
```json
{
  "Authorization": "Bearer {{token}}",
  "Content-Type": "application/json"
}
```

query(optional):
```json
{
  "month": String,
  "years": Number,
  "categories": String[],
  "expenseTypes": String[],
  "page": Number,
  "search": String
}
```

response:

status 200:
```json
{
  "message": "Successfully retrieve data",
  "data": [
    {
      "date": "20 September 2023",
      "nominals": 20000,
      "category": {
        "name": "Foods"
      },
      "expense_type": {
        "name": "Needs"
      },
      "information": "Buy a snack"
    }
  ],
  "totals": 20
}
```

status 500:
```json
{
  "message": "Internal Server Error"
}
```