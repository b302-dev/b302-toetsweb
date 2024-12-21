import {ChangeEvent, FunctionComponent, useContext, useEffect, useState} from 'react'
import TextArea from './TextArea'
import HorizontalCheckbox from './HorizontalCheckbox'
import Button from './Button'
import Toetstaken from '../../assets/images/IllustratieToetstaken.svg'
import Toetsprogramma from '../../assets/images/IllustratieToetsprogramma.svg'
import Toetsorganisatie from '../../assets/images/IllustratieToetsorganisatie.svg'
import Toetsbeleid from '../../assets/images/IllustratieToetsbeleid.svg'
import Toetsbekwaamheid from '../../assets/images/IllustratieToetsbekwaamheid.svg'
import ProgressDots from './ProgressDots'
import {Portal} from './Portal'
import {ScanAnswer} from "../../models/ScanAnswer";
import {ScanDataContext} from "../../utils/contexts/ScanDataContext";
import {useTranslation} from "react-i18next";
import {PhaseArray} from "../../models/Phase";

interface Props {
	color: string
	entityIndex: number
	elementIndex: number
	handleNext: () => void
	handlePrevious: () => void
}

const ScanCard: FunctionComponent<Props> = (props) => {
	const {t} = useTranslation();
	const {getScanAnswer, setScanAnswer} = useContext(ScanDataContext);

	const [scanData, setScanData] = useState<ScanAnswer>(getScanAnswer(props.entityIndex, props.elementIndex));

	useEffect(() => {
		setScanData(getScanAnswer(props.entityIndex, props.elementIndex));
	}, [props.entityIndex, props.elementIndex]);

	const changeAnswer = (answer: ScanAnswer) => {
		setScanAnswer(props.entityIndex, props.elementIndex, answer);
		setScanData(answer);
	}

	const images = [
		Toetstaken,
		Toetsprogramma,
		Toetsbeleid,
		Toetsorganisatie,
		Toetsbekwaamheid,
	]

	const handleCheckedPositie = (checkedPosition: number) => {
		changeAnswer({...scanData, checkedPosition});
	}

	const handleCheckedAmbitie = (checkedAmbition: number) => {
		changeAnswer({...scanData, checkedAmbition});
	}

	const handleComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
		changeAnswer({...scanData, [e.target.name]: e.target.value});
	}

	return (
		<div
			className={'scancard'}
			style={{borderTop: `1rem solid ${props.color}`}}
		>
			<div className="scancard__grid">
				<div>
					<div className="scancard__titles">
						<span style={{color: props.color}}>
							<Portal trigger={<h3>{t(`entities.${props.entityIndex}.name`)} </h3>}>
								<div className="toetsmodel-component__popup">
									<h4>{t(`entities.${props.entityIndex}.name`)}</h4>
									<p>{t(`entities.${props.entityIndex}.description`)}</p>
								</div>
							</Portal>
							<h3>- {t(`elements.${props.elementIndex}.name`)}</h3>
						</span>

						<span className="scancard__titles__container">
							<h4>{t('pages.scan.position.name')}</h4>
							<p className={'scancard__titles__container__subtitle'}>
								- {t('pages.scan.position.question')}
							</p>
						</span>
						<span
							className={'scancard__titles__container'}
							style={{backgroundColor: `${props.color}2D`}}
						>
							<h4>{t('pages.scan.ambition.name')}</h4>
							<p className={'scancard__titles__container__subtitle'}>
								- {t('pages.scan.ambition.question')}
							</p>
						</span>
					</div>
					<form className="scancard__grid__form">
						<div className="scancard__grid__form__checkbox">
							<div className="hor-check">
								<div className="hor-check__container">
									<p className="hor-check__container__label">
										{t('pages.scan.position.name')}
									</p>
								</div>
								<div
									className={'hor-check__container'}
									style={{backgroundColor: `${props.color}2D`}}
								>
									<p className="hor-check__container__label">
										{t('pages.scan.ambition.name')}
									</p>
								</div>
							</div>
							{
								PhaseArray.map((phase) => (
									<HorizontalCheckbox
										key={phase}
										checkedPositie={scanData.checkedPosition}
										handleCheckedPositie={handleCheckedPositie}
										checkedAmbitie={scanData.checkedAmbition}
										handleCheckedAmbitie={handleCheckedAmbitie}
										position={phase}
										rowText={t(`entities.${props.entityIndex}.elements.${props.elementIndex}.phases.${phase}.description`)}
										backgroundColor={`${props.color}2D`}
									/>
								))
							}
						</div>
					</form>
				</div>
				<img
					className="scancard__grid__illustration"
					src={images[props.entityIndex]}
					alt="illustratieve afbeelding"
				/>
			</div>
			<div className="scancard__textarea-container">
				<TextArea
					value={scanData.commentPosition}
					setValue={handleComment}
					titleTextArea={t('pages.scan.position.name')}
					name={'commentPosition'}
					hintTextArea={t('pages.scan.comment')}
				/>
				<TextArea
					value={scanData.commentAmbition}
					setValue={handleComment}
					titleTextArea={t('pages.scan.ambition.name')}
					name={'commentAmbition'}
					hintTextArea={t('pages.scan.comment')}
				/>
			</div>
			<div className="scancard__progress">
				<Button
					backgroundColor={props.color}
					onClick={props.handlePrevious}
					disabled={props.entityIndex === 0 && props.elementIndex === 0}
				>
					<span>
						<p>{t('pages.scan.previous')}</p>
					</span>
				</Button>
				<ProgressDots
					color={props.color}
					currentStep={props.elementIndex + 1}
					totalSteps={3}
				/>
				<Button backgroundColor={props.color} onClick={props.handleNext}>
					<span>
						<p>
							{t(`pages.scan.${props.entityIndex === 4 && props.elementIndex === 2 ? 'submit' : 'next'}`)}
						</p>
					</span>
				</Button>
			</div>
		</div>
	)
}

export default ScanCard
