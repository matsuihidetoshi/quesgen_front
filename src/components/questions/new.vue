<template>
    <div class="new">
        <ul v-if="!disable">
            <li><input v-model="title" placeholder="title"></li>
            <li><input v-model="content" placeholder="content"></li>
            <li><input v-model="option_1" placeholder="option 1"></li>
            <li><input v-model="option_2" placeholder="option 2"></li>
            <li><input v-model="option_3" placeholder="option 3"></li>
            <li><input v-model="option_4" placeholder="option 4"></li>
            <li><input v-model="option_5" placeholder="option 5"></li>
        </ul>
        <p class="error">{{ message }}</p>
        <button v-if="!disable" v-on:click="create()">Create</button>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'New',
    data(){
        return{
            title: '',
            content: '',
            option_1: '',
            option_2: '',
            option_3: '',
            option_4: '',
            option_5: '',
            message: null,
            disable: false,
        }
    },
    methods: {
        create: function(){
           if ((this.title != '') && (this.content != '') && (this.option_1 != '') && (this.option_2 != '') && (this.option_3 != '') && (this.option_4 != '') && (this.option_5 != '')){
               axios({
                   url: 'https://quesgen.work/graphql/',
                   method: 'POST',
                   data: {
                       query:
                       `mutation {
                            createQuestion(title:"${this.title}" content:"${this.content}" option1:"${this.option_1}" option2:"${this.option_2}" option3:"${this.option_3}" option4:"${this.option_4}" option5:"${this.option_5}") {
                                question {
                                    id
                                    title
                                    content
                                }
                            }
                        }`
                   },
               })
               this.message = 'Created question.'
               this.disable = true
           } else {
               this.message = 'Hey, fill these all forms, got it?'
           }
        }
    }
}
</script>
<style scoped>
.error {
    color: red;
}
input {
    font-size: 18px;
    margin: 5px;
}
</style>