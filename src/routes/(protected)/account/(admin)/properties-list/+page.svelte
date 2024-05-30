<script>
    import { enhance } from '$app/forms';
    import { invalidateAll } from '$app/navigation';
    import { page } from '$app/stores';
    import { PropertyCard } from '$lib/components';
</script>

<svelte:head>
	<title>All properties | Airbnb</title>
</svelte:head>

<h1 class="[grid-area:header] text-4xl font-bold">All properties</h1>
<section class="[grid-area:content] h-fit w-full flex flex-wrap justify-center gap-4">
    {#if $page.data.properties.length}
        {#each $page.data.properties as property}
            <form
                class="flex w-[22rem] min-w-[14rem]"
                method="POST"
                action="?/blockProperty"
                use:enhance={() => {
                    return async ({ result, update }) => {
                        if(result.status === 200) {
                            await invalidateAll();
                            alert('Property has been blocked.');
                            return;
                        }

                        update();
                    }
                }}
            >
                <input type="hidden" name="id" value={property.id}>
                <input type="hidden" name="email" value={property.users.email}>
                <input type="hidden" name="firstName" value={property.users.firstName}>
                <input type="hidden" name="lastName" value={property.users.lastName}>
                <PropertyCard {property}>
                    <section class="flex justify-end text-lg" slot="actions">
                        <input
                            class="w-1/3 bg-rose-500 text-white text-center rounded-lg cursor-pointer p-2 mt-2"
                            type="submit"
                            value="Block"
                        >
                    </section>
                    <p
                        class="text-rose-500 text-center p-2"
                        class:hidden={$page.status === 200 || !$page.form?.[property.id]?.error?.message}
                        slot="error-message"
                    >
                        {$page.form?.[property.id]?.error?.message}
                    </p>
                </PropertyCard>
            </form>
        {/each}
    {:else}
        <section class="[grid-area:content] h-fit w-full flex flex-col gap-2 bg-white rounded-md drop-shadow-around-md p-4">
            <p class="text-lg text-center p-4">
                No properties to list here
            </p>
        </section>
    {/if}
</section>
