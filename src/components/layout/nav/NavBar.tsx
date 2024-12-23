import {useContext} from 'react'
import NavItem from './NavItem'
import {LanguageContext} from '../../../utils/contexts/LanguageContext'
import {Language} from '../../../models/Locale'
import flagDutch from '../../../assets/icons/flag-dutch.svg'
import flagEnglish from '../../../assets/icons/flag-english.svg'
import {ScanDataContext} from '../../../utils/contexts/ScanDataContext'
import {useTranslation} from "react-i18next";
import {LocalButtonAnchor} from "../ButtonAnchor";

const NavBar = () => {
	const {t, i18n} = useTranslation();
	const {changeLanguage} = useContext(LanguageContext);
	const {anyEntityFilledIn} = useContext(ScanDataContext);

	const handleChangeLanguage = () => {
		switch (i18n.language) {
			case Language.NL:
				changeLanguage(Language.EN);
				break
			case Language.EN:
				changeLanguage(Language.NL);
				break
			default:
				break;
		}
	}

	return (
		<nav className={'navbar'}>
			<div className={'navbar__content'}>
				<LocalButtonAnchor to={''} variant={'styless'}>
					<div className={'navbar__container'}>
						<h1>{t('title')}</h1>
					</div>
				</LocalButtonAnchor>

				<div className="navbar__content--right">
					<LocalButtonAnchor to={''} className={'p-0'} variant={'styless'}>
						<NavItem item={t('pages.home.title')} color={'purple'}/>
					</LocalButtonAnchor>

					<LocalButtonAnchor to={'scan'} className={'p-0'} variant={'styless'}>
						<NavItem item={t('pages.scan.title')} color={'orange'}/>
					</LocalButtonAnchor>

					{anyEntityFilledIn && (
						<LocalButtonAnchor to={'result'} className={'p-0'} variant={'styless'}>
							<NavItem item={t('pages.result.title')} color={'green'}/>
						</LocalButtonAnchor>
					)}

					<button
						className="navlink navlink--white cursor-pointer unselectable nobutton"
						onClick={handleChangeLanguage}
					>
						{i18n.language === Language.NL ? (
							<img src={flagEnglish} alt={'EN'} height={33}/>
						) : (
							<img src={flagDutch} alt={'NL'} height={33}/>
						)}
					</button>
				</div>
			</div>
		</nav>
	)
}

export default NavBar
