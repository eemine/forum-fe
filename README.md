# Forum server

## How to start development

### Configure local environment
1. Create `.env` file based on `.env.template`
2. Update mongoDB connection on `MONGODB_URI` variable according to your environment
3. Recommended: Update `SESSION_SECRET` and `JWT_SECRET`
4. Port for API can be configured on `HOST_PORT`

### Install dependencies
```sh
npm install
```

### Running in dev mode
```sh
npm run dev
```

### Starting server
```sh
npm start
```
### Postman collection
You can import postman collection for API calls from file `Forum API.postman_collection.json`
