import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { ref, computed, onMounted, onUnmounted } from 'vue'

import { initializeApp } from 'firebase/app'

export const firebaseApp = initializeApp({
  apiKey: 'AIzaSyCKEKpLKAad62VwyRx_J9Qe7_3R7o33JIY',
  authDomain: 'fir-auth-52005.firebaseapp.com',
  projectId: 'fir-auth-52005',
  storageBucket: 'fir-auth-52005.appspot.com',
  messagingSenderId: '986012551982',
  appId: '1:986012551982:web:63631ad43da7711b8408bf',
  measurementId: 'G-2FK5XC92GY'
})

export const getUserState = () =>
  new Promise((resolve, reject) =>
    onAuthStateChanged(getAuth(), resolve, reject)
  )

export const useAuthState = () => {
  const user = ref(null)
  const error = ref(null)

  const auth = getAuth()
  let unsubscribe
  onMounted(() => {
    unsubscribe = onAuthStateChanged(
      auth,
      u => (user.value = u),
      e => (error.value = e)
    )
  })
  onUnmounted(() => unsubscribe())

  const isAuthenticated = computed(() => user.value != null)

  return { user, error, isAuthenticated }
}
