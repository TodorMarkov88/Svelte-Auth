<script>
    import Navbar from '../lib/Navbar.svelte';
</script>

 


<style>
    .main-content{
        display: flex;
        flex-direction: column;
        align-items: center;
    } 
    </style>
<div class="main-content">
    <Navbar  />
    <slot></slot>
</div>
