<template>
  <div id="profile" class="p-6 lg:p-8 lg:pt-20 h-full">
    <h1 class="profile-title text-4xl lg:pl-16 font-black mb-10 text-purple-900 lg:mt-10">Welcome {{ userProfile.username.charAt(0).toUpperCase() + userProfile.username.slice(1) }}!</h1>
    <h2 class="ml-20">Here you can manage your collections, create new ones and add games to it!</h2>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: "Profile",
    computed: {
      ...mapState(['userProfile'])
    }
}
</script>

<style>
#profile {
  animation: fadeIn 500ms linear forwards;
}

.profile-title {
  font-family: "Audiowide", cursive;
  font-size: 4rem;
}
</style>