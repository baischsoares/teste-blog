<template>

  <h1>Postagens</h1>
  <button @click.prevent="loadMorePosts" >Carregar mais</button>
  <div v-for="(post, index) in posts" :key="index">
      <PostItem :post="post">
        <button @click="getComments(post.id)">Ver Comentários</button>
      </PostItem>
  </div> 

    <div class="modal-comments" v-if="comments">
      <div class="modal-container">
        <button v-if="comments" @click="comments = []">X</button>
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
