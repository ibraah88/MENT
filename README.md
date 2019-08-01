# MENT

MENT (Mongo Express Node Typescript)  - RESTful API (with JWT, Docker &amp; Docker-Compose)

This is a boilerplate for building scalable and robust REST APIs using Node.js & TypeScript.

---------------

## Getting Started
The easiest way to get started is to clone the repository:


### Get the latest snapshot
```bash
    git clone https://github.com/isdiop/MENT.git
```

### Change directory
```bash
    cd MENT
```

### Copy .env file
```bash
    cp .env.example .env
```

### Install NPM dependencies
```bash
    make install
```

### Start up the server
```bash
    make build
```

---------------

### Available routes

| Method   | Resource        | Description                                                                                                                                 |
| :------- | :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `POST`   | `/register`     | Create a new user in MongoDB. You need to specify in the body the following attributes: firstName, lastName, email & password.              |
| `POST`   | `/login`        | Sign in with the email & password. If it's successful, then generates a token                                                               |
| `GET`    | `/profile`      | Returns the collection of the connected user, you need to specify the token in the header like this: `Authorization: Bearer your-token`     | 
| `POST`   | `/products`     | Create a new product for the current user with this body: `name, description and price.` and a header `Authorization: Bearer your-token`    |
| `GET`    | `/products`     | Show all products for the current user, you need to specify the token in the header like this: `Authorization: Bearer your-token`           |
| `GET`    | `/products/:id` | Show the product by id for the current user, you need to specify the token in the header like this: `Authorization: Bearer your-token`      |
| `PUT`    | `/products/:id` | Update a product by id for the current user, you need to specify the token in the header like this: `Authorization: Bearer your-token`      |
| `DELETE` | `/products/:id` | Delete a product by id for the current user, you need to specify the token in the header like this: `Authorization: Bearer your-token`      |

## IN PROGRESS

- [x]  API Register [Registration, Auth, Show User Profile]
- [x]  API Products [CRUD User Products]
- [ ]  API Users    [Update User Account, Delete User Account and products]

## License

MIT © isdiop