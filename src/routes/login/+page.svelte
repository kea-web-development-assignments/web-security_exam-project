<script>
	import { enhance } from '$app/forms';
    import { page } from '$app/stores';
	import { InputField } from '$lib/components';
	import { userFieldsLookup } from '$lib/utils/validator.js';
</script>

<svelte:head>
	<title>Login | Airbnb</title>
</svelte:head>

<section class="flex-1 w-full flex justify-center items-center px-4">
	<form
		class="w-[24rem] flex flex-col gap-3 bg-white drop-shadow-around-md rounded-md p-4"
		method="POST"
		use:enhance
	>
        <InputField
			type="email"
			name="email"
			label="Email"
			placeholder="john@doe.com"
			title="Must be a valid email address"
			pattern={userFieldsLookup.email.regex}
			errorMessage={$page.form?.errors?.email}
			required
			noRequiredMarker
		/>
        <InputField
			type="password"
			name="password"
			label="Password"
			placeholder="Password123!"
			title="Must be between 1-50 characters"
			pattern={userFieldsLookup.password.regex}
			errorMessage={$page.form?.errors?.password}
			required
			noRequiredMarker
		/>
		<p class="text-end text-sm -mt-2">
			<a
				class="text-blue-800 hover:underline"
				href="/forgot-password"
			>
				Forgot password?
			</a>
		</p>
		{#if $page.status !== 200 && $page.form?.error?.message}
			<p class="text-rose-500 text-center">{$page.form?.error?.message}</p>
		{/if}
		<input
			class="bg-rose-500 text-white rounded-full cursor-pointer p-2 mt-2"
			type="submit"
			value="Log in"
		>
		<p class="text-center text-sm">
			Don't have an account? <a class="text-blue-800 hover:underline" href="/signup">Sign up</a>
		</p>
    </form>
</section>
