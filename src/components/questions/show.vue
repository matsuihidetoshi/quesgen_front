<template>
    <div class="show">
        <p>{{ results.id }}</p>
        <p>{{ results.title }}</p>
        <p>{{ results.content }}</p>
        <p>{{ results.option1 }}</p>
        <p>{{ results.option2 }}</p>
        <p>{{ results.option3 }}</p>
        <p>{{ results.option4 }}</p>
        <p>{{ results.option5 }}</p>
    </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Show',
  props: {
  },
  data(){
    return{
      results: null
    }
  },
  mounted(){
    axios({
        url: 'https://quesgen.work/graphql/',
        method: 'POST',
        data: {
            query:
                `query {
                    question(id:${this.$route.params.id + 1}) {
                        id
                        title
                        content
                        option1
                        option2
                        option3
                        option4
                        option5
                    }
                }`
        },
    }).then(response => (this.results = response.data.data.question))
  }
}
</script>
<style scoped>

</style>