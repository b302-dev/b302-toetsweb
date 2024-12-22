import { createContext, FunctionComponent, useEffect, useState } from 'react'
import { getLocaleTranslation, Language } from '../Localization'
import {useTranslation} from "react-i18next";

export const LanguageContext = createContext({
	language: Language.NL,
	changeLanguage: (newLanguage: Language) => {},
	getTranslation: (key: string) => key,
})

interface Props {
	children: any
}

export const LanguageProvider: FunctionComponent<Props> = ({ children }) => {
	const [language, setLanguage] = useState<Language>(Language.NL)
	const { i18n } = useTranslation();

	useEffect(() => {
		const localLanguage = window.localStorage.getItem('language')
		if (localLanguage) {
			i18n.changeLanguage(localLanguage);
			setLanguage(localLanguage as Language)
			return
		}
		const browserLanguage = navigator.language.split('-')[0]
		i18n.changeLanguage(browserLanguage);
		setLanguage(browserLanguage as Language)
	}, [])

	const changeLanguage = (newLanguage: Language): void => {
		i18n.changeLanguage(newLanguage);
		setLanguage(newLanguage)
		document.documentElement.lang = newLanguage
		window.localStorage.setItem('language', newLanguage)
	}

	const getTranslation = (key: string): string => {
		return getLocaleTranslation(language, key)
	}

	return (
		<LanguageContext.Provider
			value={{ language, changeLanguage, getTranslation }}
		>
			{children}
		</LanguageContext.Provider>
	)
}
