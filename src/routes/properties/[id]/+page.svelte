<script>
    import { enhance } from '$app/forms';
    import { invalidateAll } from '$app/navigation';
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { PropertyImage, TextAreaField } from '$lib/components';
    import profileIcon from '$lib/images/profile-icon.svg'

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
    <section class="w-full flex flex-col-reverse gap-8 md:flex-row">
        <section class="w-[100%] md:w-2/3">
            <section>
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
            <section>
                <section class="py-8 lg:py-16">
                    <div class="max-w-2xl mx-auto px-4">
                        <div class="flex justify-between items-center mb-6">
                            <h2 class="text-lg lg:text-2xl font-bold">Comments ({$page.data.comments?.length ?? 0})</h2>
                        </div>
                        {#if $page.data.user}
                            <form
                                class="w-full flex gap-2 flex-col items-end mb-6"
                                method="POST"
                                action="?/addComment"
                                use:enhance={() => {
                                    return async ({ result, update }) => {
                                        if(result.status === 200) {
                                            await invalidateAll();
                                        }

                                        update();
                                    }
                                }}
                            >
                                <TextAreaField
                                    containerClass="w-full"
                                    name="description"
                                    placeholder="Write a comment..."
                                    errorMessage={$page.form?.errors?.description}
                                    noRequiredMarker
                                    required
                                />
                                {#if $page.status !== 200 && $page.form?.error?.message}
                                    <p class="w-full text-rose-500 text-center">{$page.form?.error?.message}</p>
                                {/if}
                                <button
                                    type="submit"
                                    class="w-fit text-sm font-bold text-center text-white bg-rose-500 rounded-lg py-2.5 px-4"
                                >
                                    Post comment
                                </button>
                            </form>
                        {/if}
                        <section>
                            {#each $page.data.comments ?? [] as comment}
                                <article class="p-6">
                                    <section class="flex justify-between items-center mb-2">
                                        <div class="flex items-center">
                                            <p
                                                class="inline-flex items-center text-sm font-bold mr-2"
                                            >
                                                <img class="w-8 h-8 mr-2" src={profileIcon} alt="Profile icon">
                                                {comment.users.firstName} {comment.users.lastName}
                                                <span class="text-gray-500 ml-2">{comment.createdAt.toLocaleDateString()}</span>
                                            </p>
                                        </div>
                                    </section>
                                    <p>{comment.description}</p>
                                </article>
                            {/each}
                        </section>
                    </div>
                  </section>
            </section>
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
