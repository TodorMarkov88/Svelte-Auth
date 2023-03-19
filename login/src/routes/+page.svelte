<script>
  export let data;
  
  $: isLoggedIn = data.returnedData && data.returnedData.success;
</script>

{#if isLoggedIn}
  <div class="content_wrapper">
    <h1>Welcome to Consulting Ninja</h1>
    <h2>Thank you {data.returnedData.data.firstname} {data.returnedData.data.lastname} for logging in!</h2>
  </div>
{:else}
  <div class="content_wrapper">
    <h1>Welcome to Consulting Ninja</h1>
    <h2>You need to be logged in here.</h2>
    <h2>Head to Sign in page or Register if you don't have an account.</h2>
  </div>
{/if}

<style>
  h1, h2 {
    color: #FFF;
  }
  .content_wrapper {
    margin-top: 4em;
    text-align: center;
  }
</style>
