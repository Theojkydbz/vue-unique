<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1{
  text-align: left;
  font-family: Raleway-Bold;
  font-size: 50px;
  color: #2F3542;
  letter-spacing: -0.04px;
  margin-bottom: 5rem;
  margin-left: 60px
}
@media screen and (min-width: 200px) and (max-width: 640px) {
    h1 {
      font-size: 30px;
      margin-bottom: 50px;
      margin-left: 20px;
    }
}
</style>
