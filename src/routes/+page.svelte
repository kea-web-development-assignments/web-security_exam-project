<script>
	import { onMount, onDestroy } from 'svelte';
    import { page } from '$app/stores';
	import { PUBLIC_MAPBOX_ACCESS_TOKEN } from '$env/static/public';
	import mapbox from 'mapbox-gl';
	import '$node-modules/mapbox-gl/dist/mapbox-gl.css';

	let map;
	let mapContainer;
	let zoom = 12;
	//coordinates for Copenhagen
	let lon = 12.5697339;
	let lat = 55.6753132;

	$: {
		lat = $page.url.searchParams?.get('lat') ?? lat;
		lon = $page.url.searchParams?.get('lon') ?? lon;
		map?.flyTo({ center: [ lon, lat ], zoom })
	}

	onMount(() => {
		map = new mapbox.Map({
			container: mapContainer,
			accessToken: PUBLIC_MAPBOX_ACCESS_TOKEN,
			style: `mapbox://styles/mapbox/outdoors-v11`,
			center: [ lon, lat ],
			zoom,
		});
	});

	onDestroy(() => {
		map?.remove();
	});
</script>

<svelte:head>
	<title>Airbnb</title>
</svelte:head>

<div class="w-full h-[calc(100%-5rem)] absolute">
  <div class="w-full h-full" bind:this="{mapContainer}" />
</div>
