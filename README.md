# How to run
- Add a `.env` file to the root of the project, with the following contents:
```
PUBLIC_MAPBOX_ACCESS_TOKEN="<mapbox-access-token>"
DB_CONNECTION_STRING="<connection-string-to-postgres-db>"
MAILGUN_API_KEY="<mailgun-api-key>"
MAILGUN_TEST_EMAIL="<optional-email-to-send-mails-to>"
JWT_SECRET="<super-secret-string>"
DO_SPACES_ACCESS_KEY="<digital-ocean-spaces-access-key>"
DO_SPACES_SECRET_KEY="<digital-ocean-spaces-secret-key>"
DO_SPACES_REGION="<digital-ocean-spaces-region>"
DO_SPACES_BUCKET_NAME="<digital-ocean-spaces-bucket-name>"
DO_SPACES_ENDPOINT="<digital-ocean-spaces-endpoint>"
PUBLIC_DO_SPACES_IMAGE_CDN="<digital-ocean-spaces-image-cdn>"
```
- Run `docker-compose up` in a terminal
- Go to [localhost:3000](http://localhost:3000/)

# How to run in development mode
- Add a `.env` file to the root of the project, with the following contents:
```
PUBLIC_MAPBOX_ACCESS_TOKEN="<mapbox-access-token>"
DB_CONNECTION_STRING="<connection-string-to-postgres-db>"
MAILGUN_API_KEY="<mailgun-api-key>"
MAILGUN_TEST_EMAIL="<optional-email-to-send-mails-to>"
JWT_SECRET="<super-secret-string>"
DO_SPACES_ACCESS_KEY="<digital-ocean-spaces-access-key>"
DO_SPACES_SECRET_KEY="<digital-ocean-spaces-secret-key>"
DO_SPACES_REGION="<digital-ocean-spaces-region>"
DO_SPACES_BUCKET_NAME="<digital-ocean-spaces-bucket-name>"
DO_SPACES_ENDPOINT="<digital-ocean-spaces-endpoint>"
PUBLIC_DO_SPACES_IMAGE_CDN="<digital-ocean-spaces-image-cdn>"
```
- Run `npm i` in a terminal
- Run `npm run dev` in a terminal (make sure you have docker and docker compose installed)
- Go to [localhost:3000](http://localhost:3000/)
