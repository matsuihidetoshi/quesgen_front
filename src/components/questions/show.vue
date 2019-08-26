<template>
    <div class="show">
        <p>{{ time }}</p>
        <p>{{ results.id }}</p>
        <p>{{ results.title }}</p>
        <p>{{ results.content }}</p>
        <div>{{ results.option1 }}:{{ results.ratio1 }}%<button v-on:click="vote(1)">vote</button></div>
        <div>{{ results.option2 }}:{{ results.ratio2 }}%<button v-on:click="vote(2)">vote</button></div>
        <div>{{ results.option3 }}:{{ results.ratio3 }}%<button v-on:click="vote(3)">vote</button></div>
        <div>{{ results.option4 }}:{{ results.ratio4 }}%<button v-on:click="vote(4)">vote</button></div>
        <div>{{ results.option5 }}:{{ results.ratio5 }}%<button v-on:click="vote(5)">vote</button></div>
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
      results: null,
      updateTimer: null,
    }
  },
  mounted(){
    this.getQuestion()
    this.updateTimer = setInterval(function () {
      this.getQuestion()
    }.bind(this), 100)
  },
  beforeDestroy(){
    clearInterval(this.updateTimer)
  },
  methods: {
    vote: function(option){
      axios({
          url: 'https://quesgen.work/graphql/',
          method: 'POST',
          data: {
              query:
              `mutation {
                  postQuestion(id:${this.results.id} option:${option}) {
                      question {
                          id
                          title
                          content
                          option1
                          option2
                          option3
                          option4
                          option5
                          ratio1
                          ratio2
                          ratio3
                          ratio4
                          ratio5
                      }
                  }
              }`
          },
      }).then(response => (this.results = response.data.data.question))
    },
    getQuestion: function(){
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
                        ratio1
                        ratio2
                        ratio3
                        ratio4
                        ratio5
                    }
                }`
          },
      }).then(response => (this.results = response.data.data.question))
    }
  }
}
</script>
<style scoped>

</style>