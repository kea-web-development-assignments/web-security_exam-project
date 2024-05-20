<script>
    import { enhance } from '$app/forms';
    import { invalidateAll } from '$app/navigation';
    import { page } from '$app/stores';
</script>

<svelte:head>
    <title>All users | Airbnb</title>
</svelte:head>

<h1 class="[grid-area:header] text-4xl font-bold">All users</h1>
<section class="[grid-area:content] h-fit w-full flex flex-col gap-2 bg-white rounded-md drop-shadow-around-md p-4">
    {#if $page.data.users.length}
        {#each $page.data.users as user}
            <form
                class="w-full rounded-md p-3 even:bg-gray-300 lg:text-lg"
                method="POST"
                action="?/blockUser"
                use:enhance={() => {
                    return async ({ result, update }) => {
                        if(result.status === 200) {
                            await invalidateAll();
                            alert('User has been blocked.');
                            return;
                        }

                        update();
                    }
                }}
            >
                <input type="hidden" name="userId" value={user.id}>
                <section
                    class="w-full flex flex-col gap-1 justify-between items-start rounded-md md:flex-row md:gap-0 md:items-center"
                >
                    <section class="flex-1 flex flex-col text-ellipsis overflow-hidden">
                        <span class="font-bold">{user.username}</span>
                        <span class="text-nowrap">{user.firstName} {user.lastName}</span>
                    </section>
                    <span class="flex-1 text-center text-ellipsis overflow-hidden">{user.email}</span>
                    <span class="flex-1 text-center text-ellipsis overflow-hidden">{user.phoneNum}</span>
                    <section class="flex-1 w-full flex md:w-fit md:[display:block_!important] md:text-end">
                        <input
                            class="flex-1 bg-rose-500 text-white rounded-full cursor-pointer p-2 px-4"
                            type="submit"
                            value="Block"
                        >
                    </section>
                </section>
                {#if $page.status !== 200 && $page.form?.[user.id]?.error?.message}
                    <p class="text-rose-500 text-center">{$page.form?.[user.id]?.error?.message}</p>
                {/if}
            </form>
        {/each}
    {:else}
        <p class="text-lg text-center p-4">
            No users to list here
        </p>
    {/if}
</section>
