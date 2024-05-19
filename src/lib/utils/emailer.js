import mailgun from 'mailgun-js';
import { MAILGUN_API_KEY, MAILGUN_TEST_EMAIL } from '$env/static/private';
import { render } from 'svelte-email';
import { VerifyAccount, ResetPassword, AccountDeleted, AccountBlocked, AccountUnblocked } from '$lib/emails';

const domain = 'sandbox2ed00ddcd76e4773a0e4d6d155292047.mailgun.org';
const from = 'KEA airbnb <postmaster@sandbox2ed00ddcd76e4773a0e4d6d155292047.mailgun.org>'
const mailer = mailgun({ apiKey: MAILGUN_API_KEY, domain });

export async function sendVerificationMail({ email, firstName, lastName }, verificationCode, baseUrl) {
    const htmlBody = render({
        template: VerifyAccount,
        props: {
            fullName: `${firstName} ${lastName}`,
            baseUrl,
            verificationCode,
        },
    });

    await mailer.messages().send({
        from,
        to: MAILGUN_TEST_EMAIL, //For conveniance
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

    await mailer.messages().send({
        from,
        to: MAILGUN_TEST_EMAIL, //For conveniance
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

    await mailer.messages().send({
        from,
        to: MAILGUN_TEST_EMAIL, //For conveniance
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

    await mailer.messages().send({
        from,
        to: MAILGUN_TEST_EMAIL, //For conveniance
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

    await mailer.messages().send({
        from,
        to: MAILGUN_TEST_EMAIL, //For conveniance
        subject: 'Kea airbnb account has been unblocked',
        html: htmlBody,
    });
}
