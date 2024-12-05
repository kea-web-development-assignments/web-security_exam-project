import nodemailer from 'nodemailer';
import {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASSWORD,
    SMTP_FROM_EMAIL,
    SMTP_TEST_EMAIL,
} from '$env/static/private';
import { render } from 'svelte-email';
import {
    VerifyAccount,
    ResetPassword,
    AccountDeleted,
    AccountBlocked,
    AccountUnblocked,
    PropertyBlocked,
    PropertyUnblocked,
} from '$lib/emails';

const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
    },
});

const from = `KEA airbnb <${SMTP_FROM_EMAIL}>`;

export async function sendVerificationMail({ id, email, firstName, lastName }, verificationCode, baseUrl) {
    const htmlBody = render({
        template: VerifyAccount,
        props: {
            userId: id,
            fullName: `${firstName} ${lastName}`,
            baseUrl,
            verificationCode,
        },
    });

    await transporter.sendMail({
        from,
        to: SMTP_TEST_EMAIL || email,
        subject: 'Kea airbnb account requires verification',
        html: htmlBody,
    });
}

export async function sendPasswordResetMail({ email, firstName, lastName }, resetCode, baseUrl) {
    const htmlBody = render({
        template: ResetPassword,
        props: {
            fullName: `${firstName} ${lastName}`,
            baseUrl,
            resetCode,
        },
    });

    await transporter.sendMail({
        from,
        to: SMTP_TEST_EMAIL || email,
        subject: 'Reset link for your Kea airbnb account',
        html: htmlBody,
    });
}

export async function sendAccountDeletedMail({ email, firstName, lastName }) {
    const htmlBody = render({
        template: AccountDeleted,
        props: {
            fullName: `${firstName} ${lastName}`,
        },
    });

    await transporter.sendMail({
        from,
        to: SMTP_TEST_EMAIL || email,
        subject: 'Kea airbnb account has been deleted',
        html: htmlBody,
    });
}

export async function sendAccountBlockedMail({ email, firstName, lastName }) {
    const htmlBody = render({
        template: AccountBlocked,
        props: {
            fullName: `${firstName} ${lastName}`,
        },
    });

    await transporter.sendMail({
        from,
        to: SMTP_TEST_EMAIL || email,
        subject: 'Kea airbnb account has been blocked',
        html: htmlBody,
    });
}

export async function sendAccountUnblockedMail({ email, firstName, lastName }) {
    const htmlBody = render({
        template: AccountUnblocked,
        props: {
            fullName: `${firstName} ${lastName}`,
        },
    });

    await transporter.sendMail({
        from,
        to: SMTP_TEST_EMAIL || email,
        subject: 'Kea airbnb account has been unblocked',
        html: htmlBody,
    });
}

export async function sendPropertyBlockedMail({ email, firstName, lastName }, propertyName) {
    const htmlBody = render({
        template: PropertyBlocked,
        props: {
            fullName: `${firstName} ${lastName}`,
            propertyName,
        },
    });

    await transporter.sendMail({
        from,
        to: SMTP_TEST_EMAIL || email,
        subject: `Kea airbnb property "${propertyName}" has been blocked`,
        html: htmlBody,
    });
}

export async function sendPropertyUnblockedMail({ email, firstName, lastName }, propertyName) {
    const htmlBody = render({
        template: PropertyUnblocked,
        props: {
            fullName: `${firstName} ${lastName}`,
            propertyName,
        },
    });

    await transporter.sendMail({
        from,
        to: SMTP_TEST_EMAIL || email,
        subject: `Kea airbnb property "${propertyName}" has been unblocked`,
        html: htmlBody,
    });
}
