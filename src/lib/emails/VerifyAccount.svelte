<script>
	import { Button, Hr, Html, Text } from 'svelte-email';

	export let fullName;
    export let baseUrl;
    export let verificationCode;
</script>

<Html lang="en">
	<Text>
		Hello, {fullName}!
	</Text>
	<Hr />
	<Text>
		Please verify your account by clicking on the link below.
	</Text>
	<Hr />
    <Button
        href="{baseUrl}/verify-account/{verificationCode}"
        style={{
            color: 'white',
            'background-color': '#f43f5e',
            'font-size': '1.1rem',
            'font-weight': 'bold',
            'border-radius': '26px',
            padding: '1rem',
        }}
    >
        Verify account
    </Button>
</Html>
