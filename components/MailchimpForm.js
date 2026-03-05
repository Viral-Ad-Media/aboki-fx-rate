import React, { useState } from 'react'
import {
    Input,
    Header,
    Form,
    Button
} from 'semantic-ui-react'
import MailchimpSubscribe from "react-mailchimp-subscribe"

const url = "//xxxx.us13.list-manage.com/subscribe/post?u=zefzefzef&id=fnfgn";

const SubscriptionForm = ({ status, onValidated }) => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')

    const submit = event => {
      event.preventDefault()
      if (!email || !name || email.indexOf('@') === -1) {
        return
      }

      onValidated({
        EMAIL: email.trim(),
        NAME: name.trim()
      })
    }

  
    return (
        <Form size='big' onSubmit={submit}>
        <Header content="join our mailing list to stay up to date on current currency exchange rate and news." style={{textAlign:'center', fontWeight: 'bolder', marginTop: '10%', color:'#fff'}} />
          <Form.Group widths='equal'>
              <Form.Field
                  control={Input}
                  id='email'
                  label={{ children: 'Email', htmlFor: 'form-select-control-email', style:{color:'#fff'} }}
                  placeholder={'Email'}
                  value={email}
                  fluid
                  width='eight'
                  onChange={(event, data) => setEmail(data.value)}
              />
              <Form.Field
                  control={Input}
                  id='name'
                  label={{ children: 'Name', htmlFor: 'form-select-control-name', style:{color:'#fff'} }}
                  placeholder={'Name'}
                  value={name}
                  fluid
                  width='eight'
                  onChange={(event, data) => setName(data.value)}
              />
              </Form.Group>
                <Button color='orange' type='submit' disabled={status === 'sending'}>Submit</Button>
              </Form>
    );
  };
 

export default () => (
    <MailchimpSubscribe
      url={url}
      render={({ subscribe, status, message }) => (
        <div>
          <SubscriptionForm status={status} onValidated={formData => subscribe(formData)} />
          {status === "sending" && <div style={{ color: "blue" }}>sending...</div>}
          {status === "error" && <div style={{ color: "red" }} dangerouslySetInnerHTML={{__html: message}}/>}
          {status === "success" && <div style={{ color: "green" }}>Subscribed !</div>}
        </div>
      )}
    />
  )
