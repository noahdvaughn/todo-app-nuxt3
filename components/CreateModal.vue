<template lang="">
    <div :class='className' class='main'>
       <img src='@/assets/Rectangle.png'/>

        
        <div class='header'>
            <i class='pi pi-arrow-left' @click="closeModal"></i> 
            <h1 class='header-h1'>Add Todo</h1>
        </div>
        <form @submit.prevent="handleSubmit" class='form'>
            <InputText  v-model="newTodo.title" class='form-item' />
            <Dropdown v-model='newTodo.userId' :options='userOptions' optionLabel='text' optionValue='value' class='form-item'  />
            <Dropdown v-model='newTodo.completed' :options='completedOptions' optionLabel='text' optionValue='value' class='form-item' />

            <div>
                
            </div>
            <Button class='button mt-6' style='background-color: #6ADD8A ;' label='Finish' type='submit' />
            <Button class='button' label='Quit' text @click='closeModal' />
        </form>

    </div>
</template>

<script setup lang="ts">


const className = ref('sliding-up')
const newTodo = ref({
    title: 'New Todo',
    completed: false,
    userId: 1
})
const userOptions = ref([
        {value: 1, text: 'User 1'},
        {value: 2, text: 'User 2'},
        {value: 3, text: 'User 3'},
        {value: 4, text: 'User 4'},
        {value: 5, text: 'User 5'},
])
const completedOptions = [
    {value: false, text: 'Not Completed'},
    {value: true, text: 'Completed'},
]

const emit = defineEmits<{
    (event: 'toggleModal'): void;
    (event: 'refresh'): void;
}>()

const closeModal = () => {
    className.value = 'sliding-down'
    setTimeout(()=>{emit('toggleModal'), className.value = 'sliding-up'  }, 300 )
}

const handleSubmit = async() => {
    const response = await $fetch(`http://localhost:1337/api/taskss`, {
        method: 'POST',
        body: {
            data: {
                    "completed": `${newTodo.value.completed}`,
                    "title": `${newTodo.value.title}`,
                    "userId": `${newTodo.value.userId}`,                   
                }
        }
        })
    emit('refresh')
    closeModal()
}
</script>

<style lang="scss" scoped>
.main{
    padding: 17px;
    left: 0;
    right: 0;
    bottom: 0;
    height: 97vh;
    width: 100vw;
    background-color: #060417;
    z-index: 1;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.header{
    display: flex;
    align-items: center;
    &-h1{
        font-size: 24px;
        line-height: 20px;
        font-weight: 500;
    }

}
.form{
    display: flex;
    flex-direction: column;
    min-height: 327px;
    align-items: center;

    &-item{
        width: 343px;
        background-color: #292639;
        border: none;
        margin-top: 15px;
    }
}
.button{
    
    border: none;
    width: 294px;
    height: 60px;
    color: white;
    font-family: 'Poppins';
    font-size: 18px;
    line-height: 20px;
    font-weight: 500;
}
.quit{
    color: white;
}
.pi-arrow-left{
    position: absolute;
    left: 10px;
    font-size: 20px;

}

.sliding-up{
    animation: slide-up 0.3s ease-out;
}
@keyframes slide-up {
    from {
        transform: translateY(100%);
    }
    
    to {
        transform: translateY(0);
    }
}
.sliding-down{
  animation: slide-down 0.3s ease-out;

}
@keyframes slide-down {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
}
    
</style>