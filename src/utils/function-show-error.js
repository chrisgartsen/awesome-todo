import { Dialog } from 'quasar'

export function showErrorMessage(errorMessage) {
  Dialog.create({ 
    title: 'Error',
    ok: {
      color: 'red'
    },  
    class: 'auth-error',
    message: errorMessage
  })
}