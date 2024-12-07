import { useContext, useMemo } from 'react'
import Button from '../layout/Button'
import downloadFile from '../../utils/FileDownloader'
import JSZip from 'jszip'
import { jsPDF } from 'jspdf'
import { useTitle } from '../../utils/hooks/TitleHook'
import { LanguageContext } from '../../utils/contexts/LanguageContext'
import Page from '../Page'
import Card from '../layout/Card'
import AssignmentModel from '../layout/toetsmodel/AssignmentModel'
import { getPhaseOfSelectId } from '../../models/Phase'
import { ScanDataContext } from '../../utils/contexts/ScanDataContext'
import { getEntities, getEntityPhaseAdvice } from '../../utils/Localization'

const saveAs = require('save-svg-as-png')

enum AnswerTypes {
	POSITION_RESULT = 'checkedPositie',
	POSITION_FEEDBACK = 'feedbackPositie',
	AMBITION_RESULT = 'checkedAmbitie',
	AMBITION_FEEDBACK = 'feedbackAmbitie',
}

const Result = () => {
	const { language, getTranslation } = useContext(LanguageContext)
	const { scanData: entities } = useContext(ScanDataContext)

	useTitle(`${getTranslation('nav.title')} - ${getTranslation('nav.result')}`)

	useMemo(() => {
		entities.forEach((entity, entityIndex) => {
			entity.elements.forEach((element, elementIndex) => {
				const rawAnswer = window.localStorage.getItem(
					`${entityIndex}.${elementIndex}`,
				)
				const answer = JSON.parse(rawAnswer as string)

				if (rawAnswer === null) {
					window.location.href = '/scan'
				}

				if (answer.checkedPositie === -1 || answer.checkedAmbitie === -1) {
					window.location.href = '/scan'
				}
			})
		})
	}, [entities])

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
		const localeEntities = getEntities(language)
		const localeEntityPhaseAdvice = getEntityPhaseAdvice(language)

		const doc = new jsPDF()

		const resultData = getResultData(AnswerTypes.POSITION_RESULT, getResult)

		let currentY = 30

		for (let i = 0; i < resultData.length; i++) {
			const entityIndex = i
			const phaseIndex = resultData[i]

			const entity = localeEntities[i]
			const advice = localeEntityPhaseAdvice[entityIndex][phaseIndex]

			// add title
			doc.setFontSize(16)
			doc.setFont('helvetica', 'bold')
			doc.text(entity, 20, 20)

			// add text
			doc.setFontSize(10)
			doc.setFont('helvetica', 'normal')

			const cleanedText = advice.split('\n').map((e) => e.trim())

			for (const line of cleanedText) {
				const textLines = doc.splitTextToSize(line, 170)
				doc.text(textLines, 20, currentY)
				currentY = currentY + doc.getTextDimensions(textLines).h

				if (currentY > doc.internal.pageSize.height - 50) {
					currentY = 30
					doc.addPage()
				}
			}

			if (i < resultData.length - 1) {
				currentY = 30
				doc.addPage()
			}
		}

		doc.save('advies.pdf')
	}

	const resetScan = () => {
		window.localStorage.clear()
		window.location.href = '/scan'
	}

	const downloadResults = () => {
		const zip = new JSZip()
		let fileData = ''

		entities.forEach((entity, entityIndex) => {
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
			Array.from(document.querySelectorAll('.assignment-model')).map((svg) =>
				saveAs.svgAsPngUri(svg),
			),
		).then(([position, ambition]) => {
			zip.file(
				`${getTranslation('position')}.png`,
				position.replace(/^data:image\/(png|jpg);base64,/, ''),
				{ base64: true },
			)
			zip.file(
				`${getTranslation('ambition')}.png`,
				ambition.replace(/^data:image\/(png|jpg);base64,/, ''),
				{ base64: true },
			)

			zip.generateAsync({ type: 'blob' }).then((content) => {
				downloadFile(content, `${getTranslation('nav.result')}.zip`)
			})
		})
	}

	const getResultData = (
		answerType: AnswerTypes,
		getResult: (
			answerType: AnswerTypes,
			entity: number,
			element: number,
		) => number,
	) => {
		return entities.map((entity, entityIndex) => {
			const subResults = [
				getResult(answerType, entityIndex, 0),
				getResult(answerType, entityIndex, 1),
				getResult(answerType, entityIndex, 2),
			]

			return getPhaseOfSelectId(subResults.join(''))
		})
	}

	return (
		<Page className="result">
			<header className={'section'}>
				<h1>Resultaten</h1>
				<div>
					<p>Op deze pagina zie je de resultaten van de door jullie ingevulde Toetsweb-Scan. Je ziet in de
						linkerkolom de huidige positie van elke toetsentiteit en in de rechterkolom jullie ambitie per
						toetsentiteit. De resultaten zijn zowel verbeeld in het toetsweb als beschreven in de tekst
						daaronder. In de tekst voor de positie staat beschreven in welke fase de toetsentiteit zich in
						de huidige situatie bevindt en in de tekst voor de ambitie waar jullie ambitie ligt. Verder vind
						je daar jullie keuzes, dus de stellingen waar jullie voor gekozen hebben, en eventueel de
						toelichting die jullie gegeven hebben.</p>
					<p>Het resultaat geeft weer in welke fase jullie opleiding zich over het geheel genomen bevindt voor
						de betreffende toetsentiteit. Dat betekent concreet dat ten minste één van de elementen
						(kwaliteitscriteria, ontwerp of borging), maar mogelijk alle drie deze elementen zich qua
						ontwikkeling in deze fase bevinden. Datzelfde geldt voor de ambitie. De fase geeft aan waar
						jullie ambitie over het geheel genomen ligt voor de betreffende toetsentiteit. Concreet betekent
						dat jullie ambitie voor een of meerdere elementen zich in die fase bevindt.</p>
					<p>Onderaan de pagina heb je drie mogelijkheden. Je kunt de resultaten downloaden voor verder
						gebruik. Deze download bevat dezelfde afbeeldingen en tekst als deze pagina. Je kunt ook een
						advies downloaden. In het advies wordt per element kort geschetst wat kenmerkend is voor dit
						element in de fase waarin jullie opleiding zich bevindt en welke risico’s dit potentieel met
						zich meebrengt voor de kwaliteit van de betreffende toetsentiteit. Ook worden enkele concrete
						acties benoemd die mogelijk behulpzaam zijn bij het maken van een ontwikkelstap richting de
						volgende fase. De derde mogelijkheid is het resetten van de resultaten. De resultaten worden
						namelijk onthouden op het apparaat waarop de scan is ingevuld. Wil je een nieuwe scan invullen,
						reset dan eerst de resultaten. Zorg wel dat je, indien gewenst, eerst de resultaten en het
						advies downloadt.</p>
					<p>Veel succes én plezier met het werken aan de kwaliteit van toetsing! </p>
				</div>
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
						<AssignmentModel
							results={getResultData(AnswerTypes.POSITION_RESULT, getResult)}
						/>
					</div>
					<div className={'result__container--item'}>
						<AssignmentModel
							results={getResultData(AnswerTypes.AMBITION_RESULT, getResult)}
						/>
					</div>
				</div>

				<p className={'result__model-explanation'}>
					{getTranslation('home.modelExplained')}
				</p>

				{entities.map((entity, entityIndex) => {
					const color = entity.color
					const explanation = getTranslation('explanation')

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
											<h2 style={{ color: color }}>{element.name}</h2>
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
											<br />
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
					<Button
						onClick={downloadAdviceBooklet}
						backgroundColor={entities[0].color}
					>
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
