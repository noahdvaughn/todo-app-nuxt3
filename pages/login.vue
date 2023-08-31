<template lang="">

    <LoginForm v-if='!registering' />
    <RegisterForm v-if='registering' />
    
  
</template>

<script setup lang="ts">
import {useRegisteringStore} from '@/store/register'
import {storeToRefs} from 'pinia'
const registeringStore = useRegisteringStore()
const {registering} = storeToRefs(registeringStore)



</script>

<style lang="scss" scoped>

    
</style>