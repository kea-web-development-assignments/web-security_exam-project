<script>
    import { PUBLIC_DO_SPACES_IMAGE_CDN } from '$env/static/public';
    import propertyPlaceholder from '$lib/images/property-placeholder.png';

    export let property = {};
    export let imageName = '1';
    export let shadow;
    export let allRounded;
    let fallback = propertyPlaceholder;

    function changeSrcToFallback(e) {
        e.target.src = fallback;
    }
</script>

<img
    class="aspect-[4/3] object-cover rounded-t-md"
    class:drop-shadow-around-md={shadow}
    class:rounded-md={allRounded}
    src={`${PUBLIC_DO_SPACES_IMAGE_CDN}/${property.userId}/${property.id}/${imageName}.png`}
    alt={property.name}
    on:error={changeSrcToFallback}
>
