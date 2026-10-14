import React from 'react';

const NOTIFICATION = {
  title: 'Welcome',
  body: 'receive realtime update!',
  icon: '/static/assets/android-chrome-192x192.png',
  tag: 'realtime update'
};

const isSupported = () => typeof window !== 'undefined' && 'Notification' in window;

class WebNotification extends React.Component {
  constructor(props) {
    super(props);
    this.notification = null;
    this.handleClick = this.handleClick.bind(this);
  }

  async componentDidMount() {
    if (!isSupported()) {
      return;
    }
    try {
      let permission = Notification.permission;
      if (permission === 'default') {
        permission = await Notification.requestPermission();
      }
      if (permission === 'granted') {
        this.showNotification();
      }
    } catch (error) {
      console.error('Unable to show browser notification', error);
    }
  }

  componentWillUnmount() {
    if (this.notification) {
      this.notification.close();
      this.notification = null;
    }
  }

  showNotification() {
    this.notification = new Notification(NOTIFICATION.title, {
      body: NOTIFICATION.body,
      icon: NOTIFICATION.icon,
      tag: NOTIFICATION.tag
    });
    this.notification.onclick = this.handleClick;
  }

  handleClick() {
    window.focus();
    if (this.notification) {
      this.notification.close();
      this.notification = null;
    }
  }

  render() {
    return null;
  }
}

export default WebNotification;
