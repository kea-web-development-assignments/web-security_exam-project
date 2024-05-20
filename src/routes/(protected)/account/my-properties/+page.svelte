<script>
    import { invalidateAll } from '$app/navigation';
    import { page } from '$app/stores';
	import { PropertyFormDialog } from '$lib/components';

	let showPropertyDialog = false;
    let propertyFormData = {};
</script>

<svelte:head>
	<title>My properties | Airbnb</title>
</svelte:head>

<h1 class="[grid-area:header] text-4xl font-bold">Properties</h1>
<section class="[grid-area:content] h-fit w-full flex flex-col gap-2 bg-white rounded-md drop-shadow-around-md p-4">
    {#if $page.data.properties.length}
        {#each $page.data.properties as property}
            {JSON.stringify(property)}
        {/each}
    {:else}
        <p class="text-lg text-center p-4">
            No properties to list here
        </p>
    {/if}
</section>
<button on:click={() => { showPropertyDialog = true }}>yaaa</button>

<PropertyFormDialog
    formAction="?/addProperty"
    formEnctype="multipart/form-data"
    submitButtonText="Add property"
    errorFormId="addPropertyForm"
	bind:showDialog={showPropertyDialog}
    formUseEnhanceCallback={() => {
        return async ({ result, update }) => {
            if(result.status === 200) {
                await invalidateAll();
                showPropertyDialog = false;
            }

            update();
        }
    }}
/>

<dialog>
  <form method="POST" action="?/">
    <button class="primary-button" formmethod="dialog">Cancel</button>
    <button class="danger-button">Confirm</button>
  </form>
</dialog>
