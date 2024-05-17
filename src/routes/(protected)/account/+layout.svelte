<script>
    import { AccountSidebar } from '$lib/components';
</script>

<section
    class={
        "w-full max-w-[1200px] flex flex-col gap-x-12 gap-y-5 " +
        "mx-auto px-10 py-12 lg:[display:grid_!important] [grid-template-areas:'._header''sidebar_content'] " +
        "grid-rows-[1fr_auto] grid-cols-[1fr_3fr] lg:gap-y-10 xl:max-w-[1600px]"
    }
>
    <aside class="[grid-area:sidebar] flex justify-center mb-5 lg:mb-0">
        <AccountSidebar />
    </aside>
    <section class="contents">
        <slot />
    </section>
</section>
