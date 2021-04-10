<template>
  <div id="settings" class="p-6 lg:p-8 lg:pt-20 h-full">
    <h1 class="settings-title text-4xl lg:pl-16 font-black text-purple-900 lg:mt-10"> Account settings</h1>
    <form @submit.prevent="saveChanges" class="w-11/12 m-auto py-8 my-12 rounded-lg bg-white p-12 flex items-center">
      <div>
        <h2 class="settings-subtitle text-4xl text-purple-900 register-title mb-10">{{ user.username }}'s account informations</h2>
        <div class="user-avatar py-3 w-8/12">
          <input type="file" name="file" id="file" class="inputfile" @change="previewAvatar">
          <label for="file" class="text-purple-500 border-4 border-purple-500 rounded-full px-4 py-2 font-semibold text-lg cursor-pointer hover:text-white hover:bg-purple-500 transition delay-150 duration-300 ease-in-out">Select a New Profile Picture</label>
        </div>
        <div class="user-name py-3 w-8/12">
          <label for="username" name="username" class="text-purple-900 font-semibold text-lg">Username</label>
          <input type="text" :placeholder="user.username" class="text-gray-400 border-4 focus:outline-none focus:border-purple-400 rounded-full w-full h-12 px-4">
        </div>
        <div class="user-email py-3 w-8/12">
          <label for="user-email" name="user-email" class="text-purple-900 font-semibold text-lg">Your Email</label>
          <input type="email" :placeholder="userEmail" class="text-gray-400 border-4 focus:outline-none focus:border-purple-400 rounded-full w-full h-12 px-4">
        </div>
        <button class="bg-red-600 text-white font-semibold p-3 rounded-lg" @click="deleteAccount">Delete Account</button>
        <button class="bg-purple-900 text-white font-semibold p-3 rounded-lg">Save Changes</button>
      </div>
      <div v-if="filePreview!=null" class="w-4/12 ml-16 relative h-64">
        <button @click="onUpload" class="absolute text-sm text-purple-500 bg-white border-purple-500 border-2 px-4 py-1 rounded-full bottom-0 hover:bg-purple-500 hover:text-white transition delay-150 duration-300 ease-in-out focus:outline-none">Upload</button>
        <img class="preview block rounded-full h-64 w-64 overflow-hidden" :src="avatar">
      </div>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import * as fb from '../../firestore-conf'
import { auth, storage } from '../../firestore-conf'

export default {
  name: "Settings",
  data() {
    return {
      userCredentials: {
        email:"",
      },
      filePreview: null,
      avatar: null,
    }
  },
  computed: {
      ...mapState(
        {
          user: state => state.userProfile
        }
      ),
      userEmail: function () {
        this.userCredentials.email = auth.currentUser.email;
        return this.userCredentials.email;
      }
  },

  methods: {
    deleteAccount() {
        auth.currentUser.delete().then(function() {
          console.log("User has been deleted!!!");
        });
    },

    previewAvatar(event) {
      // this.avatar = null;
      this.filePreview = event.target.files[0];
    },

    onUpload(){
      // this.avatar = null;
      const storageRef = storage.ref(`${this.filePreview.name}`).put(this.filePreview);
      storageRef.on(`state_changed`,snapshot=>{
        this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
      }, error=>{console.log(error.message)},
      ()=>{this.uploadValue=100;
        storageRef.snapshot.ref.getDownloadURL().then((url)=>{
          this.avatar = url;
        });
      }
      );
    }
  }
}
</script>

<style>
#settings {
  animation: fadeIn 500ms linear forwards;
  font-family: 'Prompt', sans-serif;
}

.settings-title {
  font-family: "Audiowide", cursive;
  font-size: 4rem;
}

.settings-subtitle {
  font-family: "Audiowide", cursive;
}

input[type="file"] {
    display: none;
}

</style>