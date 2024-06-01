<script>
    import { enhance } from '$app/forms';
    import { page } from '$app/stores';
    import { InputField, TextAreaField, SearchLocationInput } from '$lib/components';
    import { propertyFieldsLookup } from '$lib/utils/validator.js';

    export let data = {};
    export let formAction = '';
    export let formEnctype = 'application/x-www-form-urlencoded';
    export let submitButtonText = 'Submit';
    export let showDialog = false;
    export let imagesRequired = false;
    export let errorFormId = '';
    export let formUseEnhanceCallback = () => {};

    let dialogElement;

    $: showDialog ? dialogElement?.showModal() : dialogElement?.close();
</script>

<dialog
    class="w-full rounded-md backdrop:bg-black backdrop:bg-opacity-70 sm:max-w-[66%] lg:max-w-[28rem]"
    bind:this={dialogElement}
>
    <form
        class="w-full flex flex-col gap-3 bg-white rounded-md p-4"
        method="POST"
        action={formAction}
        enctype={formEnctype}
        use:enhance={formUseEnhanceCallback}
    >
        <input
            type="hidden"
            name="id"
            required
            bind:value={data.id}
        >
        <InputField
            name="name"
            label="Name"
            placeholder="Avenue apartment"
            title="Must be between 3-50 characters"
            pattern={propertyFieldsLookup.name.regex}
            errorMessage={$page.form?.[errorFormId]?.errors?.name}
            required
            bind:value={data.name}
        />
        <SearchLocationInput
            name="place"
            label="Location"
            title="Must be between 3-100 characters"
            pattern={propertyFieldsLookup.place.regex}
            errorMessage={$page.form?.[errorFormId]?.errors?.place}
            required
            noButton
            border
            dense
            on:location={(e) => {
                const { coordinates } = e.detail;

                data.lon = coordinates.lon;
                data.lat = coordinates.lat;
            }}
            bind:query={data.place}
        />
        <InputField
            name="lon"
            label="Longitude"
            placeholder="55.66666"
            title="Must be a valid number/decimal number"
            pattern={propertyFieldsLookup.lon.regex}
            errorMessage={$page.form?.[errorFormId]?.errors?.lon}
            required
            bind:value={data.lon}
        />
        <InputField
            name="lat"
            label="Latitude"
            placeholder="44.33333"
            title="Must be a valid number/decimal number"
            pattern={propertyFieldsLookup.lat.regex}
            errorMessage={$page.form?.[errorFormId]?.errors?.lat}
            required
            bind:value={data.lat}
        />
        <InputField
            name="pricePerNight"
            label="Price per night"
            placeholder="1432.99"
            title="Must be a valid number/decimal number"
            pattern={propertyFieldsLookup.pricePerNight.regex}
            errorMessage={$page.form?.[errorFormId]?.errors?.pricePerNight}
            required
            bind:value={data.pricePerNight}
        />
        <InputField
            type="file"
            name="images"
            label="Images"
            placeholder="living-room.png"
            accept=".avif, .jpg, .jpeg, .png, .webp"
            title="Must include at least one image"
            errorMessage={$page.form?.[errorFormId]?.errors?.images}
            required={imagesRequired}
            multiple
            bind:value={data.images}
        />
        <TextAreaField
            name="description"
            label="Description"
            placeholder="Ocean view apartment..."
            errorMessage={$page.form?.[errorFormId]?.errors?.description}
            bind:value={data.description}
        />
        {#if $page.status !== 200 && $page.form?.[errorFormId]?.error?.message}
            <p class="text-rose-500 text-center">{$page.form?.[errorFormId]?.error?.message}</p>
        {/if}
        <section class="flex justify-between text-lg">
            <button
                class="w-1/3 bg-blue-500 text-white text-center rounded-lg cursor-pointer p-2 mt-2"
                type="button"
                on:click={() => {
                    data = {};
                    showDialog = false;
                }}
            >
                Close
            </button>
            <input
                class="w-1/3 bg-rose-500 text-white text-center rounded-lg cursor-pointer p-2 mt-2"
                type="submit"
                value={submitButtonText}
            >
        </section>
    </form>
</dialog>
