<template>
  <div class="comment-block">
  <p>{{comment.body}}</p>
  <span>Email: {{comment.email }}</span>
  <span>Name: {{ comment.name }}</span>
  </div>
</template>

<script>
export default {
  name: 'ModalComments',
  props: ['comment'],
  data(){
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.comment-block{
  padding: 10px 0px;
  border-bottom: 1px solid #eccf8d;;
}
p{
  margin-bottom: 5px;
}
span{
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}
</style>
