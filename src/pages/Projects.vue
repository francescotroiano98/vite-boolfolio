<template>
    <div>
        <h1 class="main-title">
            Latest Projects:
        </h1>
        <div v-if="isLoading" class="loading-overlay">
            <div class="loading-spinner"></div>
        </div>

        <div v-else class="projects">
            <!-- ... Elenco dei progetti ... -->
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

            isLoading: true,
        }
    },

    methods: {
        getProjects(apiUrl = this.apiUrl){
            // recuper i miei project e popolo la variabile projects

            this.isLoading = true;

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
            .finally(() => {
                this.isLoading = false; // Fine del caricamento
            });
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


    .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.loading-spinner {
    border: 4px solid rgba(230, 0, 0, 0.3);
    border-top: 4px solid #ffffff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

</style>