import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Material 3 Expressive Theme Colors
const customTheme = {
    dark: false,
    colors: {
        primary: '#18181B', // Zinc 900
        'primary-darken-1': '#09090B',
        secondary: '#E57373',
        'secondary-darken-1': '#D32F2F',
        tertiary: '#FF9800',
        accent: '#27272A',
        surface: '#FFFFFF',
        'surface-variant': '#F4F4F5',
        'surface-container': '#FFFFFF',
        'surface-container-low': '#FAFAFA',
        'surface-container-high': '#E4E4E7',
        background: '#FAFAFA', // Zinc 50
        error: '#EF4444',
        success: '#10B981',
        warning: '#F59E0B',
        info: '#3B82F6',
        savings: '#F59E0B',
        'on-primary': '#FFFFFF',
        'on-secondary': '#FFFFFF',
        'on-surface': '#09090B',
        'on-background': '#09090B',
        outline: '#A1A1AA',
        'outline-variant': '#E4E4E7',
    },
    variables: {
        'border-color': '#E4E4E7',
        'border-opacity': 1,
        'high-emphasis-opacity': 0.9,
        'medium-emphasis-opacity': 0.7,
        'disabled-opacity': 0.4,
    }
}

const darkTheme = {
    dark: true,
    colors: {
        primary: '#FAFAFA', // Zinc 50
        'primary-darken-1': '#F4F4F5',
        secondary: '#EF9A9A',
        'secondary-darken-1': '#E57373',
        tertiary: '#FFB74D',
        accent: '#E4E4E7',
        surface: '#09090B', // Zinc 950
        'surface-variant': '#27272A',
        'surface-container': '#18181B', // Zinc 900
        'surface-container-low': '#09090B',
        'surface-container-high': '#27272A',
        background: '#09090B', // Zinc 950
        error: '#F87171',
        success: '#34D399',
        warning: '#FBBF24',
        info: '#60A5FA',
        savings: '#FBBF24',
        'on-primary': '#18181B',
        'on-secondary': '#3E2723',
        'on-surface': '#FAFAFA',
        'on-background': '#FAFAFA',
        outline: '#71717A',
        'outline-variant': '#27272A',
    },
    variables: {
        'border-color': '#71717A',
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
