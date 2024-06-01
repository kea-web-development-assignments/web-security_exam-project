<script>
    import { Map, Marker } from '@beyonk/svelte-mapbox'
    import { onDestroy } from 'svelte';
    import { PUBLIC_MAPBOX_ACCESS_TOKEN } from '$env/static/public';
    import { page } from '$app/stores';
    import { PropertyCard } from '$lib/components';
    import mapIcon from '$lib/images/map-icon.svg'

    let map;
    let zoom = 12;
    //coordinates for Copenhagen
    let lon = 12.5697339;
    let lat = 55.6753132;

    let loading = true;
    let properties = [];
    let displayList = false;

    $: map?.on('movestart', onMapMoveStart);
    $: {
        lat = $page.url.searchParams?.get('lat') ?? lat;
        lon = $page.url.searchParams?.get('lon') ?? lon;
        map?.flyTo({ center: [ lon, lat ], zoom });
    }

    function onMapMoveStart() {
        loading = true;
    }
    function onMapMoveEnd() {
        properties = $page.data.properties.filter((property) => {
            return map.getBounds().contains([property.lon, property.lat]);
        });
        loading = false;
    }

    onDestroy(() => {
        map?.remove();
    });
</script>

<svelte:head>
    <title>Airbnb</title>
</svelte:head>

<section>
    <section
        class={[
            '[width:100%] h-[calc(100%-5rem)] absolute overflow-y-scroll lg:[&::-webkit-scrollbar]:hidden py-8 px-4',
            displayList ? 'block' : 'hidden',
            'lg:w-3/5 lg:block',
        ].join(' ')}
    >
        {#if loading}
            <section class="flex flex-col gap-2 justify-center items-center">
                <div class="h-16 w-16 rounded-full border [border-width:7px] border-gray-300 border-t-rose-500 animate-spin" />
                <p class="text-xl">
                    Loading data...
                </p>
            </section>
        {:else}
            {#if properties.length}
                <section class={[
                    'w-full h-fit [display:grid] [grid-template-columns:repeat(1,minmax(0,1fr))] [grid-auto-rows:auto] [grid-auto-flow:row] gap-6',
                    'sm:[grid-template-columns:repeat(2,minmax(0,1fr))]',
                    '2xl:[grid-template-columns:repeat(3,minmax(0,1fr))]',
                    '3xl:[grid-template-columns:repeat(4,minmax(0,1fr))]',
                ].join(' ')}>
                        {#each properties as property}
                            <a class="h-fit" href="/properties/{property.id}">
                                <PropertyCard {property} fullWidth>
                                    <p class="text-ellipsis overflow-hidden text-nowrap" slot="more-info">
                                        <strong>{property.pricePerNight} DKK</strong> night
                                    </p>
                                </PropertyCard>
                            </a>
                        {/each}
                </section>
            {:else}
                <section class="flex justify-center items-center">
                    <p class="text-xl">
                        No properties to list
                    </p>
                </section>
            {/if}
        {/if}
    </section>
    <section
        class={[
            '[width:100%] h-[calc(100%-5rem)] absolute right-0',
            displayList ? 'hidden' : 'block',
            'lg:w-2/5 lg:block',
        ].join(' ')}
    >
        <Map
            accessToken={PUBLIC_MAPBOX_ACCESS_TOKEN}
            center={[ lon, lat ]}
            {zoom}
            bind:map={map}
            on:recentre={onMapMoveEnd}
        >
            {#each properties as property}
                <Marker
                    lat={property.lat}
                    lng={property.lon}
                    popupOptions={{ offset: 25, closeButton: false, maxWidth: '16rem' }}
                    on:click={() => map?.flyTo({ center: [ property.lon, property.lat ] })}
                >
                    <a class="h-fit outline-none" href="/properties/{property.id}" slot="popup">
                        <PropertyCard {property} fullWidth>
                            <p class="text-ellipsis overflow-hidden text-nowrap" slot="more-info">
                                <strong>{property.pricePerNight} DKK</strong> night
                            </p>
                        </PropertyCard>
                    </a>
                </Marker>
            {/each}
        </Map>
    </section>
    <section class="w-full h-40 absolute [display:flex] justify-center items-center bottom-0 lg:hidden">
        <button
            class="max-w-40 flex justify-center items-center gap-3 bg-black color-white font-bold rounded-full p-3"
            on:click={() => {
                displayList = !displayList;
                setTimeout(() => { //map.resize seems to have no effect without a small delay
                    map.resize();
                }, 50);
            }}
        >
            Show { displayList ? 'map' : 'list' }
            <img class="w-5" src={mapIcon} alt="">
        </button>
    </section>
</section>

<style>
    :global(.mapboxgl-popup-content) {
        padding: 0 !important;
        border-radius: 0.375rem !important;
    }
</style>
