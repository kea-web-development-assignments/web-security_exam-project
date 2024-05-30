<script>
    import { PUBLIC_DO_SPACES_IMAGE_CDN } from '$env/static/public';
    import propertyPlaceholder from '$lib/images/property-placeholder.png';

    export let property = {};
    let fallback = propertyPlaceholder;

    function changeSrcToFallback(e) {
        e.target.src = fallback;
    }
</script>

<img
    class="w-full h-[12rem] object-cover rounded-t-md"
    src={`${PUBLIC_DO_SPACES_IMAGE_CDN}/${property.userId}/${property.id}/1.png`}
    alt={property.name}
    on:error={changeSrcToFallback}
>
