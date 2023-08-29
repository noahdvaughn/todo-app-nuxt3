<template lang="">
    <div class='todo'>
        <div class='left flex'>
            <i v-if="item.attributes.completed === false" class='pi pi-circle-fill' @click="$emit('markTodoCompleted', item.id )"></i>
            <img v-if="item.attributes.completed === true" src='@/assets/CircleCheck.svg' class='circle-green'/>
        
        
        <div class='stack'  >
                <h3 class="left-title">{{ item.attributes.title }}</h3>
                <h4 class="left-user">User: {{ item.attributes.userId }}</h4>     
            </div>
        </div>

        <div>
            <i class='pi pi-ellipsis-h' @click="toggle" aria-haspopup="true" aria-controls="overlay_menu"></i>
            <Menu :model="menuItems" ref="menu" id="overlay_menu" :popup="true" class='menu' :focused=false
            
            :pt="{
                root: (options) => ({
                    style: {
                        'background-color': 'black',
                        'color': 'black',
                        'fill': 'black',
                        'border': 'none',
                     },
                }),
                content: (options) => ({
                    style: {
                        'background-color': 'black',                        
                     },
                }),
            
            }"
            
            />    
        </div>
        <EditModal :item='item' v-if="showModal" @updateTodo="updateTodo" @toggleModal="toggleModal" />
    </div>
</template>
<script setup lang="ts">

import { ref } from "vue";
const menu = ref();
const showModal = ref(false)


const menuItems = ref([                 
            {
                label: 'Edit ToDo',           
                command: () => {
                    toggleModal()                
                }
            },
            {
                label: 'Mark Completed',                
                command: () => {
                    emit('markTodoCompleted', item.id )
                }
            }
])
const toggle = (event: any) => {
    menu.value.toggle(event);
};
const toggleModal = () => {
    showModal.value = !showModal.value
}



const emit = defineEmits<{
    (event: 'markTodoCompleted', id: number): void;
    (event: 'updateTodo', editedTodo: object): void;
    (event: 'toggleModal'): void;
}>()
const updateTodo = (editedTodo: object) => {
    console.log('hit in card')
    emit('updateTodo', editedTodo)

}


const {item} = defineProps({
    item: {
        type: Object,
        required: true
    }
})
</script>
<style scoped lang="scss" >
.menu:focus{
    color: white !important;
}
.icon{
    color: white;
    font-size: 50px;
}
.todo{
    display: flex;
    width: 343px;
    height: 84px;
    background-color: #292639;
    border-radius: 10px;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    padding: 16px;
    margin-top: 20px;
}
.pi-circle-fill{
    font-size: 44px;
    color: #3B3753; 
    margin-right: 16px;
}
.circle-green{
    margin-right: 16px;
}
.pi-ellipsis-h{
    color: white;
    font-size: 25px;
    margin-right: 16px;
}


.left{
    color: white;
    align-items: center;

    &-title{
        font-size: 14px;
        line-height: 20px;
        font-weight: 500;
        font-family: 'Rubik';
    }
    &-user{
        margin-top: -10px;
        font-size: 12px;
        font-weight: 400;
        line-height: 14px;
        color: #BDBDBD;
        background-color: #3F3C4E;
        padding: 5px 8px;
        width: fit-content;
        text-align: center;
        border-radius: 5px;
        height: 24px;
        
        }
}
    
</style>