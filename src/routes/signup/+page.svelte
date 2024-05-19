<script>
	import { enhance } from '$app/forms';
    import { page } from '$app/stores';
	import { InputField } from '$lib/components';
	import { userFieldsLookup } from '$lib/utils/validator.js';
</script>

<svelte:head>
	<title>Sign up | Airbnb</title>
</svelte:head>

<section class="h-[calc(100vh-5rem)] w-full flex justify-center items-center">
	<form
		class="w-[24rem] flex flex-col gap-3 bg-white drop-shadow-around-md rounded-md p-4"
		method="POST"
		use:enhance={({ formData }) => {
			return async ({ result, update }) => {
				if(result.status === 303) {
					alert(`An email with a verification link has been sent to ${formData.get('email')}, check your spam folder if you can't find it in your inbox.`);
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
			errorMessage={$page.form?.errors?.username}
			required
		/>
        <InputField
			name="firstName"
			label="First name"
			placeholder="John"
			title="Must be between 1-30 characters"
			pattern={userFieldsLookup.firstName.regex}
			errorMessage={$page.form?.errors?.firstName}
			required
		/>
        <InputField
			name="lastName"
			label="Last name"
			placeholder="Doe"
			title="Must be between 1-30 characters"
			pattern={userFieldsLookup.lastName.regex}
			errorMessage={$page.form?.errors?.lastName}
			required
		/>
        <InputField
			type="email"
			name="email"
			label="Email"
			placeholder="john@doe.com"
			title="Must be a valid email address"
			pattern={userFieldsLookup.email.regex}
			errorMessage={$page.form?.errors?.email}
			required
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
		/>
        <InputField
			type="tel"
			name="phoneNum"
			label="Phone number"
			placeholder="11223344"
			title="Must be 8 numeric characters"
			pattern={userFieldsLookup.phoneNum.regex}
			errorMessage={$page.form?.errors?.phoneNum}
			required
		/>
		{#if $page.status !== 200 && $page.form?.error?.message}
			<p class="text-rose-500 text-center">{$page.form?.error?.message}</p>
		{/if}
		<input
			class="bg-rose-500 text-white rounded-full cursor-pointer p-2 mt-2"
			type="submit"
			value="Sign up"
		>
		<p class="text-center text-sm">
			Already have an account? <a class="text-blue-800 hover:underline" href="/login">Log in</a>
		</p>
    </form>
</section>
