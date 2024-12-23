import {useContext, useMemo} from 'react'
import {useTitle} from '../../utils/hooks/TitleHook'
import Page from '../Page'
import Card from '../layout/Card'
import AssignmentModel from '../layout/toetsmodel/AssignmentModel'
import {EntityArray, entityColors} from "../../models/Entity";
import Button from "../layout/Button";
import {usePDF} from "@react-pdf/renderer";
import ResultsDocument from "../documents/ResultsDocument";
import AdviceDocument from "../documents/AdviceDocument";
import {getResultFromAnswer} from "../../utils/ScanUtils";
import {ExternalButtonAnchor} from "../layout/ButtonAnchor";
import {useTranslation} from "react-i18next";
import {ElementArray} from "../../models/Element";
import {ScanDataContext} from "../../utils/contexts/ScanDataContext";

enum AnswerTypes {
	POSITION_RESULT = 'checkedPosition',
	POSITION_FEEDBACK = 'commentPosition',
	AMBITION_RESULT = 'checkedAmbition',
	AMBITION_FEEDBACK = 'commentAmbition',
}

const Result = () => {
	const {t} = useTranslation();
	const [resultsInstance, _updateResultsInstance] = usePDF({document: <ResultsDocument/>});
	const [adviceInstance, _updateAdviceInstance] = usePDF({document: <AdviceDocument/>});
	const {anyEntityFilledIn, entityFilledIn,} = useContext(ScanDataContext);

	useTitle(`${t('title')} - ${t('pages.result.title')}`);

	useMemo(() => {
		if (!anyEntityFilledIn) window.location.href = '/scan';
	}, [anyEntityFilledIn]);

	const getResult = (
		answerType: AnswerTypes,
		entity: number,
		element: number,
	) => {
		const answer = JSON.parse(window.localStorage.getItem(`${entity}.${element}`) as string);
		return answer[answerType];
	}

	const resetScan = () => {
		window.localStorage.clear();
		window.location.href = '/scan';
	}

	const getResultData = (answerType: AnswerTypes) => {
		return EntityArray.map(entity => getResultFromAnswer(entity, answerType as 'checkedPosition' | 'checkedAmbition'));
	}

	return (
		<Page className="result">
			<header className={'section'}>
				{(t('pages.result.explanation', {returnObjects: true}) as string[]).map(text => (
					<p key={text}>{text}</p>
				))}
			</header>

			<main>
				<div className={'result__container result__subtitle'}>
					<h1 className={'result__container--item'}>
						{t('pages.scan.position.name')}
					</h1>
					<h1 className={'result__container--item'}>
						{t('pages.scan.ambition.name')}
					</h1>
				</div>

				<div className={'result__container'}>
					<div className={'result__container--item'}>
						<AssignmentModel results={getResultData(AnswerTypes.POSITION_RESULT)}/>
					</div>
					<div className={'result__container--item'}>
						<AssignmentModel results={getResultData(AnswerTypes.AMBITION_RESULT)}/>
					</div>
				</div>

				<p className={'result__model-explanation'}>
					{t('pages.home.modelSubText')}
				</p>

				{EntityArray.map(entity => {
					if (!entityFilledIn(entity)) return null;

					return (
						<div key={entity} className={'result__container'}>
							<Card className={'result__container--item'}>
								<h3 style={{color: entityColors[entity]}}>{t(`entities.${entity}.name`)}</h3>
								{ElementArray.map(element => {
									return (
										<div key={element}>
											<h2 style={{color: entityColors[entity]}}>{t(`elements.${element}.name`)}</h2>
											<p>{t(`entities.${entity}.elements.${element}.phases.${getResult(AnswerTypes.POSITION_RESULT, entity, element)}.description`)}</p>
											<p>
												{t('pages.result.comment.position')}:{' '}
												<i>
													{getResult(
														AnswerTypes.POSITION_FEEDBACK,
														entity,
														element,
													) || t('pages.result.notFilledIn')}
												</i>
											</p>
											<br/>
										</div>
									)
								})}
							</Card>
							<Card className={'result__container--item'}>
								<h3 style={{color: entityColors[entity]}}>{t(`entities.${entity}.name`)}</h3>
								{ElementArray.map(element => {
									return (
										<div key={element}>
											<h2 style={{color: entityColors[entity]}}>{t(`elements.${element}.name`)}</h2>
											<p>{t(`entities.${entity}.elements.${element}.phases.${getResult(AnswerTypes.AMBITION_RESULT, entity, element)}.description`)}</p>
											<p>
												{t('pages.result.comment.ambition')}:{' '}
												<i>
													{getResult(
														AnswerTypes.AMBITION_FEEDBACK,
														entity,
														element,
													) || t('pages.result.notFilledIn')}
												</i>
											</p>
											<br/>
										</div>
									)
								})}
							</Card>
						</div>
					)
				})}
			</main>

			<footer className="result__download-container">
				<ExternalButtonAnchor href={resultsInstance.url ?? undefined} download={"results.pdf"}>
					{t('pages.result.download.results')}
				</ExternalButtonAnchor>

				<ExternalButtonAnchor href={adviceInstance.url ?? undefined} download={"advice.pdf"}>
					{t('pages.result.download.advice')}
				</ExternalButtonAnchor>

				<Button onClick={resetScan} variant={"primary"}>
					{t('pages.result.reset')}
				</Button>
			</footer>
		</Page>
	)
}

export default Result;
