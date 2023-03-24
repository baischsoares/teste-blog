<template>
  <h1>Postagens</h1>
  <button @click.prevent="loadMorePosts" >Carregar mais</button>
   <div v-for="(post, index) in posts" :key="index">
      <p>{{ post }}</p>
  </div> 
</template>

<script>

export default {
  name: 'HomeView',
  data(){
    return{
      posts: [],
      postsLimit: 5
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
    }
  },
  created(){
    this.fetchPosts();
  }
}
</script>
