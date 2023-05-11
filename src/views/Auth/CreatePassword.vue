<template>
  <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
    <div class="flex flex-column align-items-center justify-content-center">
      <!-- <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" /> -->
      <!-- <div style="border-radius: 27px; padding: 0.2rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 40%)"> -->
      <div class="surface-card pt-6 pb-3 px-7 sm:px-6" style="border-radius: 23px; width: 500px">
        <div class="text-center mb-4">
          <!-- <img src="https://icons.veryicon.com/png/o/miscellaneous/two-color-icon-library/user-286.png" alt="Image" class="mb-1 w-8rem flex-shrink-0" /> -->
          <div class="text-900 text-3xl font-medium mb-2 text-primary-600">{{ data.title }}</div>
          <span class="text-600 font-medium">{{ data.body }}</span>
          <form @submit.prevent="handleValidForm(!v$.$invalid)">
            <div v-if="data.step == 1" class="field mt-2 mx-5">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <i class="pi pi-lock"></i>
                </span>
                <Password v-model.trim="user.password" placeholder="password*" toggle-mask :feedback="false" @blur="v$.password.$touch()" />
              </div>
              <span v-if="errorsPassword.length">
                <small class="p-error">{{ errorsPassword[0] }}</small>
              </span>
            </div>
            <div v-if="data.step == 1" class="field mt-3 mx-5">
              <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <i class="pi pi-lock"></i>
                </span>
                <Password v-model.trim="user.confirmPassword" placeholder="confirm password*" toggle-mask :feedback="false" @blur="v$.confirmPassword.$touch()" />
              </div>
              <span v-if="errorsConfirmPassword.length">
                <small class="p-error">{{ errorsConfirmPassword[0] }}</small>
              </span>
            </div>
            <Button v-if="data.step === 1" type="submit" label="Reset password" />
            <div class="flex">
              <router-link v-if="data.step === 1" :to="{ name: 'home' }">
                <i class="pi pi-arrow-left text-gray-500">
                  <span class="hover:text-primary-600"> Go Home</span>
                </i>
              </router-link>
            </div>
            <router-link v-if="data.step === 2" :to="{ name: 'login' }" class="flex justify-content-center align-items-center py-5 border-300">
              <span class="flex justify-content-center align-items-center bg-cyan-400 border-round" style="height: 3.5rem; width: 3.5rem">
                <i class="text-50 pi pi-sign-in text-2xl"></i>
              </span>
              <span class="ml-4 flex flex-column">
                <span class="text-900 lg:text-xl font-medium">Log In</span>
              </span>
            </router-link>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue"
import { useRoute } from "vue-router"
import AuthService from "@/services/auth/authService"
import { required, sameAs, minLength, maxLength, helpers } from "@vuelidate/validators"
import { useVuelidate } from "@vuelidate/core"
import ValidateUser from "@/views/Users/composables/formValidate"

const route = useRoute()
const formatPassword = helpers.regex(/^(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)

const user = reactive({
  password: "",
  confirmPassword: "",
})

const data = reactive({ step: 1, title: "Reset account password", body: `Please create a new password` })
const passwordConfirm = ref<string>("") // TODO this variable saves the password for compatibility with confirmPassword

const rules = {
  password: { required, formatPassword, minLength: minLength(8), maxLength: maxLength(50) },
  confirmPassword: { required, sameAsPassword: sameAs(passwordConfirm) },
}
const v$ = useVuelidate(rules, user)

const handleValidForm = async (isFormValid: boolean): Promise<void> => {
  v$.value.$touch()
  if (isFormValid) {
    await handleCreatePassword(user.password)
  }
}

const handleCreatePassword = async (password: string): Promise<void> => {
  const token = route.query.token ?? ""
  await AuthService.createPassword(token.toString(), password)
  data.step = 2
  data.body = ``
  data.title = "Password created successfully"
}

const errorsPassword = computed(() => {
  return ValidateUser.errorsPassword(v$.value.password)
})

const errorsConfirmPassword = computed(() => {
  return ValidateUser.errorsConfirmPassword(v$.value.confirmPassword)
})

watch(
  () => user.password,
  (/*newValue, oldValue */) => {
    passwordConfirm.value = user.password
  }
  // { deep: true } el nuevo valor y el antiguo serán el mismo
)
</script>

<style scoped></style>
