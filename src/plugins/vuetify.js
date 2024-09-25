import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'customTheme',
    themes: {
      customTheme: {
        dark: false, 
        colors: {
          primary: '#F2E8C6', 
          secondary: '#DAD4B5', 
          background: '#800000',
          fadedbackground: '#805656',
          surface: '#982B1C',
          error: '#FF5252',
          info: '#2196F3', 
          success: '#4CAF50', 
          warning: '#FFC107' 
        }
      },
    }
  }
})
