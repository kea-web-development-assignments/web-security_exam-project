<script>
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
</script>

<svelte:head>
    <title>{$page.data.property.name} | Airbnb</title>
</svelte:head>

<section class="w-full max-w-[1200px] mx-auto px-10 py-12">
    <section class="w-full flex gap-8">
        <section class="w-2/3">
            <h1 class="text-3xl text-ellipsis overflow-hidden text-nowrap">
                {$page.data.property.name}
            </h1>
            <h2 class="text-xl text-ellipsis overflow-hidden text-nowrap">
                {$page.data.property.place}
            </h2>
        </section>
        <section class="w-1/3 bg-white border border-gray-300 rounded-lg drop-shadow-around-md p-6">
            <h3 class="text-lg">
                <strong>{$page.data.property.pricePerNight} DKK</strong> night
            </h3>
            <button
                class="w-full bg-rose-500 color-white font-bold text-center rounded-lg mt-2 p-3"
                on:click={() => {
                    alert(`${$page.data.property.name} has been booked!`);
                    goto('/');
                }}
            >
                BOOK
            </button>
        </section>
    </section>
</section>
