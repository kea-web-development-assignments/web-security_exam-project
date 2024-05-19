<script>
	import { Hr, Html, Text } from 'svelte-email';

	export let fullName;
</script>

<Html lang="en">
	<Text>
		Hello, {fullName}!
	</Text>
	<Hr />
	<Text>
		Your account has been successfully deleted.
	</Text>
	<Hr />
	<Text>
		If you did not delete your account, contact support as soon as possible.
	</Text>
	<Hr />
	<Text>
		Best regards, KEA Airbnb
	</Text>
</Html>
