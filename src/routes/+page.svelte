<script>
    import '$node-modules/mapbox-gl/dist/mapbox-gl.css';
    import { PUBLIC_MAPBOX_ACCESS_TOKEN, PUBLIC_DO_SPACES_IMAGE_CDN } from '$env/static/public';
    import { page } from '$app/stores';
    import { PropertyCard } from '$lib/components';
    import mapbox from 'mapbox-gl';
    import { onMount, onDestroy } from 'svelte';

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

        for (const property of $page.data.properties) {
            const marker = new mapbox.Marker()
                .setLngLat([ property.lon, property.lat ])
                .setPopup(
                    new mapbox.Popup({ offset: 25, closeButton: false, maxWidth: 'none' }) // add popups
                        .setHTML(`
                            <a href="/properties/${property.id}">
                                <section class="w-[16rem] h-fit min-w-[0] bg-white rounded-md drop-shadow-around-md">
                                    <img
                                        class="w-full aspect-[4/3] object-cover rounded-t-md"
                                        src="${PUBLIC_DO_SPACES_IMAGE_CDN}/${property.userId}/${property.id}/1.png"
                                        alt="${property.name}"
                                    >
                                    <section class="p-3">
                                        <h3 class="text-lg font-bold text-ellipsis overflow-hidden text-nowrap mb-1">${property.name}</h3>
                                        <p class="text-ellipsis overflow-hidden line-clamp-2 mb-4">${property.place}</p>
                                        <p class="text-ellipsis overflow-hidden text-nowrap" slot="more-info">
                                            <strong>${property.pricePerNight} DKK</strong> night
                                        </p>
                                    </section>
                                </section>
                            </a>
                        `)
                )
                .addTo(map);

            marker.getElement().addEventListener("click", () => {
                map.flyTo({ center: [ property.lon, property.lat ] })
            });
        }
    });

    onDestroy(() => {
        map?.remove();
    });
</script>

<svelte:head>
    <title>Airbnb</title>
</svelte:head>

<div class="">
    <div class="[w-full] h-[calc(100%-5rem)]  absolute overflow-y-scroll lg:[&::-webkit-scrollbar]:hidden py-8 px-4 lg:w-3/5">
        <section class={[
            'w-full h-fit [display:grid] [grid-template-columns:repeat(1,minmax(0,1fr))] [grid-auto-rows:auto] [grid-auto-flow:row] gap-6',
            'sm:[grid-template-columns:repeat(2,minmax(0,1fr))]',
            '2xl:[grid-template-columns:repeat(3,minmax(0,1fr))]',
            '3xl:[grid-template-columns:repeat(4,minmax(0,1fr))]',
        ].join(' ')}>
            {#if $page.data.properties.length}
                {#each $page.data.properties as property}
                    <a class="h-fit" href="/properties/{property.id}">
                        <PropertyCard {property} fullWidth>
                            <p class="text-ellipsis overflow-hidden text-nowrap" slot="more-info">
                                <strong>{property.pricePerNight} DKK</strong> night
                            </p>
                        </PropertyCard>
                    </a>
                {/each}
            {:else}
                <section class="flex justify-center items-center">
                    <p class="text-xl">
                        No properties to list
                    </p>
                </section>
            {/if}
        </section>
    </div>
    <div class="hidden w-2/5 h-[calc(100%-5rem)] absolute right-0 lg:block">
      <div class="w-full h-full" bind:this="{mapContainer}" />
    </div>
</div>

<style>
    :global(.mapboxgl-popup-content) {
        padding: 0;
        border-radius: 0.375rem;
    }
</style>
