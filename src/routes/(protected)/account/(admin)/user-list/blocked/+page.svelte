<script>
    import { enhance } from '$app/forms';
    import { invalidateAll } from '$app/navigation';
    import { page } from '$app/stores';
</script>

<svelte:head>
    <title>Blocked users | Airbnb</title>
</svelte:head>

<h1 class="[grid-area:header] text-4xl font-bold">Blocked users</h1>
<section class="[grid-area:content] h-fit w-full flex flex-col gap-2 bg-white rounded-md drop-shadow-around-md p-4">
    {#if $page.data.users.length}
        {#each $page.data.users as user}
            <form
                class="w-full flex justify-between items-center text-lg p-3 rounded-md even:bg-gray-300"
                method="POST"
                action="?/unblockUser"
                use:enhance={() => {
                    return async ({ result, update }) => {
                        if(result.status === 200) {
                            await invalidateAll();
                            alert('User has been unblocked.');
                            return;
                        }

                        update();
                    }
                }}
            >
                <section class="flex-1 flex flex-col text-ellipsis overflow-hidden">
                    <span class="font-bold">{user.username}</span>
                    <span class="text-nowrap">{user.firstName} {user.lastName}</span>
                </section>
                <span class="flex-1 text-center text-ellipsis overflow-hidden">{user.email}</span>
                <span class="flex-1 text-center text-ellipsis overflow-hidden">{user.phoneNum}</span>
                <section class="flex-1 text-end">
                    <input class="hidden" type="text" name="userId" value={user.id}>
                    <input
                        class="flex-1 bg-rose-500 text-white rounded-full cursor-pointer p-2 px-4"
                        type="submit"
                        value="Unblock"
                    >
                </section>
            </form>
        {/each}
    {:else}
        <p class="text-lg text-center p-4">
            No users to list here
        </p>
    {/if}
</section>
