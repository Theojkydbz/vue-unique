<template>
  <div id="app">
    <HelloWorld msg="Unique wallpaper
generator "/>
    <Phone class="align right" />
    <div class="align left">
      <Btn />
      <Btn2 />
    </div>
    <p class="signature">Made with <img class="logo" src="./assets/logo.png" width="20px" height="20px" /> by Théo Geiller</p>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Btn from '@/components/Btn'
import Btn2 from '@/components/Btn2'
import Phone from '@/components/Phone'

export default {
  name: 'app',
  components: {
    HelloWorld,
    Btn,
    Btn2,
    Phone
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.logo{
  margin-bottom: -5px;
}
.signature{
  margin-bottom: 20px;
  transform: translate(0px, 90px);

  color: rgb(153, 153, 153);
  text-align: center;
}
@media screen and (min-width: 200px) and (max-width: 640px) {
    .signature {
        transform: translate(0px, 70px);
        margin-top: 40px;
    }
}

.align {
  display: inline-block;
}
.right {
  margin-right: 10vw
}
.left {
  border: 10vw
}

@media screen and (min-width: 200px) and (max-width: 640px) {
    .align {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
}
</style>
