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
		Your account has been unblocked!
	</Text>
	<Hr />
	<Text>
		Best regards, KEA Airbnb
	</Text>
</Html>
