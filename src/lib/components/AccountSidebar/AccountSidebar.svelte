<script>
    import { page } from '$app/stores';
    import AccountSidebarLink from "./AccountSidebarLink.svelte";
</script>

<section class="w-full h-fit flex flex-col gap-2 bg-white text-lg font-bold rounded-md drop-shadow-around-md p-4 lg:max-w-72">
    <AccountSidebarLink href="/account">Account</AccountSidebarLink>
    <AccountSidebarLink href="/account/my-properties">My properties</AccountSidebarLink>
    {#if $page.data?.user?.role === 'admin'}
        <AccountSidebarLink href="/account/user-list">User list</AccountSidebarLink>
        <AccountSidebarLink href="/account/user-list/blocked">Blocked user list</AccountSidebarLink>
        <AccountSidebarLink href="/account/properties-list">Properties list</AccountSidebarLink>
        <AccountSidebarLink href="/account/properties-list/blocked">Blocked properties list</AccountSidebarLink>
    {/if}
</section>
