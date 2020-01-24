const core = require('@actions/core');
const https = require('https')
const querystring = require('querystring')

function sendSMS(username, password, from, to, message) {
  const key = Buffer.from(username + ':' + password).toString('base64')

  const postFields = {
    from: from,
    to: to,
    message: message
  }

  const postData = querystring.stringify(postFields)

  const options = {
    hostname: 'api.46elks.com',
    path: '/a1/SMS',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length,
      'Authorization': 'Basic ' + key
    }
  }

  const req = https.request(options, (res) => {
    let data = ''
    res.on('data', (d) => {
      data += d
    })

    res.on('end', () => {
      if (res.statusCode == 200) {
        let id = JSON.parse(data).id
        core.setOutput('id', id)
      } else {
        core.setFailed(`Status code: ${res.statusCode}`)
      }
      console.log(data)
    })
  })

  req.on('error', (error) => {
    core.setFailed(error)
  })

  req.write(postData)
  req.end()
}

try {
  const apiUsername = core.getInput('apiUsername')
  const apiPassword = core.getInput('apiPassword')
  const to = core.getInput('to')
  const from = core.getInput('from')
  const message = core.getInput('message')

  sendSMS(apiUsername, apiPassword, from, to, message)
} catch (error) {
  core.setFailed(error.message)
}
