<script>
	import searchIcon from '$lib/images/search-icon.svg'
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';

    let thisElement;
    let query = '';
    let locations = [];
    let showSearchResults = false;
    let currentLocation;
    let timer;

    function debounceSearch(delay) {
        clearTimeout(timer);
        timer = setTimeout(async () => {
            await search();
        }, delay);
    }

    async function search() {
        try {
            const response = await fetch(`/api/locations?query=${query}`);
            const data = await response.json();

            if(response.status !== 200 && data?.error?.message) {
                alert(data?.error?.message);
                return;
            }

            locations = data.locations ?? [];
            showSearchResults = true;
        } catch (error) {
            showSearchResults = false;
            console.error('Failed to query locations', error);
            alert('Something went wrong, try again later');
        }
    }

    function submit() {
        if(!locations.length) {
            return;
        }

        const location = locations[0];
        const { name, coordinates } = location;

        goto(`?query=${name}&lon=${coordinates.lon}&lat=${coordinates.lat}`); //updates url programmatically
        setLocation(location);
    }

    function setLocation(location) {
        currentLocation = location;
        query = currentLocation.name;
        showSearchResults = false;
    }

    function checkSearchBarFocus() {
        //checks if focus is still within the searchbar (input, button, search results)
        //if not, the search results list will be hidden
        if(!thisElement.matches(':focus-within')) {
            showSearchResults = false;
        }
    }

    onMount(() => {
        const { query: searchQuery, lon, lat } = Object.fromEntries($page.url.searchParams);

        if(searchQuery && lon && lat) {
            query = searchQuery
            currentLocation = { query, coordinates: { lon, lat } };
        }
    })
</script>

<form
    class="h-full w-72 inline-block bg-white rounded-full drop-shadow-around-md z-10 p-1 mx-4 md:p-2"
    on:submit|preventDefault={submit}
    bind:this={thisElement}
>
    <section class="h-full flex items-center">
        <input
            class="w-full border-none outline-none m-1.5"
            type="text"
            placeholder="Location"
            bind:value={query}
            on:input={() => debounceSearch(500)}
            on:focus={() => showSearchResults = true}
            on:blur={checkSearchBarFocus}
        >
        <button
            class="h-full shrink-0 flex items-center bg-rose-500 rounded-full cursor-pointer duration-200 p-1.5 hover:opacity-80"
            type="submit"
            value="Search"
            on:blur={checkSearchBarFocus}
        >
            <span class="hidden text-white font-bold md:block">Search</span>
            <img class="h-full md:hidden" src={searchIcon} alt="Search">
        </button>
    </section>
    {#if showSearchResults && locations.length}
        <section class="w-full left-0 absolute bg-white rounded-xl drop-shadow-around-md mt-4">
            {#each locations as location}
                <a
                    class="w-full block p-2 hover:bg-gray-300 duration-200 first:rounded-t-xl last:rounded-b-xl"
                    href="?query={location.name}&lon={location.coordinates.lon}&lat={location.coordinates.lat}"
                    on:click={() => setLocation(location)}
                    on:blur={checkSearchBarFocus}
                >
                    <p class="font-bold text-ellipsis overflow-hidden text-nowrap">{location.name}</p>
                    <p class="text-ellipsis overflow-hidden text-nowrap">{location.place_formatted}</p>
                </a>
            {/each}
        </section>
    {/if}
</form>
