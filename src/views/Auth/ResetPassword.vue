<template>
  <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
    <div class="flex flex-column align-items-center justify-content-center">
      <!-- <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" /> -->
      <!-- <div style="border-radius: 27px; padding: 0.2rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 40%)"> -->
      <div class="surface-card pt-6 pb-3 px-7 sm:px-6" style="border-radius: 23px; width: 500px">
        <div class="text-center mb-4">
          <!-- <img src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png" alt="Image" class="mb-1 w-8rem flex-shrink-0" /> -->
          <div class="text-900 text-3xl font-medium mb-3 text-primary-600">{{ data.title }}</div>
          <span class="text-600 font-medium">{{ data.body }}</span>
          <form @submit.prevent="handleValidForm(!v$.$invalid)">
            <div v-if="data.step === 1" class="field mt-3 px-5">
              <!-- <div class="col-12 md:col-12"> -->
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <i class="pi pi-envelope"></i>
                </span>
                <InputText placeholder="email*" type="text" v-model.trim="user.email" @blur="v$.email.$touch()" />
              </div>
              <span v-if="errorsEmail.length">
                <small class="p-error">{{ errorsEmail[0] }}</small>
              </span>
            </div>
            <Button v-if="data.step === 1" type="submit" label="Restore" />
            <div class="flex">
              <router-link v-if="data.step === 1" :to="{ name: 'home' }">
                <i class="pi pi-arrow-left text-gray-500">
                  <span class="hover:text-primary-600"> Go Home</span>
                </i>
              </router-link>
            </div>
            <router-link v-if="data.step === 2" :to="{ name: 'home' }" class="flex justify-content-center align-items-center py-5 border-300">
              <span class="flex justify-content-center align-items-center bg-cyan-400 border-round" style="height: 3.5rem; width: 3.5rem">
                <i class="text-50 pi pi-home pi-table text-2xl"></i>
              </span>
              <span class="ml-4 flex flex-column">
                <span class="text-900 lg:text-xl font-medium">Go Home</span>
              </span>
            </router-link>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue"
import AuthService from "@/services/auth/authService"
import { email, required } from "@vuelidate/validators"
import { useVuelidate } from "@vuelidate/core"
import ValidateUser from "@/views/Users/composables/formValidate"

const user = reactive({ email: "" })
const data = reactive({ step: 1, title: "Restore Password", body: "To change your password please enter the email associated with your account." })

const rules = {
  email: { required, email },
}

const v$ = useVuelidate(rules, user)

const handleValidForm = async (isFormValid: boolean): Promise<void> => {
  v$.value.$touch()
  if (isFormValid) {
    await handleChangePassword(user.email)
  }
}

const handleChangePassword = async (email: string): Promise<void> => {
  await AuthService.resetPassword(email)
  data.step = 2
  data.body = `We have sent a link to your email ${email} to change your password.`
  data.title = "Please verify your email"
}

const errorsEmail = computed(() => {
  return ValidateUser.errorsEmail(v$.value.email)
})
</script>

<style scoped></style>
