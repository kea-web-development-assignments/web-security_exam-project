<script>
    import { page } from '$app/stores';
    export let href;
</script>

<a
    class="w-full block duration-200 p-2 rounded-xl hover:bg-gray-300"
    class:border-solid={$page.url.pathname === href}
    class:border-l-4={$page.url.pathname === href}
    class:border-rose-500={$page.url.pathname === href}
    class:rounded-l-none={$page.url.pathname === href}
    {href}
>
    <slot />
</a>
