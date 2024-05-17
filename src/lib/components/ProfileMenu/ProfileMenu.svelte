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

<section class="h-full shrink-0 relative z-10">
    <button
        class="h-full flex items-center border-solid md:border md:border-gray-300 md:rounded-full md:p-2 hover:shadow-lg md:duration-200"
        on:click|stopPropagation={() => showDropdownMenu = !showDropdownMenu}
        aria-label="Profile menu"
    >
        <img class="h-2/3 md:px-2" src={hamburgerIcon} alt="Hamburger menu">
        <img class="h-full hidden md:block" src={profileIcon} alt="Profile icon">
    </button>
    <section
        class="w-40 right-0 absolute bg-white rounded-xl drop-shadow-around-md mt-2"
        class:hidden={!showDropdownMenu}
    >
        <ProfileMenuLink href="/account" hidden={!$page.data.user}>Account</ProfileMenuLink>
        <form
            id="logoutForm"
            class:hidden={!$page.data.user}
            method="POST"
            action="/logout?redirectTo={$page.url.pathname + $page.url.search}"
        >
            <input
                class="w-full text-left rounded-b-xl duration-200 cursor-pointer p-2 hover:bg-gray-300"
                type="submit"
                form="logoutForm"
                value="Logout"
            />
        </form>
        <ProfileMenuLink href="/login" hidden={$page.data.user}>Log in</ProfileMenuLink>
        <ProfileMenuLink href="/signup" hidden={$page.data.user}>Sign up</ProfileMenuLink>
        <ProfileMenuLink href="/account/my-properties" hidden={$page.data.user}>Airbnb your home</ProfileMenuLink>
    </section>
</section>
