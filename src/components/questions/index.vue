<template>
    <div class="index">
        <h1>Questions</h1>
        <div>
          <ul>
              <li v-for="(result, id) in results" v-bind:key="id">
                  <router-link v-on:click="identify(id)" :to="{ name: 'question', params: { id: id }}" >{{ result.title }}</router-link >
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
  mounted() {
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
</script>

<style scoped>
</style>