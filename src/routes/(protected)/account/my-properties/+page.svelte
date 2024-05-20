<script>
    import { enhance } from '$app/forms';
    import { invalidateAll } from '$app/navigation';
    import { page } from '$app/stores';
	import { PropertyFormDialog } from '$lib/components';
    import { PUBLIC_DO_SPACES_IMAGE_CDN } from '$env/static/public';

	let showAddPropertyDialog = false;
	let showUpdatePropertyDialog = false;
	let deletePropertyDialog;
    let propertyFormData = {};
</script>

<svelte:head>
	<title>My properties | Airbnb</title>
</svelte:head>

<h1 class="[grid-area:header] text-4xl font-bold">My properties</h1>
<section class="[grid-area:content] h-fit w-full flex flex-wrap justify-center gap-4">
    {#each $page.data.properties as property}
        <article
            class="w-[22rem] min-w-[14rem] bg-white rounded-md drop-shadow-around-md"
        >
            <img
                class="w-full h-[12rem] object-cover rounded-t-md"
                src={`${PUBLIC_DO_SPACES_IMAGE_CDN}/${property.userId}/${property.id}/1.png`}
                alt={property.name}
            >
            <section class="p-3">
                <h3 class="text-lg font-bold text-ellipsis overflow-hidden text-nowrap mb-1">{property.name}</h3>
                <p class="text-ellipsis overflow-hidden line-clamp-2 mb-4">{property.place}</p>
                <section class="flex justify-between text-lg">
                    <button
                        class="w-1/3 bg-blue-500 text-white text-center rounded-lg p-2 mt-2"
                        on:click={() => {
                            propertyFormData = property;
                            showUpdatePropertyDialog = true;
                        }}
                    >
                        Update
                    </button>
                    <button
                        class="w-1/3 bg-rose-500 text-white text-center rounded-lg p-2 mt-2"
                        on:click={() => {
                            propertyFormData = property;
                            deletePropertyDialog.showModal();
                        }}
                    >
                        Delete
                    </button>
                </section>
            </section>
        </article>
    {/each}
    <article class="w-[22rem] flex justify-center items-center rounded-md drop-shadow-around-md">
        <button
            class="text-blue-500 border border-blue-500 text-center duration-200 p-2 m-4 hover:bg-blue-100"
            on:click={() => { showAddPropertyDialog = true }}
        >
            + Add property
        </button>
    </article>
</section>

<PropertyFormDialog
    formAction="?/addProperty"
    formEnctype="multipart/form-data"
    submitButtonText="Add"
    errorFormId="addPropertyForm"
    imagesRequired
	bind:showDialog={showAddPropertyDialog}
    formUseEnhanceCallback={() => {
        return async ({ result, update }) => {
            if(result.status === 200) {
                await invalidateAll();
                showAddPropertyDialog = false;
                propertyFormData
            }

            update();
        }
    }}
/>

<PropertyFormDialog
    formAction="?/updateProperty"
    formEnctype="multipart/form-data"
    submitButtonText="Update"
    errorFormId="updatePropertyForm"
	bind:showDialog={showUpdatePropertyDialog}
    bind:data={propertyFormData}
    formUseEnhanceCallback={() => {
        return async ({ result, update }) => {
            if(result.status === 200) {
                await invalidateAll();
                showUpdatePropertyDialog = false;
                propertyFormData = {};
            }

            update();
        }
    }}
/>

<dialog
    class="w-full rounded-md backdrop:bg-black backdrop:bg-opacity-70 sm:max-w-[66%] lg:max-w-[28rem]"
    bind:this={deletePropertyDialog}
>
    <form
        class="w-full flex flex-col gap-3 bg-white rounded-md p-4"
        method="POST"
        action="?/deleteProperty"
        use:enhance={() => {
            return async ({ result, update }) => {
                if(result.status === 200) {
                    await invalidateAll();
                    deletePropertyDialog.close();
                    propertyFormData = {};
                }

                update();
            }
        }}
    >
		<input
			type="hidden"
			name="id"
			required
			bind:value={propertyFormData.id}
		>
        <p class="text-lg">
            Are you sure you want to delete your property <strong class="font-bold">{propertyFormData.name}</strong>?
        </p>
		<section class="flex justify-between text-lg">
			<button
				class="w-1/3 bg-blue-500 text-white text-center rounded-lg cursor-pointer p-2 mt-2"
                type="button"
				on:click={() => {
					deletePropertyDialog.close();
				}}
			>
				Close
			</button>
			<input
				class="w-1/3 bg-rose-500 text-white text-center rounded-lg cursor-pointer p-2 mt-2"
				type="submit"
				value="Delete"
			>
		</section>
    </form>
</dialog>
