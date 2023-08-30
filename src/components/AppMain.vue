<template>
    <div>
        <h1 class="main-title">
            Latest Projects:
        </h1>
        <div class="projects">
            <div class="single-project" v-for="project in projects">
                <h2>
                    {{ project.title }}
                </h2>
                <h4 :style="'color:' + project.type.color + ';'">
                    Category: {{ project.type.name }}
                </h4>
                <h5>
                    {{ project.slug }}
                </h5>
                <h6>
                    <span v-for="technology in project.technologies" :style="'color:' + technology.color + ';'">#{{ technology.name }} </span>
                </h6>
                <p>
                    {{ project.content.substr(0, 250) }}
                </p>
            </div>
        </div>
    </div>
</template>
<script>

import axios from 'axios';

export default{
    name: 'AppMain',

    data() {
        return {
            projects : [],
            apiUrl : 'http://127.0.0.1:8000/api/projects'
        }
    },

    methods: {
        getProjects(){

            axios.get(this.apiUrl, {
                params: {}
            })
            .then((response) => {
                console.log(response.data.results.data);
                this.projects = response.data.results.data;
            })
            .catch(function (error) {
                console.log(error);
            })
        }
    },
    created(){
        this.getProjects();
    }
}


</script>
<style lang="scss">

h1.main-title{
        margin-bottom: 3rem;
    }

    div.projects{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;

        div.single-project{
            width: calc((100% / 2) - 1rem);
            border-radius: 1rem;
            padding: 1rem;
            margin-right: 1rem;
            background-color: rgb(221, 221, 221);
            color: black;
            margin-bottom: 2rem;

            *{
                margin-bottom: 1rem;
            }

            h6 span{
                margin-right: 1rem;
            }

            &:hover{
                background-color: white;
            }
        }
    }

</style>