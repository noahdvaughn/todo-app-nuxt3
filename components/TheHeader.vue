<template>


    <div class="main flex">

        <div class="flex header">
            <h2 class="header__title">ToDo's</h2>
            <i class="pi pi-ellipsis-h header__icon" ></i>
        </div>
        
    <div class="flex navbar">
        <div :class="{'navbar__button-underlined' : viewingOpen}" class="navbar__button" @click="setViewingOpen(true)">
            <h3 class="navbar__button-text">Open</h3>
        </div>
        <div :class="{'navbar__button-underlined' : !viewingOpen}" class="navbar__button" @click="setViewingOpen(false)">
            <h3 class="navbar__button-text">Closed</h3>
        </div>
    </div>
</div>

</template>
<script setup lang="ts">
import {useOpenedStore} from '@/store/opened'
import {storeToRefs} from 'pinia'
const store = useOpenedStore()
const {viewingOpen} = storeToRefs(store)
const {setViewingOpen} = store


</script>
<style scoped lang="scss">

    .main{
        flex-direction: column;
        justify-content: space-between;
        margin: 0;
        padding: 0;
        background-color: #292639;
        color: white;
        height: 151px;
    }
    .pi-ellipsis-h{
        color: white;
        font-size: 3rem;
    }
    .header{
        padding: 0 17px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &__title{
            font-family: 'Poppins';
        font-weight: 600 !important;
        font-size: 32px;
        line-height: 41px;
        }
        &__icon{
            font-size: 30px;
        }
    }
    .navbar{
        display: flex;
        justify-content: space-around;
        text-align: center;

        

        &__button{
            opacity: 0.7;
            width: 96px;
            height: 39px;
            border-bottom: 3px solid transparent;
            &:hover{
                border-bottom: 3px solid white;
            }


            &-text{
                font-weight: 400;
                font-size: 18px;
                line-height: 27px;
                margin: auto;
            }
            &-underlined{
                opacity: 1;
                width: 96px;
                height: 39px;
                border-bottom: 3px solid white;
            }
        }
    }

</style>