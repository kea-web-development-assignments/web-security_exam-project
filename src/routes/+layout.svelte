<script>
	import '../app.css';
	import airbnbLogo from '$lib/images/airbnb-logo.svg'
	import airbnbLogoBig from '$lib/images/airbnb-logo-big.svg'
	import { SearchBar, ProfileMenu } from '$lib/components';

	export let data;
</script>

<header class="h-20 flex justify-between items-center shadow-md p-4">
	<a class="h-full flex items-center" href="/">
		<img class="h-2/3" src={airbnbLogoBig} alt="">
	</a>
	{#if data.showSearchBar}
		<SearchBar />
	{/if}
	<ProfileMenu />
</header>

<body>
	<slot />
</body>
