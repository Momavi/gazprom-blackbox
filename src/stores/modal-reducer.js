import { defineStore } from 'pinia';

export const useModalStore = defineStore({
  id: 'modal',
  state: () => ({
    isLoginOpen: false,
    isRegisterOpen: false,
  }),
  actions: {
    openLogin() {
      this.isLoginOpen = true;
    },
    closeLogin() {
      this.isLoginOpen = false;
    },
    openRegister() {
      this.isRegisterOpen = true;
    },
    closeRegister() {
      this.isRegisterOpen = false;
    },
  },
});
