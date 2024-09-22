import config from '@config'

export function getInvitationLink(address) {

  let host = `app.oracly.io${config.pm_base_path}`

  if (window.location.host.includes('localhost')) host = 'localhost:8801'
  else if (window.location.host.includes('staging')) host = `app.staging.oracly.io${config.pm_base_path}`

  return `${location.protocol}//${host}/?invitation=${address}`.toLocaleLowerCase()
  
}