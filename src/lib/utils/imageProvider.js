import {
    S3Client,
    PutObjectCommand,
    DeleteObjectsCommand,
    ListObjectsV2Command
} from '@aws-sdk/client-s3';
import {
    DO_SPACES_ACCESS_KEY,
    DO_SPACES_SECRET_KEY,
    DO_SPACES_REGION,
    DO_SPACES_BUCKET_NAME,
    DO_SPACES_ENDPOINT,
} from '$env/static/private';

const s3 = new S3Client({
    region: DO_SPACES_REGION,
    endpoint: DO_SPACES_ENDPOINT,
    credentials: {
        accessKeyId: DO_SPACES_ACCESS_KEY,
        secretAccessKey: DO_SPACES_SECRET_KEY,
    }
});

export async function saveImagesToS3(userId, propertyId, images) {
    if(!userId || !propertyId) {
        return;
    }

    const uploadCommands = [];
    for (let index = 0; index < images.length; index++) {
        const image = images[index];
        const fileName = `${index + 1}.png`;

        const uploadCommand = new PutObjectCommand({
            Bucket: DO_SPACES_BUCKET_NAME,
            Key: `${userId}/${propertyId}/${fileName}`,
            Body: await image.arrayBuffer(),
            ACL: "public-read",
        });
        uploadCommands.push(s3.send(uploadCommand));
    }

    try {
        await Promise.all(uploadCommands);
    } catch (error) {
        console.error("Failed to upload images", error);

        throw {
            status: 500,
            message: 'Failed to upload images',
        };
    }
}

export async function deleteImagesFromS3(userId, propertyId) {
    if(!userId || !propertyId) {
        return;
    }

    try {
        const response = await s3.send(new ListObjectsV2Command({
            Bucket: DO_SPACES_BUCKET_NAME,
            Prefix: `${userId}/${propertyId}`,
        }));

        if(!response.Contents || !response.Contents?.length) {
            return;
        }

        await s3.send(new DeleteObjectsCommand({
            Bucket: DO_SPACES_BUCKET_NAME,
            Delete: {
                Objects: response.Contents,
            },
        }));
    } catch(error) {
        console.error("Failed to delete images", error);

        throw {
            status: 500,
            message: 'Failed to delete images',
        };
    }
}

export async function updateImagesInS3(userId, propertyId, images) {
    if(!userId || !propertyId) {
        return;
    }

    try {
        await deleteImagesFromS3(userId, propertyId);

        await saveImagesToS3(userId, propertyId, images);
    } catch(error) {
        console.error("Failed to upload images", error);

        throw {
            status: 500,
            message: 'Failed to upload images',
        };
    }
}
