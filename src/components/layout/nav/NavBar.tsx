import { useContext, useEffect, useState } from 'react'
import { NavLink as ReactRouterNavLink } from 'react-router-dom'
import NavItem from './NavItem'
import { LanguageContext } from '../../../utils/contexts/LanguageContext'
import { Language } from '../../../utils/Localization'
import flagDutch from '../../../assets/icons/flag-dutch.svg'
import flagEnglish from '../../../assets/icons/flag-english.svg'
import { ScanDataContext } from '../../../utils/contexts/ScanDataContext'
import {useTranslation} from "react-i18next";

const NavBar = () => {
	const { i18n } = useTranslation();
	const { language, changeLanguage, getTranslation } =
		useContext(LanguageContext)
	const { scanData: entities } = useContext(ScanDataContext)

	const [answer, setAnswer] = useState<any>([])

	useEffect(() => {
		entities.forEach((entity, entityIndex) => {
			entity.elements.forEach((element, elementIndex) => {
				setAnswer(window.localStorage.getItem(`${entityIndex}.${elementIndex}`))
			})
		})
	}, [entities])

	const handleChangeLanguage = () => {
		if (language === Language.NL) changeLanguage(Language.EN)
		if (language === Language.EN) changeLanguage(Language.NL)

		if (language === Language.NL) i18n.changeLanguage('en')
		if (language === Language.EN) i18n.changeLanguage('nl')
	}

	return (
		<nav className={'navbar'}>
			<div className={'navbar__content'}>
				<ReactRouterNavLink to={''}>
					<div className={'navbar__container'}>
						<h1>{getTranslation('nav.title')}</h1>
					</div>
				</ReactRouterNavLink>

				<div className="navbar__content--right">
					<ReactRouterNavLink to={''}>
						<NavItem item={getTranslation('nav.home')} color={'purple'} />
					</ReactRouterNavLink>

					<ReactRouterNavLink to={'scan'}>
						<NavItem item={getTranslation('nav.scan')} color={'orange'} />
					</ReactRouterNavLink>

					{answer && (
						<ReactRouterNavLink to={'result'}>
							<NavItem item={getTranslation('nav.result')} color={'green'} />
						</ReactRouterNavLink>
					)}

					<button
						className="navlink navlink--white cursor-pointer unselectable nobutton"
						onClick={handleChangeLanguage}
					>
						{language === Language.NL ? (
							<img src={flagEnglish} alt={'EN'} height={33} />
						) : (
							<img src={flagDutch} alt={'NL'} height={33} />
						)}
					</button>
				</div>
			</div>
		</nav>
	)
}

export default NavBar
