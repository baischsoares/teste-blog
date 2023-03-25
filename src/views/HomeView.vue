<template>

  <h1>Postagens</h1>
  <div v-for="(post, index) in posts" :key="index">
      <PostItem :post="post">
        <button @click="getComments(post.id)" class="btn-see-comments">Ver Comentários</button>
      </PostItem>
  </div> 
  <button @click.prevent="loadMorePosts" class="btn-load-more">Carregar mais</button>

    <div class="modal-comments" v-if="comments.length > 0">
      <div class="modal-container">
        <a @click.prevent="comments = []">X</a>
        <ModalComments v-for="(comment, index) in comments" :key="index" :comment="comment"/>
      </div>
    </div>

</template>

<script>
import PostItem from '@/components/PostItem.vue'
import ModalComments from '@/components/ModalComments.vue'



export default {
  name: 'HomeView',
  components:{
    PostItem,
    ModalComments
  },
  data(){
    return{
      posts: [],
      postsLimit: 5,
      comments: []
    }
  },
  methods: {
    fetchPosts(){
      fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then((response) => response.json())
      .then((data) => {
        this.$store.dispatch('changePosts', data)
        this.limitedPosts()
      });
    },
    limitedPosts(){
      for (let i = 0; i < this.postsLimit; i++){
        this.posts.push(this.$store.state.posts[i])
      }
    },
     loadMorePosts(){
       this.postsLimit += 3
       this.posts = []
       this.limitedPosts()
    },
    getComments(id){
      this.fetchComments(id)
    },
    fetchComments(id){
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then(r => r.json())
      .then(r => {
        this.comments = r
      })
    }
  },
  created(){
    this.fetchPosts();
  }
}
</script>
<style scoped>
h1{
  font-size: 2rem;
}
.btn-see-comments{
  padding: 5px 15px;
  border: none;
  background: #84b295;
  cursor: pointer;
  color: #ffffff;
  justify-self: end;
}
.btn-load-more{
  width: 100%;
  padding: 10px 0px;
  border: none;
  background: #fff;
  cursor: pointer;
  color: #bb8138;
}
</style>