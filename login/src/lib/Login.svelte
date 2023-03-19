<script>
  import { onMount } from 'svelte';
  import { post } from '../utils/api';
  import user from '../user';

  let username = '';
  let password = '';
  let currentError = null;

  const handleLogin = async (event) => {
    event.preventDefault();
    currentError = null;

    try {
      const { data } = await post('/login', { username, password });
      user.update(val => ({ ...val, ...data }));
    } catch (error) {
      currentError = error.message;
      console.error('Error logging in:', error);
    }
  };

  onMount(() => {
    console.log('Login component mounted');
  });
</script>

<form on:submit={handleLogin}>
  <div>
    <label for="username">Username</label>
    <input type="text" id="username" bind:value={username} />
  </div>
  <div>
    <label for="password">Password</label>
    <input type="password" id="password" bind:value={password} />
  </div>
  <button type="submit">Submit</button>
</form>

{#if currentError}
  <p>{currentError}</p>
{/if}
