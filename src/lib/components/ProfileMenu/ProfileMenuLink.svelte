<script>
    export let href = '';
    export let hidden = false;
</script>

<a
    class="w-full duration-200 p-2 first:rounded-t-xl last:rounded-b-xl hover:bg-gray-300"
    class:block={!hidden}
    class:hidden={hidden}
    {href}
>
    <slot />
</a>
