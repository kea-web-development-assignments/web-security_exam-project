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
		Your account has been blocked.
	</Text>
	<Hr />
	<Text>
		Contact support if you have any questions.
	</Text>
	<Hr />
	<Text>
		Best regards, KEA Airbnb
	</Text>
</Html>
