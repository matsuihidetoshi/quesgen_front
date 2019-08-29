<template>
    <div class="show">
        <div class="title">{{ results.title }}</div>
        <p>{{ results.content }}</p>
        <svg width="200" height="200">
            <circle id="circle5" cx="100" cy="100" r="60" v-bind:stroke-dasharray="circle5"/>
            <circle id="circle4" cx="100" cy="100" r="60" v-bind:stroke-dasharray="circle4"/>
            <circle id="circle3" cx="100" cy="100" r="60" v-bind:stroke-dasharray="circle3"/>
            <circle id="circle2" cx="100" cy="100" r="60" v-bind:stroke-dasharray="circle2"/>
            <circle id="circle1" cx="100" cy="100" r="60" v-bind:stroke-dasharray="circle1"/>
        </svg>
        <div class="options op1">{{ results.option1 }}:{{ results.ratio1 }}%<button v-on:click="vote(1)">vote</button></div>
        <div class="options op2">{{ results.option2 }}:{{ results.ratio2 }}%<button v-on:click="vote(2)">vote</button></div>
        <div class="options op3">{{ results.option3 }}:{{ results.ratio3 }}%<button v-on:click="vote(3)">vote</button></div>
        <div class="options op4">{{ results.option4 }}:{{ results.ratio4 }}%<button v-on:click="vote(4)">vote</button></div>
        <div class="options op5">{{ results.option5 }}:{{ results.ratio5 }}%<button v-on:click="vote(5)">vote</button></div>
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
      circle1: null,
      circle2: null,
      circle3: null,
      circle4: null,
      circle5: null,
    }
  },
  mounted(){
    this.getQuestion()
    this.updateTimer = setInterval(function () {
      this.getQuestion()
      this.calcRatio()
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
    },
    calcRatio: function(){
      let ratio = []
      ratio[0] = this.results.ratio1 * 3.77
      ratio[1] = ratio[0] + this.results.ratio2 *3.77
      ratio[2] = ratio[1] + this.results.ratio3 *3.77
      ratio[3] = ratio[2] + this.results.ratio4 *3.77
      ratio[4] = ratio[3] + this.results.ratio5 *3.77
      this.circle1 = ratio[0].toString() + ",377"
      this.circle2 = ratio[1].toString() + ",377"
      this.circle3 = ratio[2].toString() + ",377"
      this.circle4 = ratio[3].toString() + ",377"
      this.circle5 = ratio[4].toString() + ",377"
    }
  }
}
</script>
<style scoped>
  .title {
    color: #2c3e50;
    font-weight: bold;
    font-size: 30px;
  }
  .options {
    margin-top: 15px;
  }
  svg {
      transform: rotate(-90deg);
  }
  circle {
      fill: transparent;
      stroke-width: 20;
  }
  #circle1 {
    stroke: #6bbdf0;
  }
  .op1 {
    color: #6bbdf0;
    font-weight: bold;
  }
  #circle2 {
    stroke: #4f81df;
  }
  .op2 {
    color: #4f81df;
    font-weight: bold;
  }
  #circle3 {
    stroke: #694fdf;
  }
  .op3 {
    color: #694fdf;
    font-weight: bold;
  }
  #circle4 {
    stroke: #ce4fdf;
  }
  .op4 {
    color: #ce4fdf;
    font-weight: bold;
  }
  #circle5 {
    stroke: #df4f62;
  }
  .op5 {
    color: #df4f62;
    font-weight: bold;
  }
</style>