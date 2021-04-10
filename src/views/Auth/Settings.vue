<template>
  <h1>Settings view</h1>
  <button class="bg-red-600 text-white rounded-md p-4" @click="deleteAccount">Delete Account</button>
</template>

<script>
import { mapState } from 'vuex'
import * as fb from '../../firestore-conf'
import { auth } from '../../firestore-conf'

export default {
  name: "Settings",
  methods: {
    deleteAccount() {
        auth.currentUser.delete().then(function() {
          console.log("User has been deleted!!!");
        });
      }
  }
}
</script>

<style>

</style>