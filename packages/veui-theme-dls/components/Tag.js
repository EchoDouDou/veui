import config from 'veui/managers/config'
import 'veui-theme-dls-icons/times'

config.defaults(
  {
    icons: {
      close: 'times'
    },
    ui: {
      style: {
        values: ['no-border']
      },
      size: {
        values: ['s', 'm']
      }
    },
    parts: {
      close: 'icon'
    }
  },
  'tag'
)
