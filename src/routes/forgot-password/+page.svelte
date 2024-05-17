<script>
	import { enhance } from '$app/forms';
    import { page } from '$app/stores';
	import { InputField } from '$lib/components';
	import { userFieldsLookup } from '$lib/utils/validator.js';
</script>

<svelte:head>
	<title>Forgot password | Airbnb</title>
</svelte:head>

<section class="flex-1 w-full flex justify-center items-center">
	<form
		class="w-[24rem] flex flex-col gap-3 bg-white drop-shadow-around-md rounded-md p-4"
		method="POST"
		use:enhance={({ formData }) => {
			return async ({ result, update }) => {
				if(result.status === 303) {
					alert(`An email with a link to reset your password has been sent to ${formData.get('email')}, check your spam folder if you can't find it in your inbox.`);
				}

				update();
			}
		}}
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
		{#if $page.status !== 200 && $page.form?.error?.message}
			<p class="text-rose-500 text-center">{$page.form?.error?.message}</p>
		{/if}
		<input
			class="bg-rose-500 text-white rounded-full cursor-pointer p-2 mt-2"
			type="submit"
			value="Reset password"
		>
    </form>
</section>
