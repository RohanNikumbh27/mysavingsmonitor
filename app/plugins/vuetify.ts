import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Material 3 Expressive Theme Colors
const customTheme = {
    dark: false,
    colors: {
        primary: '#006A6A',
        'primary-darken-1': '#004D4D',
        secondary: '#E57373',
        'secondary-darken-1': '#D32F2F',
        tertiary: '#FF9800',
        accent: '#00BFA5',
        surface: '#FFFFFF',
        'surface-variant': '#F4F0F4',
        'surface-container': '#F0ECF0',
        'surface-container-low': '#F8F4F8',
        'surface-container-high': '#E8E4E8',
        background: '#F5F7FA',
        error: '#BA1A1A',
        success: '#2E7D32',
        warning: '#F9A825',
        info: '#0288D1',
        savings: '#FFB300',
        'on-primary': '#FFFFFF',
        'on-secondary': '#FFFFFF',
        'on-surface': '#1C1B1F',
        'on-background': '#1C1B1F',
        outline: '#79747E',
        'outline-variant': '#CAC4D0',
    },
    variables: {
        'border-color': '#79747E',
        'border-opacity': 0.12,
        'high-emphasis-opacity': 0.87,
        'medium-emphasis-opacity': 0.60,
        'disabled-opacity': 0.38,
    }
}

const darkTheme = {
    dark: true,
    colors: {
        primary: '#4DB6AC',
        'primary-darken-1': '#26A69A',
        secondary: '#EF9A9A',
        'secondary-darken-1': '#E57373',
        tertiary: '#FFB74D',
        accent: '#64FFDA',
        surface: '#1C1B1F',
        'surface-variant': '#2D2B30',
        'surface-container': '#252428',
        'surface-container-low': '#1E1D21',
        'surface-container-high': '#363539',
        background: '#121212',
        error: '#F2B8B5',
        success: '#81C784',
        warning: '#FFD54F',
        info: '#4FC3F7',
        savings: '#FFCA28',
        'on-primary': '#00363A',
        'on-secondary': '#3E2723',
        'on-surface': '#E6E1E5',
        'on-background': '#E6E1E5',
        outline: '#938F99',
        'outline-variant': '#49454F',
    },
    variables: {
        'border-color': '#938F99',
        'border-opacity': 0.12,
        'high-emphasis-opacity': 0.87,
        'medium-emphasis-opacity': 0.60,
        'disabled-opacity': 0.38,
    }
}

export default defineNuxtPlugin((app: any) => {
    const vuetify = createVuetify({
        components,
        directives,
        theme: {
            defaultTheme: 'dark',
            themes: {
                light: customTheme,
                dark: darkTheme,
            },
        },
        defaults: {
            global: {
                font: {
                    family: 'Poppins, sans-serif',
                },
            },
            VTextField: {
                color: 'primary',
                rounded: 'xl',
                variant: 'outlined',
                density: 'default',
                singleLine: false,
                centerAffix: true,
                style: 'font-family: Poppins, sans-serif;',
            },
            VTextarea: {
                color: 'primary',
                rounded: 'xl',
                variant: 'outlined',
                style: 'font-family: Poppins, sans-serif;',
            },
            VBtn: {
                variant: 'flat',
                color: 'primary',
                rounded: 'xl',
                height: 70,
                style: 'text-transform: none; font-weight: 600; font-family: Poppins, sans-serif; padding-inline: 20px;',
            },
            VCard: {
                rounded: 'xl',
                style: 'font-family: Poppins, sans-serif;',
            },
            VDialog: {
                scrim: 'primary',
                width: 500,
                elevation: 2,
            },
            VChip: {
                rounded: 'xl',
                color: 'primary',
                variant: 'tonal',
                style: 'font-family: Poppins, sans-serif;',
            },
            VSlider: {
                color: 'primary',
                trackColor: 'outline',
                thumbSize: 20,
                trackSize: 8,
            },
            VList: {
                rounded: 'xl',
                style: 'font-family: Poppins, sans-serif;',
            },
            VListItem: {
                rounded: 'xl',
            },
            VSelect: {
                color: 'primary',
                rounded: 'xl',
                variant: 'outlined',
                style: 'font-family: Poppins, sans-serif;',
            },
            VCardActions: {
                VBtn: {
                    height: 55,
                    variant: 'flat',
                    rounded: 'xl',
                    style: 'text-transform: none; font-weight: 600; font-family: Poppins, sans-serif;',
                }
            }
        },
    })
    app.vueApp.use(vuetify)
})
