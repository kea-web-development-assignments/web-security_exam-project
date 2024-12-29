<script>
    export let name = '';
    export let label = '';
    export let placeholder = '';
    export let required = false;
    export let noRequiredMarker = false;
    export let value = '';
    export let errorMessage = '';
    export let containerClass = '';

    let id = crypto.randomUUID();
</script>

<div class={containerClass}>
    <label
        class="pl-1"
        for={id}
    >
        {label}
        {#if required && !noRequiredMarker}
            <span class="text-rose-500">*</span>
        {/if}
    </label>
    <textarea
        class="w-full h-56 max-h-56 bg-gray-200 border border-gray-400 p-2"
        {id}
        {name}
        {placeholder}
        {required}
        bind:value={value}
    />
    {#if errorMessage}
        <p class="text-rose-500">{errorMessage}</p>
    {/if}
</div>
