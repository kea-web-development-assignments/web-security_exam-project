<script>
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

	onMount(async () => {
		const { verificationCode } = $page.params;

        if(!verificationCode) {
            alert('Missing verification code in url!');
            return;
        }

        let response;
        try {
            response = await fetch(`/api/verify-account/${verificationCode}`, {
                method: 'POST',
            });
        } catch (error) {
            console.error('Failed to verify account:', error);
            alert('Something went wrong when verifying your account, try again later');            
            return;
        }

        if(response.status != 200) {
            const data = await response.json();

            if(data?.error?.message) {
                alert(`Failed to verify your account: ${data?.error?.message}`);
            }
            return;
        }

        alert('Your account has been verified!');
        goto('/login');
	});
</script>

<svelte:head>
	<title>Verify account | Airbnb</title>
</svelte:head>
