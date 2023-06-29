<template>
  <!-- eslint-disable-next-line vue/no-v-model-argument -->
  <Dialog :visible="modelValue" :draggable="false" :modal="true" class="p-fluid" :style="{ width: '418px' }" @update:visible="emit('close')">
    <template #header>
      <!-- <div class="flex justify-content-center flex-wrap card-container yellow-container"> -->
      <div class="text-center justify-content-center flex flex-wrap">Create Users</div>
      <!-- </div> -->
    </template>
    <form @submit.prevent="handleSaveUser(!v$.$invalid)">
      <div class="field">
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

      <div class="field">
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
      <div class="field">
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

      <div class="field">
        <!-- <label for="profile" class="mb-3">Profile</label> -->
        <!-- eslint-disable-next-line vue/no-v-model-argument -->
        <Dropdown v-model="profileSeleted" :options="profiles" show-clear option-label="name" placeholder="Select a profile" @change="changeProfile($event)">
          <template #value="slotProps">
            <div v-if="slotProps.value && slotProps.value.id">
              <span>{{ slotProps.value.name }}</span>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
        </Dropdown>
      </div>
      <small class="text-gray-600"> * Indicated fields required</small>
      <Button type="submit" label="Save" class="mt-3" />
      <Button label="Save and Close" class="mt-3" @click="handleSaveandClose(!v$.$invalid)" />
      <Button label="Close" class="mt-3 bg-red-600 hover:bg-red-700 border-red-600" @click="closeModal" />
    </form>
  </Dialog>
</template>

<script lang="ts" setup>
import { ref, watch, reactive, onMounted, computed } from "vue"
import { useVuelidate } from "@vuelidate/core"
import { required, email, sameAs, minLength, maxLength, helpers } from "@vuelidate/validators"
import type { IUserModel } from "@/views/Users/interfaces/usermodel"
import UserService from "@/services/users/users"
import ProfileService from "@/services/profiles/profileServices"
import ValidateUser from "../composables/formValidate"

const profiles = ProfileService.showProfiles()
const formatPassword = helpers.regex(/^(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)

const emit = defineEmits(["close"])

defineProps({
  modelValue: {
    type: Boolean,
    required: true,
    default: false,
  },
})

const user = reactive<IUserModel>({
  email: "",
  password: "",
  confirmPassword: "",
  profile: 0,
})

const profileSeleted = ref()

const passwordConfirm = ref<string>("") // TODO this variable saves the password for compatibility with confirmPassword

const rules = {
  email: { required, email },
  password: { required, formatPassword, minLength: minLength(8), maxLength: maxLength(50) },
  confirmPassword: { required, sameAsPassword: sameAs(passwordConfirm) },
}

const v$ = useVuelidate(rules, user)

const handleSaveUser = async (isFormValid: boolean): Promise<void> => {
  v$.value.$touch()
  if (isFormValid) {
    await handleCreateUser(user)
  }
}

const handleSaveandClose = async (isFormValid: boolean): Promise<void> => {
  v$.value.$touch()
  if (isFormValid) {
    await handleCreateUser(user)
    closeModal()
  }
}

const handleCreateUser = async (user: IUserModel): Promise<void> => {
  await UserService.createUser({
    email: user.email,
    password: user.password,
    ...((profileSeleted.value && { profile: user.profile }) || null),
  })
  clearForm()
}

const changeProfile = async (event: { value: { id: number } }): Promise<void> => {
  if (event.value) {
    profileSeleted.value = event.value
    user.profile = profileSeleted.value.id
  } else {
    profileSeleted.value = ""
    user.profile = 0
  }
}

const clearForm = (): void => {
  v$.value.$reset()
  user.email = ""
  user.password = ""
  user.confirmPassword = ""
  user.profile = 0
  profileSeleted.value = null
}

const closeModal = (): void => {
  clearForm()
  emit("close")
}

watch(
  () => user.password,
  (/*newValue, oldValue */) => {
    passwordConfirm.value = user.password
  }
  // { deep: true } el nuevo valor y el antiguo serán el mismo
)

onMounted(async () => {
  await ProfileService.getProfiles({
    pagination: false,
  })
})

const errorsEmail = computed(() => {
  return ValidateUser.errorsEmail(v$.value.email)
})
const errorsPassword = computed(() => {
  return ValidateUser.errorsPassword(v$.value.password)
})

const errorsConfirmPassword = computed(() => {
  return ValidateUser.errorsConfirmPassword(v$.value.confirmPassword)
})
</script>

<style lang="scss" scoped></style>
