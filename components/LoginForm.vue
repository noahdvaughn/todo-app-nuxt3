<template lang="">
    <h1 v-if='user.value'>You are logged in</h1>
    <div class='main'>
        
        <div class='header'>
            <h1 class='header__h1'>Login</h1>
        </div>
        <form @submit.prevent="onSubmit" class='form' ref='form'>
            <InputText  v-model="user.email" class='form__item' placeholder='Email or Username' />

            <Password v-model="user.password" toggleMask  :feedback="false"  
            inputClass='form__item' class='mt-3' placeholder='Password'
            :pt="{
                input: (options) => ({
                    style: {
                        'background-color': '#292639',
                        'border': 'none',
                        'width': '343px',
                     },
                }),
            }"

            
            />
            
            <Button class='button mt-6' style='background-color: #6ADD8A ;' label='Login' type='submit' />
            <Button class='button' label='Register' text @click='setRegistering(true)' />
            <Toast class='toast' position='top-center' />
        </form>
        
  
    </div>
</template>

<script setup lang="ts">
import { useToast } from "primevue/usetoast";
const { login } = useStrapiAuth()
const form = ref();
const toast = useToast();

import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

import {useRegisteringStore} from '@/store/register'
import {storeToRefs} from 'pinia'
const registeringStore = useRegisteringStore()
const {setRegistering} = registeringStore





const user = ref({
    email: '',
    password: ''
    
})

const rules = {
		email: { required },
		password: { required },
	};

const v$ = useVuelidate(rules, user);

const onSubmit = async () => {
    const isValid = await v$.value.$validate();
		if (!isValid) return;

      try {      
        const computedRoute = computed((): string => {
      const redirectCookieValue = useCookie("redirect").value;

      if (redirectCookieValue && typeof redirectCookieValue === "string") {
        return redirectCookieValue;
      } else {
        return "/";
      }
    });      
              await login({
                identifier: user.value.email,
                password: user.value.password,
              })
                .then(() => {
                  navigateTo('/');
                })
                .finally(() => {
                  form.value.reset();
                });
        
      } catch (error) {
        toast.add({ severity: 'error', summary: 'Incorrect username or password', life: 1000 });
        
      }
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
    &__h1{
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

    &__item{
        width: 343px !important;
        background-color: #292639 !important;
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


    
</style>