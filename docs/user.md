# User

## GET
Endpoint: /user/:id/profile

Headers:
```json
{
  "Authorization": "Bearer {{token}}",
  "Content-Type": "application/json"
}
```

response:
```json
{
  "message": "Succesfully retrive data",
  "data": {
    "full_name": "John Doe",
    "profile_picture": "profile_picture.png",
    "balance": 10000000,
    "average_income_in_a_month": 1000000,
    "average_spent_in_a_month": 100000,
    "biggest_expenses": 30000000,
    "stats": {
      "this_month_expenses": {
        "dates": [1, 2, 3],
        "values": [100, 200, 300]
      },
      "most_spent_categories": {
        "foods": [131, 13],
        "drinks": [121, 1212,132],
        "extra": [1212,2321,3131]
      }
    }
  }
}
```
#

## PATCH
Endpoint: /user/:id/profile-picture

headers:
```json
{
  "Authorization": "Bearer {{token}}",
  "Content-Type": "application/json"
}
```

file mime-types: JPG, PNG, JPEG

body:
```json
{
  "profile_picture": "avatar.png"
}
```

response:

status 200:
```json
{
  "message": "Successfully updated profile picture"
}
```

status 400:
```json
{
  "message": "Invalid file format",
}
```

status 404:
```json
{
  "message": "User not found"
}
```