import { useContext } from 'react'
import { NavLink as ReactRouterNavLink } from 'react-router-dom'
import NavItem from './NavItem'
import { LanguageContext } from '../../../utils/contexts/LanguageContext'
import { Language } from '../../../utils/Localization'
import flagDutch from '../../../assets/icons/flag-dutch.svg'
import flagEnglish from '../../../assets/icons/flag-english.svg'
import { ScanDataContext } from '../../../utils/contexts/ScanDataContext'
import {useTranslation} from "react-i18next";

const NavBar = () => {
	const { t, i18n } = useTranslation();
	const { changeLanguage} = useContext(LanguageContext);
	const { anyEntityFilledIn } = useContext(ScanDataContext);

	const handleChangeLanguage = () => {
		switch (i18n.language) {
			case Language.NL:
				changeLanguage(Language.EN);
				i18n.changeLanguage(Language.EN);
				break
			case Language.EN:
				changeLanguage(Language.NL);
				i18n.changeLanguage(Language.NL);
				break
			default:
				break;
		}
	}

	return (
		<nav className={'navbar'}>
			<div className={'navbar__content'}>
				<ReactRouterNavLink to={''}>
					<div className={'navbar__container'}>
						<h1>{t('title')}</h1>
					</div>
				</ReactRouterNavLink>

				<div className="navbar__content--right">
					<ReactRouterNavLink to={''}>
						<NavItem item={t('pages.home.title')} color={'purple'} />
					</ReactRouterNavLink>

					<ReactRouterNavLink to={'scan'}>
						<NavItem item={t('pages.scan.title')} color={'orange'} />
					</ReactRouterNavLink>

					{anyEntityFilledIn() && (
						<ReactRouterNavLink to={'result'}>
							<NavItem item={t('pages.result.title')} color={'green'} />
						</ReactRouterNavLink>
					)}

					<button
						className="navlink navlink--white cursor-pointer unselectable nobutton"
						onClick={handleChangeLanguage}
					>
						{i18n.language === Language.NL ? (
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
