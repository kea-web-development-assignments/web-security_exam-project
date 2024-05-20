<script>
    import { AccountSidebar } from '$lib/components';
</script>

<section
    class={
        "w-full max-w-[1200px] flex flex-col gap-x-12 gap-y-5 " +
        "mx-auto px-10 py-12 lg:[display:grid_!important] [grid-template-areas:'back-to-search_header''sidebar_content'] " +
        "grid-rows-[1fr_auto] grid-cols-[1fr_3fr] lg:gap-y-10 xl:max-w-[1600px]"
    }
>
    <aside class="contents">
        <section class="[grid-area:back-to-search] flex justify-center items-center mb-2 lg:mb-0">
            <a
                class="underline"
                href="/"
            >
                ← Back to search
            </a>
        </section>
        <section class="[grid-area:sidebar] flex justify-center mb-5 lg:mb-0">
            <AccountSidebar />
        </section>
    </aside>
    <section class="contents">
        <slot />
    </section>
</section>
