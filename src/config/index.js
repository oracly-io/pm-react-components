const config = {
  pm_base_path: process.env.PM_BASE_PATH || '/',
  st_base_path: process.env.ST_BASE_PATH || '/',
  mt_base_path: process.env.MT_BASE_PATH || '/',
  react_mount_element_id: process.env.REACT_MOUNT_ELEMENT_ID,
  modal_id: 'gh-app-modal',

  avatars_path: 'https://app.staging.oracly.io/ava/output/',
  avatars_amount: 636,
}

export default config
