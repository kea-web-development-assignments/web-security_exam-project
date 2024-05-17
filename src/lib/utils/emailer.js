import mailgun from 'mailgun-js';
import { MAILGUN_API_KEY, MAILGUN_TEST_EMAIL } from '$env/static/private';
import { render } from 'svelte-email';
import VerifyAccount from '$lib/emails/VerifyAccount.svelte';
import ResetPassword from '$lib/emails/ResetPassword.svelte';

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
