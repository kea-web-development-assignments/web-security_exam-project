# How to run
- Add a `.env` file to the root of the project, with the following contents:
```
PUBLIC_MAPBOX_ACCESS_TOKEN="<mapbox-access-token>"
DB_CONNECTION_STRING="postgresql://postgres:postgres@db:5432/postgres?schema=public"
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
