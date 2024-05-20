<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { SearchLocationInput } from '$lib/components';

    let initialLocation;

    function updateLocationInUrl(location) {
        const { place, coordinates } = location;

        goto(`?query=${place}&lon=${coordinates.lon}&lat=${coordinates.lat}`); //updates url programmatically
    }

    onMount(() => {
        const { query, lon, lat } = Object.fromEntries($page.url.searchParams);

        if(query && lon && lat) {
            initialLocation = { query, coordinates: { lon, lat } };
        }
    });
</script>

<section class="h-full w-72 z-10">
    <SearchLocationInput
        initialLocation={initialLocation}
        on:location={(e) => updateLocationInUrl(e.detail)}
        rounded
        dropShaddow
    />
</section>
