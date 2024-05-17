<script>
	import { enhance } from '$app/forms';
    import { page } from '$app/stores';
	import { InputField } from '$lib/components';
	import { userFieldsLookup } from '$lib/utils/validator.js';
</script>

<svelte:head>
	<title>Reset password | Airbnb</title>
</svelte:head>

<section class="flex-1 w-full flex justify-center items-center">
	<form
		class="w-[24rem] flex flex-col gap-3 bg-white drop-shadow-around-md rounded-md p-4"
		method="POST"
		use:enhance={() => {
			return async ({ result, update }) => {
				if(result.status === 303) {
					alert('Your password has been reset!');
				}

				update();
			}
		}}
	>
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
		{#if $page.status !== 200 && $page.form?.error?.message}
			<p class="text-rose-500 text-center">{$page.form?.error?.message}</p>
		{/if}
		<input
			class="bg-rose-500 text-white rounded-full cursor-pointer p-2 mt-2"
			type="submit"
			value="Update password"
		>
    </form>
</section>
