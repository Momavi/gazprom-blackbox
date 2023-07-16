import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    access: '',
    accessLevel: 0,
    name: '',
    email: '',
  }),
  actions: {
    resetUser() {
      localStorage.removeItem('token');
      this.access = ''
      this.name = ''
      this.email = ''
      this.password = ''
    },
    setUser(user) {
      this.email = user.email;
      this.name = user.name;
      this.access = user.role;
      if ( user.role === 'ADMIN' ) {
        this.accessLevel = 3
      } else if (user.role === 'CONFIRMED') {
        this.accessLevel = 2
      } else if (user.role === 'USER') {
        this.accessLevel = 1
      } else {
        this.accessLevel = 0
      }
    }
  },
});
