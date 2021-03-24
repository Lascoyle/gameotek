<template>
  <section id="login" class="p-6 lg:p-20 h-screen w-full flex justfy-center items-end">
        <h1 class="login-main-title text-white  w-5/12 p-12 rounded-xl rounded-r-none">"Add some new games to your collections or create new ones!"</h1>
        <form @submit.prevent="login" class="p-20 bg-white h-full w-7/12 flex flex-col justify-between items-center">
            <div class="form-input-group h-full flex flex-col justify-end w-11/12 rounded-xl rounded-l-none">
                <h2 class="text-4xl text-purple-900 login-title mb-16">Login</h2>
                <hr>
                <div class="email py-3">
                    <label for="email" name="email" class="text-purple-900 font-semibold text-lg">Email</label>
                    <input type="email" v-model="loginForm.email" placeholder="Please enter your email..." class="text-gray-400 border-4 focus:outline-none focus:border-purple-400 rounded-full w-full h-12 px-4">
                </div>
                <div class="password py-3">
                    <label for="password" name="password" class="text-purple-900 font-semibold text-lg">Password</label>
                    <input type="password" v-model="loginForm.password" placeholder="Please enter your password..." class="text-gray-400 border-4 focus:outline-none focus:border-purple-400 rounded-full w-full h-12 px-4">
                </div>
                <span class="text-gray-600">Need an account? Click here to <router-link to= "/register" class="underline hover:text-green-400 text-purple-900">register</router-link>!</span>
                <button type="submit" class="text-lg self-end justify-end mt-6 text-white font-semibold bg-gray-900 rounded-full p-2 px-4 ">Login</button>
            </div>
        </form>
    </section>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        email: "",
        password: "",
      },
    }
  },
  methods: {
    login() {
      this.$store.dispatch('login', {
        email: this.loginForm.email,
        password: this.loginForm.password
      })
    }
  }
}
</script>

<style>
#login {
    font-family: "Prompt", sans-serif;
    animation: fadeIn 200ms linear forwards;
}

