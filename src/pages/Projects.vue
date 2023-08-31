<template>
    <div>
        <h1 class="main-title">
            Latest Projects:
        </h1>

        <nav class="pagination">
            <li class="prev" @click="prevPage" v-if="prevPageUrl">
                Previous
            </li>
            <li class="next" @click="nextPage" v-if="nextPageUrl">
                Next
            </li>
        </nav>

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
    name: 'Projects',

    data() {
        return {
            projects : [],
            apiUrl : 'http://127.0.0.1:8000/api/projects',

            nextPageUrl : '',
            currentPageNo: '',
            prevPageUrl : '',
        }
    },

    methods: {
        getProjects(apiUrl = this.apiUrl){
            // recuper i miei project e popolo la variabile projects
            axios.get(apiUrl)
            .then((response) => {
                console.log(response)
                this.projects = response.data.results.data;
                this.nextPageUrl = response.data.results.next_page_url;
                this.prevPageUrl = response.data.results.prev_page_url;
            })
            .catch(function (error) {
                console.log(error);
            })
        },

        nextPage(){
            // alert('next page');
            this.getProjects(this.nextPageUrl);
        },

        prevPage(){
            // alert('prev page');
            this.getProjects(this.prevPageUrl);
        },

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
    div.posts{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }

    nav.pagination{
        width: 100%;
        padding: 1rem;
        display: flex;
        margin-bottom: 1rem;
        // justify-content: space-between;
        align-items: center;
        background-color: black;
        list-style-type: none;

        li{
            padding: 1rem;
            background-color: rgb(230, 230, 230);
            color: rgb(0, 0, 0);
            cursor: pointer;

            &.next{
                margin-left: auto;
            }
        }
        li:hover{
            background-color: rgb(122, 122, 236);
        }
    }

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