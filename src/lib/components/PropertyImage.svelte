<script>
	import propertyPlaceholder from '$lib/images/property-placeholder.png';

    export let src = "";
    export let alt = "";
    export let fallback = propertyPlaceholder;

    function changeSrcToFallback(e) {
        e.target.src = fallback;
    }
</script>

<img
    class="w-full h-[12rem] object-cover rounded-t-md"
    {src}
    {alt}
    on:error={changeSrcToFallback}
>
