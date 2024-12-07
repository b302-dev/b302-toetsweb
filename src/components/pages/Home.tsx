import React, {useContext} from 'react'

import Toetstaken from '../../assets/images/IllustratieToetstaken.svg'
import ArrowIcon from '../../assets/icons/arrow.svg'
import {NavLink as ReactRouterNavLink} from 'react-router-dom'
import Colofon from '../layout/footer/Colofon'
import {LanguageContext} from '../../utils/contexts/LanguageContext'
import AssignmentModel from '../layout/toetsmodel/AssignmentModel'
import {useTitle} from '../../utils/hooks/TitleHook'
import Page from '../Page'

const Home = () => {
    const {getTranslation} = useContext(LanguageContext)
    useTitle(getTranslation('nav.title'))

    return (
        <Page>
            <div className={'home-page'}>
                <div className="home-page__hero-section">
                    <div>
                        <h1>{getTranslation('home.heroTitle')}</h1>
                        <br/>
                        <p className={'home-page__hero-section__subtitle'}>
                            {getTranslation('home.heroSubtitle')}
                        </p>
                    </div>
                    <div className={'home-page__hero-section__toetsmodel'}>
                        <AssignmentModel/>
                        <p className={'home-page__model-explanation'}>
                            {getTranslation('home.modelExplained')}
                        </p>
                    </div>
                </div>

                <div className="home-page__blur"></div>

                <div className="home-page__info-section">
                    <section className={'section card'}>
                        <h3>{getTranslation('home.assessmentQualityTitle')}</h3>
                        <p>{getTranslation('home.assessmentQualityText')}</p>
                    </section>

                    <section className={'section card'}>
                        <h3>{getTranslation('home.assessmentExplainedTitle')}</h3>
                        <p>{getTranslation('home.assessmentExplainedText')}</p>
                    </section>
                </div>

                <div className="home-page__extra-info">
                    <div className="home-page__extra-info__text">
                        <section className={'section'}>
                            <h3>{getTranslation('home.entities.title')}</h3>
                            <div>
                                <p>{getTranslation('home.entities.text.part1')}</p>
                                <p>{getTranslation('home.entities.text.part2')}</p>
                                <p>{getTranslation('home.entities.text.part3')}</p>
                            </div>
                            <p className={'m-top-1'}>
                                {getTranslation('home.entities.text.readmore')}<a className={'a'}
                                                                                  href={'https://www.han.nl/artikelen/2021/03/het-toetsweb-duurzame-kwaliteit-van-toetsing/'}>
                                {getTranslation('home.entities.text.link')}
                            </a>
                            </p>
                        </section>

                        <section className={'section'}>
                            <h3>{getTranslation('home.startscan.title')}</h3>
                            <p>{getTranslation('home.startscan.text')}</p>
                            <ReactRouterNavLink to={'scan'}>
								<span className="home-page__scan-button">
									<p>{getTranslation('home.startscan.button')}</p>
									<img src={ArrowIcon} alt="pijl naar rechts"/>
								</span>
                            </ReactRouterNavLink>
                        </section>
                    </div>
                    <div className="home-page__extra-info__image">
                        <img src={Toetstaken} alt="Illustratie Toets(tak)en"/>
                    </div>
                </div>
                <section className={'section developers'}>
                    <h3 className={'developers__title'}>
                        {getTranslation('developers.title')}
                    </h3>
                    <p>{getTranslation('developers.text')}</p>
                </section>
            </div>
            <Colofon/>
        </Page>
    )
}

export default Home
