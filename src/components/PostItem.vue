<template>
  <div class="post-item">
    <h2>{{post.title}}</h2>
    <p>{{ post.body }}</p>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'PostItem',
  props: ['post'],
  data(){
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.post-item{
  padding: 20px 0px;
  margin-bottom: 10px;
  border-bottom: 1px solid #eccf8d;
  display: grid;
}
.post-item h2{
  text-transform: capitalize;
  margin-bottom: 20px;
}
.post-item p{
  text-transform: capitalize;
  margin-bottom: 20px;
}

</style>
