<template lang="">
    
    
    <div class='main'>
        <form class="p-input-icon-right mt-4" @submit.prevent="searchTodo" >
            <i class="pi pi-search search__icon" @click="searchTodo" />
            <InputText  placeholder="Search Todo's" class='search' v-model="searchQuery" 
            />
            
        </form>
        <div class='feed'>
            <div v-if="viewingOpen === false">             
                <TodoCard v-for="todo in openTodos" :item="todo" @markTodoCompleted="markTodoCompleted" @updateTodo="updateTodo" @update="getTodos"/>   
            </div>
            <div v-if="viewingOpen === true">                    
                <TodoCard v-for="todo in closedTodos" :item="todo" @updateTodo="updateTodo" @update="getTodos" />              
            </div>
            
        </div>
    </div>
    <CreateModal v-if="showModal" @refresh='getTodos' @toggleModal="toggleModal" />
    <img src='@/assets/fab1.png' class='fab' @click='toggleModal'/>
</template>

<script setup lang="ts">
const user = useStrapiUser();
console.log(user.value)

useHead({
  title: "ToDo"
});
import {useOpenedStore} from '@/store/opened'
import {storeToRefs} from 'pinia'

const openedStore = useOpenedStore()
const {viewingOpen} = storeToRefs(openedStore)

const openTodos: Ref = ref([])
const  closedTodos: Ref = ref([])
const originalTodos: Ref = ref([])
const showModal = ref(false)
const searchQuery: Ref = ref('')
const todos: Ref = ref({})


onMounted(()=> {
    getTodos()
})

const toggleModal = () => {
    showModal.value = !showModal.value
}
const organizeTodos = async () => {
    originalTodos.value = [...todos.value.data]
    let openArray: object[] = []
    let closedArray: object[] = []
    for (let i=0; i<originalTodos.value.length; i++){
        if (originalTodos.value[i].attributes.completed === true){
            closedArray.push(originalTodos.value[i])
        } else {
            openArray.push(originalTodos.value[i])
        }
    }
    openTodos.value = [...openArray]
    closedTodos.value = [...closedArray]
}
const getTodos = async () => {
    todos.value = JSON.parse(JSON.stringify(await $fetch('http://localhost:1337/api/taskss')))
    organizeTodos()
}
const markTodoCompleted = async (id: number) => {
   
      const response = await $fetch(`http://localhost:1337/api/taskss/${id}`, {
        method: 'PUT',
        body: {
            data: {
                    "completed": "true",                   
                }
        }
        })
      getTodos()

}
const updateTodo = async (editedTodo: Ref) => {
    console.log(editedTodo)
    const response = await $fetch(`http://localhost:1337/api/taskss/${editedTodo.value.id}`, {
        method: 'PUT',
        body: {
            data: {
                    "completed": `${editedTodo.value.completed}`,
                    "title": `${editedTodo.value.title}`,
                    "userId": `${editedTodo.value.userId}`,                   
                }
        }
        })
      getTodos()
}
const searchTodo = async () => {
    todos.value = JSON.parse(JSON.stringify(await $fetch(`http://localhost:1337/api/taskss?filters[title][$containsi]=${searchQuery.value}`)))
    organizeTodos()
}
</script>
<style scoped lang="scss">

.main{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.search{
    width: 70vw;
    min-width: 342px;
    color: white !important;
    background-color: #292639;
    border: none;

    &__icon{
        color: white !important;
    }

    &::placeholder{
    color: white;
    }
    
}

.button{
    border-radius: 0;
}
.fab{
    position: absolute;
    right: 15px;
    bottom: 0px;
}
.feed{
    height: auto;
    width: 70vw;
    min-width: 343px;
    height: 484px;
    overflow-y: scroll;
    
}
.feed::-webkit-scrollbar {
  display: none;
}
    
</style>