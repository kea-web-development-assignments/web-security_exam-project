<script>
    export let href = '';
    export let hidden = false;
    export let roundedTop = false;
    export let roundedBottom = false;
</script>

<a
    class="w-full duration-200 p-2 hover:bg-gray-300"
    class:block={!hidden}
    class:hidden={hidden}
    class:rounded-t-xl={roundedTop}
    class:rounded-b-xl={roundedBottom}
    {href}
>
    <slot />
</a>
