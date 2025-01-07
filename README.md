
# <p align="center">API documentation</p>
  
This API was created for manage all informations of Sound-nation festival's website.

## 🧐 Features    
- Manage artits and bands.
- Manage all partners.
- Manage all interest point on the map.
- Update legal informations.
- Manage FAQ


## 🛠️ Tech Stack
- [NodeJs](https://nodejs.org/)
- [Express js](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [Vitest](https://vitest.dev/)
- [Docker](https://www.docker.com/)
        
        

    
## ➤ API Reference
### Exemples:

### Submit form
```http
POST /api/groupes/addGroupe
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name`   | `string` | **Required**. Name of the band    |
| `hour`  | `number` | **Required**. Hour of the concert   |
| `date`| `string` | **Required**. Date of the concert |
|`scene`| `number`| **Required**. Stage of the concert |
| `image`| `file` | **Required**. Image of the band |
| `alternative text`| `string` | **Required**. Image description |
| `Biography`| `text` | **Required**. band's biography |





## ➤ API Reference 2

### Get all bands
```http
GET /api/groupes/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token` | `string` | **Required**. Your auth token |

### Get band by id
```http
GET /api/groupes/:groupId
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `groupId` | `number` | **Required**. Group id |




        
        