<template>
    <div class="new">
        <ul v-if="!disable">
            <li><input v-model="title" placeholder="title"></li>
            <li><input v-model="content" placeholder="content"></li>
        </ul>
        <p class="error">{{ message }}</p>
        <button v-on:click="create()">Create</button>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'New',
    data(){
        return{
            title: null,
            content: null,
            message: null,
            disable: false,
        }
    },
    methods: {
        create: function(){
           if ((this.title != null) && (this.content != null) && (this.title != '') && (this.content != '')){
               axios({
                   url: 'https://quesgen.work/graphql/',
                   method: 'POST',
                   data: {
                       query:
                       `mutation {
                            createQuestion(title:"${this.title}" content:"${this.content}") {
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
               this.message = 'Fill all forms.'
           }
        }
    }
}
</script>
<style scoped>
.error {
    color: red;
}
</style>