# server

### PostgreSQL Database

To create new databases or delete existing ones, set your `POSTGRES_USERNAME` and `POSTGRES_PASSWORD` to your PostgreSQL user's username and password. While PostgreSQL is running, use the helpers in `utils/db-helpers.js` to create new databases (e.g. for testing) or drop existing ones.

After creating a new database, set your `POSTGRES_DATABASE` environment variable to the database's name.