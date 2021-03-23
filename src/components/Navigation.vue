<template>
  <nav id="nav" class="bg-purple-400 h-16 w-full flex flex-column justify-center fixed z-50 bg-opacity-20">
    <div class="nav-links-group w-full flex justify-between items-center px-20 mx-5">
        <div>
          <router-link to="/" class="nav-link text-white text-xl focus:outline-none mx-3" exact>Home</router-link>
          <router-link to="/games" class="nav-link text-white text-xl focus:outline-none mx-3" exact>Games</router-link>
          <router-link to="/platforms" class="nav-link text-white text-xl focus:outline-none mx-3" exact>Platforms</router-link>
        </div>
          <img src="../assets/icons/gameotek2.png" alt="application logo" class="w-18 mt-8">
        <div>
          <router-link to="/login" class="nav-link text-white text-xl focus:outline-none mx-3" exact>Login</router-link>
          <router-link to="/register" class="nav-link text-white text-xl focus:outline-none mx-3" exact>Register</router-link>
          <router-link to="/profile" class="nav-link text-white text-xl focus:outline-none mx-3" exact>Profile</router-link>
        </div>
    </div>
  </nav>
</template>

<script>
export default {
    name: 'Navigation'
}
</script>

<style>
.nav-link {
    font-family: 'Audiowide', cursive;
}

.router-link-active {
  border-bottom: #4c1d95 4px solid
}
</style>