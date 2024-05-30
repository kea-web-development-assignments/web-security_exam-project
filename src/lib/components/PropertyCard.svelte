<script>
    import { PropertyImage } from '$lib/components';

    export let property = {};
    export let fullWidth;
</script>

<section
    class="w-[20rem] h-fit min-w-[0] bg-white rounded-md drop-shadow-around-md"
    class:w-full={fullWidth}
>
    <PropertyImage {property}/>
    <section class="p-3">
        <h3 class="text-lg font-bold text-ellipsis overflow-hidden text-nowrap mb-1">{property.name}</h3>
        <p class="text-ellipsis overflow-hidden line-clamp-2 mb-4">{property.place}</p>
        <slot name="more-info"></slot>
        <slot name="actions"></slot>
        <slot name="error-message"></slot>
    </section>
</section>
