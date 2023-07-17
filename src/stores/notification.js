import { defineStore } from 'pinia';

export const useNotificationStore = defineStore({
  id: 'notification',
  state: () => ({
    showNotification: false,
    status: 0,
    message: '',
    countdown: 3,
    countdownTimer: null,
  }),
  actions: {
    setData(status, message, countdown = 3) {
      clearInterval(this.countdownTimer);
      this.showNotification = true;
      this.status = status;
      this.message = message;
      this.countdown = countdown;
      this.startTimer()
    },
    startTimer() {
      this.countdownTimer = setInterval(() => {
        this.countdown -= 1;
        if ( this.countdown === 0 ) {
          clearInterval(this.countdownTimer);
          this.showNotification = false;
        }
      }, 1000);
    }
  }
});
