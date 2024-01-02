import { defineStore } from 'pinia'
import axios from 'axios'

const BASE_URL = 'https://656969d7de53105b0dd6ff5d.mockapi.io'

export const useTodoStore = defineStore('todo', {
 state: () => ({
    list: [],
    selectedTodo: {},
    statuses: ['Pending', 'Donig', 'Done']
 }),
 actions: {
      async loadTodos () {
         try {
            const response = await axios.get(`${BASE_URL}/todos`)
            this.list = response.data      
         } catch (error) {
            console.log('error : ',error)
         }
     },
     async loadTodo (id) {
         try {
            const response = await axios.get(`${BASE_URL}/todos/${id}`)
            this.selectedTodo = response.data      
         } catch (error) {
            console.log('error',error)
         }
      } ,
      async addTodos (todoText) {
         const bodyData = {
            name: todoText,
            status: 'Pending'
         }
         try {
            const response = await axios.post(`${BASE_URL}/todos`, bodyData)
            this.list.push(response.data)
            console.log('add todo complete')   
         } catch (error) {
            console.log('error',error)
         }
      } ,
      async editTodos (todoData, id) {
         try {
            const bodyData = {
               name: todoData.name,
               status: todoData.status
             }
            const response = await axios.put(`${BASE_URL}/todos/${id}`, bodyData)
            console.log('edit todo complete')   
         } catch (error) {
            console.log('error',error)
         }
      } ,
      async removeTodos (id) {
         try {
            const response = await axios.delete(`${BASE_URL}/todos/${id}`)
           console.log('delete todo complete')   
         } catch (error) {
            console.log('error',error)
         }
      } 
   }
})
