<script>
    import { enhance } from '$app/forms';
    import { invalidateAll } from '$app/navigation';
    import { page } from '$app/stores';
    import { InputField } from '$lib/components';
    import { userFieldsLookup } from '$lib/utils/validator.js';
    import { onMount } from 'svelte';

    let data = {};
    let oldPassword = '';
    let password = '';

    onMount(() => {
        data = $page.data.profileInfo ?? {};
    })
</script>

<svelte:head>
    <title>Account | Airbnb</title>
</svelte:head>

<h1 class="[grid-area:header] text-4xl font-bold">Account</h1>
<section class="[grid-area:content] w-full lg:ml-4">
    <h2 class="text-3xl font-bold pb-4">Update profile</h2>
    <form
        class="w-full flex flex-col gap-3 bg-white drop-shadow-around-md rounded-md p-4 mx-auto sm:max-w-[66%] lg:max-w-[28rem]"
        method="POST"
        action="?/updateProfile"
        use:enhance={() => {
            return async ({ result, update }) => {
                if(result.status === 200) {
                    oldPassword = '';
                    password = '';

                    await invalidateAll();

                    alert(`Your profile has been updated.`);
                    return;
                }

                update();
            }
        }}
    >
        <InputField
            name="username"
            label="Username"
            placeholder="johnnyDoe"
            title="Must be between 3-20 alphanumerical characters"
            pattern={userFieldsLookup.username.regex}
            errorMessage={$page.form?.updateProfileForm?.errors?.username}
            value={data.username}
            required
            noRequiredMarker
        />
        <InputField
            name="firstName"
            label="First name"
            placeholder="John"
            title="Must be between 1-30 characters"
            pattern={userFieldsLookup.firstName.regex}
            errorMessage={$page.form?.updateProfileForm?.errors?.firstName}
            value={data.firstName}
            required
            noRequiredMarker
        />
        <InputField
            name="lastName"
            label="Last name"
            placeholder="Doe"
            title="Must be between 1-30 characters"
            pattern={userFieldsLookup.lastName.regex}
            errorMessage={$page.form?.updateProfileForm?.errors?.lastName}
            value={data.lastName}
            required
            noRequiredMarker
        />
        <InputField
            type="email"
            name="email"
            label="Email"
            placeholder="john@doe.com"
            title="Must be a valid email address"
            pattern={userFieldsLookup.email.regex}
            errorMessage={$page.form?.updateProfileForm?.errors?.email}
            value={data.email}
            required
            noRequiredMarker
        />
        <InputField
            type="tel"
            name="phoneNum"
            label="Phone number"
            placeholder="11223344"
            title="Must be 8 numeric characters"
            pattern={userFieldsLookup.phoneNum.regex}
            errorMessage={$page.form?.updateProfileForm?.errors?.phoneNum}
            value={data.phoneNum}
            required
            noRequiredMarker
        />
        <InputField
            type="password"
            name="oldPassword"
            label="Old Password"
            placeholder="Password123!"
            title="Must be between 1-50 characters"
            errorMessage={$page.form?.updateProfileForm?.errors?.oldPassword}
            bind:value={oldPassword}
            noRequiredMarker
        />
        <InputField
            type="password"
            name="password"
            label="New password"
            placeholder="Password123!"
            title="Must be between 1-50 characters"
            errorMessage={$page.form?.updateProfileForm?.errors?.password}
            bind:value={password}
            noRequiredMarker
        />
        {#if $page.status !== 200 && $page.form?.updateProfileForm?.error?.message}
            <p class="text-rose-500 text-center">{$page.form?.updateProfileForm?.error?.message}</p>
        {/if}
        <input
            class="bg-rose-500 text-white rounded-full cursor-pointer p-2 mt-2"
            type="submit"
            value="Update"
        >
    </form>
    <h2 class="text-3xl font-bold pt-8 pb-4">Delete account</h2>
    <form
        class="w-full flex flex-col gap-3 bg-white drop-shadow-around-md rounded-md p-4 mx-auto sm:max-w-[66%] lg:max-w-[28rem]"
        method="POST"
        action="?/deleteAccount"
        use:enhance={() => {
            return async ({ result, update }) => {
                if(result.status === 303) {
                    alert('Your account has been deleted successfully, you will now be logged out.');
                }

                update();
            }
        }}
    >
        <InputField
            type="password"
            name="password"
            label="Enter your password to delete your account"
            placeholder="Password123!"
            title="Must be between 1-50 characters"
            pattern={userFieldsLookup.password.regex}
            errorMessage={$page.form?.deleteAccountForm?.errors?.password}
            required
            noRequiredMarker
        />
        {#if $page.status !== 200 && $page.form?.deleteAccount?.error?.message}
            <p class="text-rose-500 text-center">{$page.form?.deleteAccount?.error?.message}</p>
        {/if}
        <input
            class="bg-rose-500 text-white rounded-full cursor-pointer p-2 mt-2"
            type="submit"
            value="Delete"
        >
    </form>
</section>
