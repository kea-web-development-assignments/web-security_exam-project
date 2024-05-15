<script>
    export let type = 'text';
    export let name = '';
    export let label = '';
    export let placeholder = '';
    export let title = '';
    export let pattern = '.*';
    export let required = false;
    export let noRequiredMarker = false;
    export let value = '';
    export let errorMessage = '';

    let id = crypto.randomUUID();
</script>

<div>
    <label
        class="pl-1"
        for={id}
    >
        {label}
        {#if required && !noRequiredMarker}
            <span class="text-rose-500">*</span>
        {/if}
    </label>
    <input
        class="w-full bg-gray-200 border border-gray-400 p-2"
        {id}
        {...{type}}
        {name}
        {placeholder}
        {title}
        {pattern}
        {required}
        bind:value={value}
    />
    {#if errorMessage}
        <p class="text-rose-500">{errorMessage}</p>
    {/if}
</div>
