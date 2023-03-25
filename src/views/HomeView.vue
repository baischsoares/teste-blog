<template>
  <h1>Postagens</h1>
  <button @click.prevent="loadMorePosts" >Carregar mais</button>
   <div v-for="(post, index) in posts" :key="index">
      <PostItem :post="post">
        <button >Ver Comentários</button>
      </PostItem>
  </div> 
</template>

<script>
import PostItem from '@/components/PostItem.vue'

export default {
  name: 'HomeView',
  components:{
    PostItem
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

  },
  created(){
    this.fetchPosts();
  }
}
</script>
