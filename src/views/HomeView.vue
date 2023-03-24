<template>
  <h1>Postagens</h1>
  <p>{{ posts }}</p>
</template>

<script>

export default {
  name: 'HomeView',
  data(){
    return{
      posts: {}
    }
  },

  methods: {
    fetchPosts(){
      fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then((response) => response.json())
      .then((data) => {
        this.$store.dispatch('changePosts', data)
      });
    },
    importPosts(){
      this.posts = this.$store.state.posts
    }
  },
  created(){
    this.fetchPosts();
    this.importPosts();
  }
}
</script>
