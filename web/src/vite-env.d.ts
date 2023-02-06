/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

import 'dayjs'

declare module 'dayjs' {
  interface Dayjs {
    dayOfYear(): number
  }
}
