# 46elks SMS GitHub Action

Send an SMS with the [46elks](https://46elks.com/) API from GitHub
Actions.


## Inputs

* `apiUsername` - **Required**: Your 46elks API username, available at
  the [46elks dashboard](https://46elks.com/account).
* `apiPassword` - **Required**: Your 46elks API password, also available
  from the 46elks dashboard.
* `from` - **Required**: The number or alpha numerical sender ID you
  would like to send the SMS from. Defaults to `"ElkAction"`.
* `to` - **Required**: The number you would like to send the SMS to.
  Defaults to `+4670000000`, which does not actually send a message and
  is free, but will show up in your logs.
* `message` - **Required**: The message to send with the SMS.

## Outputs

* `id` - The 46elks SMS ID of the SMS that was created.


## Usage

Store your API credentials in your repository's `Settings` -> `Secrets`,
then you'll be able to use them as below.

```yaml
- name: Send SMS action step
  uses: 46elks/gh-actions-sms@v1.0.0
  id: sms
  with:
    apiUsername: ${{ secrets.ELKS_API_USERNAME }}
    apiPassword: ${{ secrets.ELKS_API_PASSWORD }}
    from: 'ElkAction'
    to: '+4670000000'
    message: 'An elk says that something happened!'
- name: Get the SMS ID
  run: "echo \"SMS ID: ${{ steps.sms.outputs.id }}\""
```
