<script setup>
import { useTodoStore } from '../stores/todo'
import { ref, onMounted } from 'vue'
import {RouterLink, useRoute} from 'vue-router'
import Loading from '../components/Loading.vue';

const todoStore = useTodoStore()
const todoId = ref(-1)
const isLoaded = ref(false)
const route = useRoute()
const isUpdated = ref(false)

onMounted( async ()  => {
    todoId.value = parseInt(route.params.id)
    await todoStore.loadTodo (todoId.value)
    console.log(todoStore.selectedTodo)
    isLoaded.value = true
})

const editIodo = async (selectedTodo) => {
    try {
        isLoaded.value = false
       
        const bodyData = {
        name: selectedTodo.name,
        status: selectedTodo.status
         }
        await todoStore.editTodos(bodyData,todoId.value)
        isUpdated.value = true  
        isLoaded.value = true
        setTimeout(() => {
            isUpdated.value = false 
        }, 3000)
       
    } catch (error) {
        console.log('error', error)
    }   
}
</script>

<template>
    <div class="toast toast-top toast-start">
        <div v-if="isUpdated" class="alert alert-success">
            <span>Update successful.</span>
        </div>
    </div>
    <div class="w-1/2 mx-auto">
        Edit View
        
        <RouterLink :to="{name: 'todo-list'}">
            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
                <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc. -->
                <path d="M177.5 414c-8.8 3.8-19 2-26-4.6l-144-136C2.7 268.9 0 262.6 0 256s2.7-12.9 7.5-17.4l144-136c7-6.6 17.2-8.4 26-4.6s14.5 12.5 14.5 22l0 72 288 0c17.7
                0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-288 0 0 72c0 9.6-5.7 18.2-14.5 22z"/>
            </svg>
        </RouterLink>
        <div v-if="isLoaded"> 
            <div  class="badge badge-primary"> id {{ todoId }} </div>
            <div>
                <label class="form-control w-full ">
                    <div class="label">
                        <span class="label-text">Name</span>
                    </div>
                    <input type="text" 
                    placeholder="Type name tod" 
                    class="input input-bordered w-full" 
                    v-model="todoStore.selectedTodo.name"/>
                </label>
            </div>
            <div class="form-control w-full">
                <div>Status</div>
                <select class="select select-bordered" v-model="todoStore.selectedTodo.status">
                    <option 
                    v-for="status in todoStore.statuses"
                    :value="status"
                    >
                        {{ status }}
                    </option>
                </select>
            </div>        
            <div class="flex">
                <button class="btn btn-primary w-full mt-4" @click="editIodo(todoStore.selectedTodo)">Edit</button>
            </div> 
        </div>
        <div v-else>
            <Loading></Loading>
        </div>
    </div>
</template>

<style scoped>
    svg{
        fill: white;
        
    }    
</style>