<template>
    <transition name="fade">
        <div v-show="displayScrollElmt">
            <img src="../assets/icons/arrow-up.png" alt="arrow up icon" class="block fixed bottom-5 right-5 h-16 scroll-top" @click="scrollToTop">
        </div>
    </transition>
</template>

<script>
export default {
    name: 'ScrollToTop',
    data() {
        return {
            displayScrollElmt: false
        }
    },

    mounted() {
        window.addEventListener('scroll', this.handleScroll);
    },

    methods: {
        handleScroll() {
            if(window.scrollY > 800) {
                this.displayScrollElmt = true
            } else if(window.scrollY < 800) {
                this.displayScrollElmt = false
            }
        },

        scrollToTop() {
           window.scrollTo({
               top: 0,
               behavior: "smooth"
           })
        },
    }
}
</script>

<style>
    .scroll-top:hover {
        cursor: pointer;
    }
</style>