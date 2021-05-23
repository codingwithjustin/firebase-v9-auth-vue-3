<script>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const auth = getAuth()
    const router = useRouter()

    const handleSubmit = async e => {
      const { email, password } = e.target.elements
      try {
        await signInWithEmailAndPassword(auth, email.value, password.value)
        router.push('/')
      } catch (e) {
        alert(e.message)
      }
    }

    return { handleSubmit }
  }
}
</script>

<template>
  <h1>Login</h1>
  <form @submit.prevent="handleSubmit">
    <input name="email" placeholder="email" type="email" />
    <input name="password" placeholder="password" type="password" />
    <button type="submit">Login</button>
  </form>
</template>
