<template>

  <h1>Posts</h1>
  <div v-for="(post, index) in posts" :key="index">
      <PostItem :post="post">
        <button @click="getComments(post.id)" class="btn-see-comments">Ver Comentários</button>
      </PostItem>
  </div> 
  <a @click.prevent="loadMorePosts" class="btn-load-more">Carregar mais</a>

    <div class="modal-comments" v-if="comments.length > 0">
      <div class="modal-container">
        <a @click.prevent="comments = []" class="close-modal">X</a>
        <h2>Comments</h2>
        <div class="comments-section">
          <ModalComments v-for="(comment, index) in comments" :key="index" :comment="comment"/>
        </div>
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
      comments: [],
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
  text-align: center;
    display: block;
}
.modal-comments{
  width: 100%;
  height: 100%;
  position:fixed;
  top: 0;
  left: 0;
  background: rgba(0,0,0,.2);
  display: grid;
  justify-content: center;
  align-items: center;
}
.modal-container{
  background: #fff;
  max-width: 500px;
  padding: 20px;
  position: relative;
}
.comments-section{
  height: 300px;
  overflow: scroll;
}
.comments-section::-webkit-scrollbar {width: 0! important}
.comments-section::-webkit-scrollbar {width: 0! important}

h2{
  margin-bottom: 20px;
}

.close-modal{
  position: absolute;
  right: -10px;
  top: -10px;
  display: inline-block;
  background: red;
  padding: 5px 8px;
  color: #fff;
  border-radius: 50%;
  cursor: pointer;
}

@media (max-width: 720px){
  .modal-container{
    margin: 0px 10px;
  }
}
</style>