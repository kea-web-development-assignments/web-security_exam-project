<script>
    export let href = '';
</script>

<a
    class="w-full block duration-200 p-2 first:rounded-t-xl last:rounded-b-xl hover:bg-gray-300"
    {href}
>
    <slot />
</a>
