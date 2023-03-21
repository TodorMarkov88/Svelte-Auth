<script>
  import { onMount } from 'svelte';
  import user from '../user';
  
  export let data;
  $: isLoggedIn =  $user === null ? false : true;
 onMount(async()=>{
 
  if(data.returnedData.success ) user.update(val=>val=data.returnedData.data)
 })
</script>

{#if isLoggedIn}
  <div class="content_wrapper">
    <h1>Welcome to Consulting Ninja</h1>
    <h2>
      Thank you {data.returnedData.data.firstname}
      {data.returnedData.data.lastname} for logging in!
    </h2>
  </div>
 
{/if}

<style>
  h1,
  h2 {
    color: #FFF;
  }
  .content_wrapper {
    margin-top: 4em;
    text-align: center;
  }
</style>
