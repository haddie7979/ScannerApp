# Scanner App API Documentation

### Running the Backend Locally

---

1. Navigate into back-end/api
2. Run <code>$ go build</code> to create an executable (you must build this locally because the file is large and all .exe are included in .gitignore)
3. Run <code>$ ./ScannerApp</code> to start up the back-end

**NOTE:** Running this will output a message that the back-end is listening on port 9000. However, the proxy configuration of our frontend means that all requests to the API made from the Angular client should be made to the same URL the frontend is running on (e.g. <code>http://localhost:4200/api/signup</code>). Requests should only be made to port 9000 when making requests from Postman or similar applications.

### User Signup/Login

---

<details>
    <summary><code>POST</code> <code><b>/api/signup</b></code> <code>Adds user info and credentials to database</code></summary>

##### Parameters

> | name        | type     | data type | description |
> | ----------- | -------- | --------- | ----------- |
> | `firstname` | required | string    | N/A         |
> | `lastname`  | required | string    | N/A         |
> | `email`     | required | string    | N/A         |
> | `password`  | required | string    | N/A         |

##### Responses

> | http code | content-type       | response                                                  |
> | --------- | ------------------ | --------------------------------------------------------- |
> | `201`     | `application/json` | `{"message":"User successfully created"}`                 |
> | `400`     | `application/json` | `{"message":"All fields are required"}`                   |
> | `409`     | `application/json` | `{"message":"Email is already registered to an account"}` |
> | `500`     | `application/json` | `{"message":"Could not generate password hash"}`          |
> | `500`     | `application/json` | `{"message":"Error decoding JSON body"}`                  |

</details>

<details>
    <summary><code>POST</code> <code><b>/api/login</b></code> <code>Authenticates user and saves cookie to be used by frontend</code></summary>

##### Parameters

> | name       | type     | data type | description |
> | ---------- | -------- | --------- | ----------- |
> | `email`    | required | string    | N/A         |
> | `password` | required | string    | N/A         |

##### Responses

> | http code | content-type       | response                                            |
> | --------- | ------------------ | --------------------------------------------------- |
> | `202`     | `application/json` | `{"message":"User successfully logged in"}`         |
> | `400`     | `application/json` | `{"message":"Email not registered to any account"}` |
> | `401`     | `application/json` | `{"message":"Incorrect password"}`                  |
> | `500`     | `application/json` | `{"message":"Error creating JWT"}`                  |
> | `500`     | `application/json` | `{"message":"Error decoding JSON body"}`            |

</details>

<details>
    <summary><code>GET</code> <code><b>/api/logged-in</b></code> <code>Checks whether any user is logged in and returns email if so</code></summary>

##### Parameters

> `none`

##### Responses

> | http code | content-type       | response                                 |
> | --------- | ------------------ | ---------------------------------------- |
> | `200`     | `application/json` | `{"email":"*current email logged in*"}`  |
> | `401`     | `application/json` | `{"message":"No user logged in"}`        |
> | `500`     | `application/json` | `{"message":"Error parsing JWT"}`        |
> | `500`     | `application/json` | `{"message":"Error decoding JSON body"}` |

</details>