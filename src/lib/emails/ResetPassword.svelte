<script>
	import { Button, Hr, Html, Text } from 'svelte-email';

	export let fullName;
    export let baseUrl;
    export let resetCode;
</script>

<Html lang="en">
	<Text>
		Hello, {fullName}!
	</Text>
	<Hr />
	<Text>
		Click on the link below to reset your password.
	</Text>
	<Hr />
    <Button
        href="{baseUrl}/forgot-password/{resetCode}"
        style={{
            color: 'white',
            'background-color': '#f43f5e',
            'font-size': '1.1rem',
            'font-weight': 'bold',
            'border-radius': '26px',
            padding: '1rem',
        }}
    >
        Reset password
    </Button>
	<Hr />
	<Text>
		If you did not ask to reset your password, you can ignore this email.
	</Text>
	<Hr />
	<Text>
		Best regards, KEA Airbnb
	</Text>
</Html>
