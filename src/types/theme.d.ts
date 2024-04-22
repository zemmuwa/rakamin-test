import type { Color, TypeText } from '@mui/material'
import '@mui/material/styles'


declare module '@mui/material/styles' {
	export interface TypographyVariants {
		textS: React.CSSProperties
		textM: React.CSSProperties
		textXl: React.CSSProperties
	}

	// allow configuration using `createTheme`
	interface TypographyVariantsOptions {
		textS?: React.CSSProperties
		textM?: React.CSSProperties
		textXl?: React.CSSProperties
	}
	interface TypeText {
		tertiary?: string
	}
}
import '@mui/material/Typography'
// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
	interface TypographyPropsVariantOverrides {
		textS: true
		textM: true
		textXl: true
	}
}
