import {useContext} from 'react'
import NavItem from './NavItem'
import {LanguageContext} from '../../../utils/contexts/LanguageContext'
import {Language} from '../../../utils/Localization'
import flagDutch from '../../../assets/icons/flag-dutch.svg'
import flagEnglish from '../../../assets/icons/flag-english.svg'
import {ScanDataContext} from '../../../utils/contexts/ScanDataContext'
import {useTranslation} from "react-i18next";
import ButtonAnchor from "../ButtonAnchor";

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
				<ButtonAnchor to={''} variant={'styless'}>
					<div className={'navbar__container'}>
						<h1>{t('title')}</h1>
					</div>
				</ButtonAnchor>

				<div className="navbar__content--right">
					<ButtonAnchor to={''} className={'p-0'} variant={'styless'}>
						<NavItem item={t('pages.home.title')} color={'purple'}/>
					</ButtonAnchor>

					<ButtonAnchor to={'scan'} className={'p-0'} variant={'styless'}>
						<NavItem item={t('pages.scan.title')} color={'orange'}/>
					</ButtonAnchor>

					{anyEntityFilledIn() && (
						<ButtonAnchor to={'result'} className={'p-0'} variant={'styless'}>
							<NavItem item={t('pages.result.title')} color={'green'}/>
						</ButtonAnchor>
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
