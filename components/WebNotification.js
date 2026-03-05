import React from 'react';
import ReactNotifications from 'react-browser-notifications';

class WebNotification extends React.Component {
  constructor() {
    super();
    this.showNotifications = this.showNotifications.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  showNotifications() {
    if (this.n && this.n.supported()) {
      this.n.show();
    }
  }

  handleClick(event) {
    window.focus()
    if (this.n) {
      this.n.close(event.target.tag);
    }
  }

  componentDidMount() {
    if (this.n && this.n.supported()) {
      this.n.show()
    }
  }

  render() {
    return (
      <div>

        <ReactNotifications
          onRef={ref => (this.n = ref)} // Required
          title="Welcome" // Required
          body="receive realtime update!"
          icon="devices-logo.png"
          tag="realtime update"
          onClick={event => this.handleClick(event)}
        />
      </div>
    )
  }
}
export default WebNotification
