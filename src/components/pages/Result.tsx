import {useContext, useMemo} from 'react'
import Button from '../layout/Button'
import {useTitle} from '../../utils/hooks/TitleHook'
import {LanguageContext} from '../../utils/contexts/LanguageContext'
import Page from '../Page'
import Card from '../layout/Card'
import AssignmentModel from '../layout/toetsmodel/AssignmentModel'
import {getPhaseOfSelectId} from '../../models/Phase'
import {ScanDataContext} from '../../utils/contexts/ScanDataContext'
import {EntityArray} from "../../models/Entity";
import {ElementArray} from "../../models/Element";
import {SvgToPng} from "../../utils/SvgConverter";
import downloadFile from "../../utils/FileDownloader";
import JSZip from "jszip";

enum AnswerTypes {
	POSITION_RESULT = 'checkedPosition',
	POSITION_FEEDBACK = 'feedbackPosition',
	AMBITION_RESULT = 'checkedAmbition',
	AMBITION_FEEDBACK = 'feedbackAmbition',
}

const Result = () => {
	const {language, getTranslation} = useContext(LanguageContext)
	const {scanData: entities, entityFilledIn, anyEntityFilledIn} = useContext(ScanDataContext)

	useTitle(`${getTranslation('nav.title')} - ${getTranslation('nav.result')}`)

	useMemo(() => {
		if (!anyEntityFilledIn) window.location.href = '/scan';
	}, [anyEntityFilledIn])

	const getResult = (
		answerType: AnswerTypes,
		entity: number,
		element: number,
	) => {
		const answer = JSON.parse(
			window.localStorage.getItem(`${entity}.${element}`) as string,
		)
		return answer[answerType]
	}

	const downloadAdviceBooklet = () => {
		// 	const localeEntities = getEntities(language)
		// 	const localeEntityPhaseAdvice = getEntityPhaseAdvice(language)
		//
		// 	const doc = new jsPDF()
		//
		// 	const resultData = getResultData(AnswerTypes.POSITION_RESULT, getResult)
		//
		// 	let currentY = 30
		//
		// 	for (let i = 0; i < resultData.length; i++) {
		// 		const entityIndex = i
		// 		const phaseIndex = resultData[i]
		//
		// 		const entity = localeEntities[i]
		// 		const advice = localeEntityPhaseAdvice[entityIndex][phaseIndex]
		//
		// 		// add title
		// 		doc.setFontSize(16)
		// 		doc.setFont('helvetica', 'bold')
		// 		doc.text(entity, 20, 20)
		//
		// 		// add text
		// 		doc.setFontSize(10)
		// 		doc.setFont('helvetica', 'normal')
		//
		// 		const cleanedText = advice.split('\n').map((e) => e.trim())
		//
		// 		for (const line of cleanedText) {
		// 			const textLines = doc.splitTextToSize(line, 170)
		// 			doc.text(textLines, 20, currentY)
		// 			currentY = currentY + doc.getTextDimensions(textLines).h
		//
		// 			if (currentY > doc.internal.pageSize.height - 50) {
		// 				currentY = 30
		// 				doc.addPage()
		// 			}
		// 		}
		//
		// 		if (i < resultData.length - 1) {
		// 			currentY = 30
		// 			doc.addPage()
		// 		}
		// 	}
		//
		// 	doc.save('advies.pdf')
	}

	const resetScan = () => {
		window.localStorage.clear();
		window.location.href = '/scan';
	}

	const downloadResults = async () => {
		const zip = new JSZip()
		let fileData = ''

		entities.forEach((entity, entityIndex) => {
			if (!entityFilledIn(entityIndex)) return

			fileData += `${entity.name}\n`
			entity.elements.forEach((element, elementIndex) => {
				fileData += `${element.name}\n`
				fileData += `${getTranslation('position')}: ${
					element.phases[
						getResult(AnswerTypes.POSITION_RESULT, entityIndex, elementIndex)
						].description
				}\n`
				fileData += `${getTranslation('results.positionexplanation')}: ${
					getResult(AnswerTypes.POSITION_FEEDBACK, entityIndex, elementIndex) ||
					getTranslation('results.notfilledin')
				}\n`
				fileData += `${getTranslation('ambition')}: ${
					element.phases[
						getResult(AnswerTypes.AMBITION_RESULT, entityIndex, elementIndex)
						].description
				}\n`
				fileData += `${getTranslation('results.ambitionexplanation')}: ${
					getResult(AnswerTypes.AMBITION_FEEDBACK, entityIndex, elementIndex) ||
					getTranslation('results.notfilledin')
				}\n\n`
			})
			fileData += '\n'
		})

		zip.file(`${getTranslation('nav.result')}.txt`, fileData)
		Promise.all(
			Array.from(document.querySelectorAll('.assignment-model'))
				.map((svg) => SvgToPng(svg))
		).then(([position, ambition]) => {
			zip.file(
				`${getTranslation('position')}.png`,
				position.replace(/^data:image\/(png|jpg);base64,/, ''),
				{base64: true},
			)
			zip.file(
				`${getTranslation('ambition')}.png`,
				ambition.replace(/^data:image\/(png|jpg);base64,/, ''),
				{base64: true},
			)

			zip.generateAsync({type: 'blob'}).then((content) => {
				downloadFile(content, `${getTranslation('nav.result')}.zip`)
			})
		})
	}

	const getResultData = (answerType: AnswerTypes) => {
		return EntityArray.map((entity) => {
			if (!entityFilledIn(entity)) return -1;
			const subResults = ElementArray.map((element) => getResult(answerType, entity, element));
			return getPhaseOfSelectId(subResults.join(''));
		});
	}

	return (
		<Page className="result">
			<header className={'section'}>
				<h1>{getTranslation('nav.result')}</h1>
				<p>{getTranslation('results.explanation.part1')}</p>
				<p>{getTranslation('results.explanation.part2')}</p>
				<p>{getTranslation('results.explanation.part3')}</p>
				<p>{getTranslation('results.explanation.part4')}</p>
			</header>

			<main>
				<div className={'result__container result__subtitle'}>
					<h1 className={'result__container--item'}>
						{getTranslation('position')}
					</h1>
					<h1 className={'result__container--item'}>
						{getTranslation('ambition')}
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
					{getTranslation('home.modelExplained')}
				</p>

				{entities.map((entity, entityIndex) => {
					const color = entity.color
					const explanation = getTranslation('explanation')


					if (!entityFilledIn(entityIndex)) return null;

					return (
						<div key={entity.name} className={'result__container'}>
							<Card className={'result__container--item'}>
								<h3 style={{color: color}}>{entity.name}</h3>
								{entity.elements.map((element, elementIndex) => {
									return (
										<div key={element.name}>
											<h2 style={{color: color}}>{element.name}</h2>
											<p>
												{
													element.phases[
														getResult(
															AnswerTypes.POSITION_RESULT,
															entityIndex,
															elementIndex,
														)
														].description
												}
											</p>
											<p>
												{explanation}:{' '}
												<i>
													{getResult(
														AnswerTypes.POSITION_FEEDBACK,
														entityIndex,
														elementIndex,
													) || getTranslation('results.notfilledin')}
												</i>
											</p>
											<br/>
										</div>
									)
								})}
							</Card>
							<Card className={'result__container--item'}>
								<h3 style={{color: color}}>{entity.name}</h3>
								{entity.elements.map((element, elementIndex) => {
									return (
										<div key={element.name}>
											<h2 style={{color: color}}>{element.name}</h2>
											<p>
												{
													element.phases[
														getResult(
															AnswerTypes.AMBITION_RESULT,
															entityIndex,
															elementIndex,
														)
														].description
												}
											</p>
											<p>
												{explanation}:{' '}
												<i>
													{getResult(
														AnswerTypes.AMBITION_FEEDBACK,
														entityIndex,
														elementIndex,
													) || getTranslation('results.notfilledin')}
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
				<div className="result__download-button">
					<Button onClick={downloadResults} backgroundColor={entities[0].color}>
						<span>
							<p>{getTranslation('results.downloadresults')}</p>
						</span>
					</Button>
				</div>

				<div className="result__download-button">
					<Button onClick={downloadAdviceBooklet} backgroundColor={entities[0].color}>
						<div data-tooltip-id={'downloadAdviceBooklet'}>
							<span>
								<p>{getTranslation('results.downloadadvice')}</p>
							</span>
						</div>
					</Button>
				</div>

				<div className="result__download-button">
					<Button onClick={resetScan} backgroundColor={entities[0].color}>
						<span>
							<p>{getTranslation('results.resetscan')}</p>
						</span>
					</Button>
				</div>
			</footer>
		</Page>
	)
}

export default Result
