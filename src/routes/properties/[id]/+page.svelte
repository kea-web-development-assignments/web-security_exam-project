<script>
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { PropertyImage } from '$lib/components';

    let currentImageIndex = 0;

    function previousImage() {
        if($page.data.imageCount === undefined) {
            return;
        }
        if((currentImageIndex - 1) < 0) {
            currentImageIndex = $page.data.imageCount - 1;
            return;
        }

        currentImageIndex -= 1;
    }
    function nextImage() {
        if($page.data.imageCount === undefined) {
            return;
        }
        if((currentImageIndex + 1) >= $page.data.imageCount) {
            currentImageIndex = 0;
            return;
        }

        currentImageIndex += 1;
    }
</script>

<svelte:head>
    <title>{$page.data.property.name} | Airbnb</title>
</svelte:head>

<section class="w-full max-w-[1200px] mx-auto px-6 py-12">
    <section class="w-full flex justify-start items-center mb-8">
        <a
            class="underline"
            href="/"
        >
            ← Back to search
        </a>
    </section>
    <ul class="w-full relative flex justify-center items-center mb-8">
        {#each { length: $page.data.imageCount || 1 } as _, i}
            <li
                class="w-[100%] relative flex items-center md:w-1/2"
                class:flex={currentImageIndex === i}
                class:hidden={currentImageIndex !== i}
            >
                <button
                    class="w-7 h-7 absolute flex items-center justify-center bg-white text-xl rounded-full drop-shadow-around-md left-2 p-2 z-10"
                    on:click={previousImage}
                >
                    &#10094;
                </button>
                <PropertyImage
                    property={$page.data.property}
                    imageName={i + 1}
                    shadow
                    allRounded
                />
                <button
                    class="w-7 h-7 absolute flex items-center justify-center bg-white text-xl rounded-full drop-shadow-around-md right-2 p-2 z-10"
                    on:click={nextImage}
                >
                    &#10095;
                </button>
            </li>
        {/each}
    </ul>
    <section class="w-full flex flex-col gap-8 md:flex-row">
        <section class="w-[100%] md:w-2/3">
            <h1 class="text-3xl line-clamp-2 md:text-ellipsis md:overflow-hidden md:text-nowrap">
                {$page.data.property.name}
            </h1>
            <h2 class="text-xl line-clamp-2 md:text-ellipsis md:overflow-hidden md:text-nowrap">
                {$page.data.property.place}
            </h2>
            <p class="whitespace-pre-line mt-2">
                {$page.data.property.description}
            </p>
        </section>
        <section class="w-[100%] max-w-[22rem] h-fit bg-white border border-gray-300 rounded-lg drop-shadow-around-md p-6 mx-auto md:w-1/3">
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
