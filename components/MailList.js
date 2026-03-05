import React from 'react'
import { Modal } from 'semantic-ui-react'
import MailchimpForm from './MailchimpForm'

export default () => (
  <Modal basic size='small' centered={false} defaultOpen>
    <Modal.Content>
      <MailchimpForm />
    </Modal.Content>
  </Modal>
)

