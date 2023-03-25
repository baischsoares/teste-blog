<template>
  <section id="container">
    <router-view/>
  </section>
</template>

<script>
export default {
  name: 'App',
}
</script>


<style>
*{
  font-family: monospace ;
}
h2, p, button{
  margin: 0px;
}
#container{
  max-width: 800px;
  margin: 0 auto;
}
</style>
