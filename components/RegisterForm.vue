<template lang="">

    <div class='main'>
        
        <div class='header'>
            <h1 class='header-h1'>Register</h1>
        </div>
        <form @submit.prevent="onSubmit" class='form' ref='form'>
            <InputText  v-model="user.email" class='form-item' placeholder='Email' />
            <small
            v-if="v$.email.$errors.length"
            >{{ v$.email.$errors[0].$message || "&nbsp;" }}</small>
          
            <InputText  v-model="user.username" class='form-item' placeholder='Username' />
            <small
            v-if="v$.username.$errors.length"
            >{{ v$.username.$errors[0].$message || "&nbsp;" }}</small>
                
            
          
            <small 
            v-if="v$.password.$errors.length"
            class="p-error" id="text-error">{{ passwordErrorMessage || '&nbsp;' }}</small>

            <Password 
                v-model="user.password" 
                toggleMask  
                inputClass='form-item' 
                class='mt-3'
                :class="{ 'p-invalid': passwordErrorMessage }"
                placeholder='Password'
                :pt="{
                    input: (options) => ({
                        style: {
                            'background-color': '#292639',
                            'border': 'none',
                            'width': '343px',
                        },
                    }),
                }">
                <template #content>
                    <p class="mt-2">Minimum 6 characters</p>
                    </template>
            
            </Password>
           
            
            <Button class='button mt-6' style='background-color: #6ADD8A ;' label='Create User' type='submit' />
            <Button class='button' label='Back To Login' text @click='setRegistering(false)' />
            <Toast class='toast' position='top-center' />
        </form>
        
  
    </div>
</template>
<script setup lang="ts">
import {useRegisteringStore} from '@/store/register'
import {storeToRefs} from 'pinia'
const registeringStore = useRegisteringStore()
const {registering} = storeToRefs(registeringStore)
const {setRegistering} = registeringStore
import { required, minLength, email } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
const { register } = useStrapiAuth()
const form = ref();




const rules = {
		username: { required,
            minLength: minLength(3)
        },
		password: { 
            required,
            minLength: minLength(6)
         },
         email: {
            required, 
            email
         }
	};

const user = ref({
    email: '',
    password: '',
    username: ''
    
})
const v$ = useVuelidate(rules, user);

const onSubmit = async () => {

    const isValid = await v$.value.$validate();
	if (!isValid) return;

    try {
        await register({ username: user.value.username, email: user.value.email, password: user.value.password}).then(() => {
                  setRegistering(false)
                })
                .finally(() => {
                  form.value.reset();
                });
        
    } catch (error) {
       
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
.toast{
    width: 100px !important;
}


    
</style>