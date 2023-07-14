import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    access: 'Неизвестный',
    name: '',
    email: '',
    password: '',
  }),
  actions: {},
});
