<script>
    import { PropertyImage } from '$lib/components';

    export let property = {};
</script>

<section class="w-[22rem] min-w-[14rem] bg-white rounded-md drop-shadow-around-md">
    <PropertyImage {property}/>
    <section class="p-3">
        <h3 class="text-lg font-bold text-ellipsis overflow-hidden text-nowrap mb-1">{property.name}</h3>
        <p class="text-ellipsis overflow-hidden line-clamp-2 mb-4">{property.place}</p>
        <slot name="more-info"></slot>
        <slot name="actions"></slot>
        <slot name="error-message"></slot>
    </section>
</section>
