<template>
    <div class="index">
        <h1>Search questions</h1>
        <button v-on:click="search()">一覧表示</button>
        <div>
        <ul>
            <li v-for="(result, id) in results" v-bind:key="id">
            {{ result.title }}
            </li>
        </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Index',
  props: {
  },
  data(){
    return{
      results: null
    }
  },
  methods: {
    search: function(){
      axios({
        url: 'https://quesgen.work/graphql/',
        method: 'POST',
        data: {
          query:
          `query {
            allQuestions {
              id
              title
              content
            }
          }`
        }
      }).then(response => (this.results = response.data.data.allQuestions))
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
}
</style>