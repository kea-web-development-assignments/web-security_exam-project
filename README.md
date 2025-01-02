# How to run locally in restricted mode

This is for if you don't want to add your own map service, image service, emailing service, etc., and just want to get the application up and running. Though with this, some functionalities will be restricted, like signing up and adding new properties, but some dummy data will be available to use:

- Add a `.env` file to the root of the project, with the following contents:
    ```
    PUBLIC_MAPBOX_ACCESS_TOKEN="pk.eyJ1IjoiaGFpZDAxMDkiLCJhIjoiY2x3MTUzcGcwMDhydTJxbXF5Z2hlaHRiNSJ9.UFVFcOnoAi50NQqJQqIvHw"
    DB_CONNECTION_STRING="postgresql://postgres:postgres@db:5432/postgres?schema=public"
    ORIGIN="http://localhost:4000"
    SMTP_HOST=""
    SMTP_PORT=""
    SMTP_USER=""
    SMTP_PASSWORD=""
    SMTP_FROM_EMAIL=""
    SMTP_TEST_EMAIL=""
    JWT_SECRET="super-secret-jwt-secret"
    DO_SPACES_ACCESS_KEY=""
    DO_SPACES_SECRET_KEY=""
    DO_SPACES_REGION="eu-central-1"
    DO_SPACES_BUCKET_NAME=""
    DO_SPACES_ENDPOINT=""
    PUBLIC_DO_SPACES_IMAGE_CDN=""
    ```
- Run `docker-compose up` in a terminal
- Go to [localhost:4000](http://localhost:4000/)
- The test user will have the following credentials:
  - Email: `b@b.b`
  - Password: `b`

# How to run locally
- Add a `.env` file to the root of the project, with the following contents:
```
PUBLIC_MAPBOX_ACCESS_TOKEN="<mapbox-access-token>"
DB_CONNECTION_STRING="postgresql://postgres:postgres@db:5432/postgres?schema=public"
ORIGIN="http://localhost:4000"
SMTP_HOST="<SMTP-host>"
SMTP_PORT="<SMTP-port>"
SMTP_USER="<SMTP-user>"
SMTP_PASSWORD="<SMTP-password>"
SMTP_FROM_EMAIL="<SMTP-sender-email>"
SMTP_TEST_EMAIL="<optional-email-to-send-all-mails-to-for-testing>"
JWT_SECRET="<super-secret-string>"
DO_SPACES_ACCESS_KEY="<digital-ocean-spaces-access-key>"
DO_SPACES_SECRET_KEY="<digital-ocean-spaces-secret-key>"
DO_SPACES_REGION="<digital-ocean-spaces-region>"
DO_SPACES_BUCKET_NAME="<digital-ocean-spaces-bucket-name>"
DO_SPACES_ENDPOINT="<digital-ocean-spaces-endpoint>"
PUBLIC_DO_SPACES_IMAGE_CDN="<digital-ocean-spaces-image-cdn-url>"
```
- Run `docker-compose up` in a terminal
- Go to [localhost:4000](http://localhost:4000/)
