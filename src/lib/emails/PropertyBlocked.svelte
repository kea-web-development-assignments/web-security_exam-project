<script>
	import { Hr, Html, Text } from 'svelte-email';

	export let fullName;
	export let propertyName;
</script>

<Html lang="en">
	<Text>
		Hello, {fullName}!
	</Text>
	<Hr />
	<Text style={{'display':'inline-block'}}>
		Your property&nbsp<Text style={{'display':'inline-block', 'font-weight': 'bold'}}>{propertyName}</Text> has been blocked.
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