.login-main-title {
    font-family: "Audiowide", cursive;
    font-size: 3.3rem;
    background-color: #3a114b;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1684%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='url(%23SvgjsLinearGradient1685)'%3e%3c/rect%3e%3cpath d='M557.5126248899647 371.03806498271734L476.8761169810982 482.02469659841205 587.8627485967929 562.6612045072786 668.4992565056594 451.67457289158386z' fill='rgba(73%2c 43%2c 79%2c 0.21)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M1102.9347094811558 505.9950316085336L1138.2469689606344 382.8465478551415 1015.0984852072423 347.5342883756628 979.7862257277636 470.6827721290549z' fill='rgba(73%2c 43%2c 79%2c 0.21)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M321.3130629356325 393.05599937580484L291.6206837116097 282.2425315141493 180.80721584995416 311.9349107381721 210.49959507397696 422.7483785998277z' fill='rgba(73%2c 43%2c 79%2c 0.21)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M694.4110102012237 189.5229060121539L845.5388524577054 192.16085231120215 697.048956500272 38.39506375567217z' fill='rgba(73%2c 43%2c 79%2c 0.21)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M1325.883437850397 39.56718248040268L1398.6379544249019 92.42643287625131 1378.7426882462457-33.187334094102155z' fill='rgba(73%2c 43%2c 79%2c 0.21)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M625.709696519449 324.1184729427924L655.1864527267104 185.44123816035466 516.5092179442727 155.96448195309333 487.0324617370113 294.6417167355311z' fill='rgba(73%2c 43%2c 79%2c 0.21)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M934.0127547685526 433.85328765976243L1053.4015024538642 433.85328765976243 1053.4015024538642 314.46453997445076 934.0127547685526 314.4645399744508z' fill='rgba(73%2c 43%2c 79%2c 0.21)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M609.9417050878279 481.12462060471296L678.5080143347344 410.1221288748027 607.5055226048241 341.55581962789626 538.9392133579177 412.55831135780653z' fill='rgba(73%2c 43%2c 79%2c 0.21)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M88.76648890035878 334.9492604785469L219.10271370650756 292.6004539063892 46.41768232820111 204.6130356723981z' fill='rgba(73%2c 43%2c 79%2c 0.21)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M2.6396438168068777 109.66824169664355L90.4214085455806 158.32646843830017 51.2978705584635 21.886476967869825z' fill='rgba(73%2c 43%2c 79%2c 0.21)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M181.4224699789184 451.2074950227944L258.54239888009494 507.23840312624884 304.0287965846884 363.5430557227568z' fill='rgba(73%2c 43%2c 79%2c 0.21)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M942.0903693851233 506.0447288123603L869.3961270424271 442.7308565282182 851.8755350651236 525.1587610805275z' fill='rgba(73%2c 43%2c 79%2c 0.21)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M829.764478693005 442.88154174503535L849.3054730578086 350.94839128723146 757.3723226000047 331.40739692242784 737.8313282352011 423.3405473802318z' fill='rgba(73%2c 43%2c 79%2c 0.21)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M130.33862335099545 470.96271185155257L127.75475746210172 611.3261821031967 236.11055987137905 553.7123799869364z' fill='rgba(73%2c 43%2c 79%2c 0.21)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M568.8675978856031 379.3176900130255L485.2555563245879 468.9806271643416 574.9184934759039 552.5926687253568 658.5305350369192 462.9297315740408z' fill='rgba(73%2c 43%2c 79%2c 0.21)' class='triangle-float1'%3e%3c/path%3e%3cpath d='M529.6619441992909 93.5661772505088L481.81048913676875 250.08123434003556 638.3255462262955 297.93268940255774 686.1770012888177 141.41763231303096z' fill='rgba(73%2c 43%2c 79%2c 0.21)' class='triangle-float2'%3e%3c/path%3e%3cpath d='M185.1088379378135 256.92150682277895L32.4714466372167 229.8574017954536 76.5892777816837 357.9848869046798z' fill='rgba(73%2c 43%2c 79%2c 0.21)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M1178.8273824124715 173.99540938314934L1093.9478519985046 132.59689629809048 1074.2898475778998 280.6154484615703z' fill='rgba(73%2c 43%2c 79%2c 0.21)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M367.7168410678816 51.72159030580849L217.8192201179706 138.0746526306993 347.4417766374248 215.9597421809135z' fill='rgba(73%2c 43%2c 79%2c 0.21)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M281.9293237462408 113.98378936776129L380.8815455000274 153.9630820609472 391.374373662913-14.454896916325666z' fill='rgba(73%2c 43%2c 79%2c 0.21)' class='triangle-float3'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1684'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3clinearGradient x1='84.72%25' y1='139.29%25' x2='15.28%25' y2='-39.29%25' gradientUnits='userSpaceOnUse' id='SvgjsLinearGradient1685'%3e%3cstop stop-color='rgba(14%2c 42%2c 71%2c 1)' offset='0'%3e%3c/stop%3e%3cstop stop-color='rgba(36%2c 6%2c 39%2c 1)' offset='0.55'%3e%3c/stop%3e%3c/linearGradient%3e%3cstyle%3e %40keyframes float1 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(-10px%2c 0)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float1 %7b animation: float1 5s infinite%3b %7d %40keyframes float2 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(-5px%2c -5px)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float2 %7b animation: float2 4s infinite%3b %7d %40keyframes float3 %7b 0%25%7btransform: translate(0%2c 0)%7d 50%25%7btransform: translate(0%2c -10px)%7d 100%25%7btransform: translate(0%2c 0)%7d %7d .triangle-float3 %7b animation: float3 6s infinite%3b %7d %3c/style%3e%3c/defs%3e%3c/svg%3e");
    background-blend-mode: soft-light;
}

.login-title {
    font-family: "Audiowide", cursive;
    font-size: 2.8rem;
}
</style>