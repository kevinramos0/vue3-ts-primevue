import Checkbox from 'primevue/checkbox';
<template>
  <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
    <div class="flex flex-column align-items-center justify-content-center">
      <!-- <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" /> -->
      <!-- <div style="border-radius: 27px; padding: 0.2rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 40%)"> -->
      <div class="w-full surface-card py-6 px-7 sm:px-6" style="border-radius: 23px">
        <div class="text-center mb-4">
          <!-- <img src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png" alt="Image" class="mb-1 w-8rem flex-shrink-0" /> -->
          <div class="text-900 text-3xl font-medium mb-3">Welcome</div>
          <span class="text-600 font-medium">Sign in to continue</span>
        </div>
        <form @submit.prevent="handleSubmit(!v$.$invalid)">
          <div>
            <label for="email" class="block text-900 text-xl font-medium mb-2">Email</label>
            <InputText v-model.trim="v$.email.$model" id="email" type="text" placeholder="Email address" class="w-full md:w-30rem mb-1" style="padding: 1rem" autofocus />
            <div class="mb-5">
              <span v-if="v$.email.$error && submitted">
                <span id="email-error" v-for="(error, index) of v$.email.$errors" :key="index">
                  <small class="p-error">{{ error.$message.toString().replace("Value", "Email") }}</small>
                </span>
              </span>
              <small v-else-if="(v$.email.$invalid && submitted) || v$.email.$pending" class="p-error">
                {{ v$.email.required.$message.replace("Value", "Email") }}
              </small>
            </div>
            <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
            <Password id="password1" v-model.trim="v$.password.$model" placeholder="Password" toggle-mask class="w-full mb-1" input-class="w-full" input-style="padding:1rem" :feedback="false" />
            <div class="mb-5">
              <small v-if="(v$.password.$invalid && submitted) || v$.password.$pending" class="p-error">
                {{ v$.password.required.$message.replace("Value", "Password") }}
              </small>
            </div>
            <div class="flex align-items-center justify-content-between mb-5 gap-5">
              <router-link :to="{ name: 'resetPassword' }" class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Forgot password? </router-link>
            </div>
            <Button type="submit" label="Sign In" class="w-full p-3 text-xl"></Button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- </div> -->
</template>

<script setup lang="ts">
import { ref, reactive } from "vue"
import { useAuthStore } from "@/stores"
import { useVuelidate } from "@vuelidate/core"
import { required, email } from "@vuelidate/validators"

const submitted = ref<boolean>(false)
const login = reactive<{ email: string; password: string }>({
  email: "",
  password: "",
})
const authStore = useAuthStore()

const rules = {
  email: { required, email },
  password: { required },
}

const v$ = useVuelidate(rules, login)

const handleSubmit = (isFormValid: boolean): void => {
  submitted.value = true
  if (isFormValid) {
    handlerLogin()
  }
}

const handlerLogin = async (): Promise<void> => {
  await authStore.login(login.email, login.password)
}
</script>

<style scoped></style>
