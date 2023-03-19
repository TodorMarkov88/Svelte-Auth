   
<script>
    import {onMount} from 'svelte';
    import user from '../user';

export let data;


    let isLoggedIn = null;
//  $: isLoggedIn = $user === null? false : true;
    onMount(async () => {
        const result = await fetch('http://localhost:3030/api/user', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'content-type': 'application/json'
            }
        });

        const data = await result.json();

        user.update(val => val = data.data);
        isLoggedIn = data.success;
    });
</script>

{#if isLoggedIn === true}
    <div class="content_wrapper">
        <h1>Welcome to Consulting Ninja</h1>
        <h2>Thank you {$user.firstname} {$user.lastname} for logging in!</h2>
    </div>
{:else if isLoggedIn === false}
    <div class="content_wrapper">
        <h1>Welcome to Consulting Ninja</h1>
        <h2>You need to be logged in here.</h2>
        <h2>Head to Sign in page or Register if you don't have an account.</h2>
    </div>
{/if}

<style>
    h1, h2{
        color: #FFF;
    }
    .content_wrapper{
        margin-top: 4em;
        text-align: center;
    }
</style>
