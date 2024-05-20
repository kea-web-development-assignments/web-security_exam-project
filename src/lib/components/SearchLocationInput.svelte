<script>
    import searchIcon from '$lib/images/search-icon.svg'
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let query = '';
    export let initialLocation;

    export let name = '';
    export let label = '';
    export let title = '';
    export let pattern = '.*';
    export let required = false;
    export let noRequiredMarker = false;
    export let errorMessage = '';

    export let noButton = false;
    export let rounded = false;
    export let dropShaddow = false;
    export let border = false;
    export let dense = false;

    $: if(initialLocation) {
        query = initialLocation.query;
        initialLocation = undefined;
    }

    let id = crypto.randomUUID();
    let thisElement;
    let locations = [];
    let showSearchResults = false;
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
            checkSearchBarFocus();
        } catch (error) {
            showSearchResults = false;
            console.error('Failed to query locations', error);
            alert('Something went wrong, try again later');
        }
    }

    function submit(location) {
        if(!location) {
            return;
        }

        showSearchResults = false;
        const { place, coordinates } = location;
        query = place;

        dispatch('location', { place, coordinates });
    }

    function checkSearchBarFocus() {
        //checks if focus is still within the searchbar (input, button, search results)
        //if not, the search results list will be hidden
        if(!thisElement.matches(':focus-within')) {
            showSearchResults = false;
            return;
        }

        showSearchResults = true;
    }
</script>

{#if label}
    <label
        class="pl-1 -mb-3"
        for={id}
    >
        {label}
        {#if required && !noRequiredMarker}
            <span class="text-rose-500">*</span>
        {/if}
    </label>
{/if}
<section
    class="h-full w-full relative z-10"
    class:rounded-full={rounded}
    class:drop-shadow-around-md={dropShaddow}
    class:bg-white={dropShaddow}
    class:bg-gray-200={!dropShaddow}
    class:border={border}
    class:border-gray-400={border}
    class:p-1={!dense}
    class:mx-4={!dense}
    class:md:p-2={!dense}
    bind:this={thisElement}
>
    <section class="h-full flex items-center">
        <input
            {id}
            class="w-full border-none outline-none"
            class:bg-gray-200={!dropShaddow}
            class:m-1.5={!dense}
            class:p-2={dense}
            type="text"
            {name}
            placeholder="Copenhagen street"
            {title}
            {pattern}
            {required}
            bind:value={query}
            on:input={() => debounceSearch(500)}
            on:keyup={(e) => {
                if(e.key === 'Enter') {
                    submit(locations[0])
                    e.target.blur();
                }
            }}
            on:focus={() => showSearchResults = true}
            on:blur={checkSearchBarFocus}
        >
        {#if !noButton}
            <button
                class="h-full shrink-0 flex items-center bg-rose-500 cursor-pointer duration-200 p-1.5 hover:opacity-80"
                class:rounded-full={rounded}
                value="Search"
                on:click={(e) => {
                    submit(locations[0])
                    e.target.blur();
                }}
                on:blur={checkSearchBarFocus}
            >
                <span class="hidden text-white font-bold md:block">Search</span>
                <img class="h-full md:hidden" src={searchIcon} alt="Search">
            </button>
        {/if}
    </section>
    {#if showSearchResults && locations.length}
        <section class="w-full left-0 absolute bg-white rounded-xl drop-shadow-around-md mt-4">
            {#each locations as location}
                <button
                    class="w-full block p-2 hover:bg-gray-300 duration-200 first:rounded-t-xl last:rounded-b-xl"
                    on:click={() => submit(location)}
                    on:blur={checkSearchBarFocus}
                >
                    <p class="font-bold text-ellipsis overflow-hidden text-nowrap">{location.place}</p>
                    <p class="text-ellipsis overflow-hidden text-nowrap">{location.place_formatted}</p>
                </button>
            {/each}
        </section>
    {/if}
</section>
{#if errorMessage}
    <p class="text-rose-500">{errorMessage}</p>
{/if}
