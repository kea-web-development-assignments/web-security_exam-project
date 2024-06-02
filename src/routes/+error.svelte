<script>
	import { page } from '$app/stores';
</script>

<section class="w-full h-[calc(100vh-5rem)] flex flex-col gap-4 justify-center items-center">
    <h1 class="text-3xl font-bold">
        {#if $page.status === 500}
            Server error
        {:else if $page.status === 404}
            Page not found
        {:else}
            Error
        {/if}
    </h1>
    <p class="text-xl">
        {#if $page.error.error?.message}
            {$page.error.error.message}
        {:else}
            Something went wrong, try again later.
        {/if}
    </p>
    {#if $page.url.pathname !== '/'}
        <a
            class="bg-rose-500 text-white text-center font-bold rounded-lg px-4 py-2 mt-2"
            href="/"
        >
            Go back
        </a>
    {/if}
</section>
