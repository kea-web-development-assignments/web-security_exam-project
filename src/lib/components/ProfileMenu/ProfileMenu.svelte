<script>
	import profileIcon from '$lib/images/profile-icon.svg'
	import hamburgerIcon from '$lib/images/hamburger-icon.svg'
    import { page } from '$app/stores';
    import ProfileMenuLink from './ProfileMenuLink.svelte';

    let showDropdownMenu = false;

    function closeDropdown() {
        if(showDropdownMenu) {
            showDropdownMenu = false;
        }
    }
</script>

<svelte:window on:click={closeDropdown}></svelte:window>

<section class="h-full relative z-10">
    <button
        class="h-full flex items-center border border-gray-300 rounded-full p-2 hover:shadow-lg duration-200"
        on:click|stopPropagation={() => showDropdownMenu = !showDropdownMenu}
        aria-label="Profile menu"
    >
        <img class="h-2/3 px-2" src={hamburgerIcon} alt="Hamburger menu">
        <img class="h-full" src={profileIcon} alt="Profile icon">
    </button>
    {#if showDropdownMenu}
        <section class="w-40 right-0 absolute bg-white rounded-xl drop-shadow-around-md mt-2">
            {#if $page.user}
                <ProfileMenuLink href="/account">Account</ProfileMenuLink>
                <ProfileMenuLink href="/logout">Logout</ProfileMenuLink>
            {:else}
                <ProfileMenuLink href="/login">Log in</ProfileMenuLink>
                <ProfileMenuLink href="/signup">Sign up</ProfileMenuLink>
                <ProfileMenuLink href="/account#your-properties">Airbnb your home</ProfileMenuLink>
            {/if}
        </section>
    {/if}
</section>
