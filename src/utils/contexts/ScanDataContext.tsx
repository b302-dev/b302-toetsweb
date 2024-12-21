import {createContext, FunctionComponent, useContext, useMemo} from 'react'
import {LanguageContext} from './LanguageContext'
import {Entities, Entity, EntityArray} from '../../models/Entity'
import {Element, ElementArray, Elements} from '../../models/Element'
import {genericPhaseColors, Phase, Phases,} from '../../models/Phase'
import {
	getElements,
	getEntities,
	getEntityElementPhaseDescriptions,
	getGenericEntityDescriptions,
	getGenericEntityPhaseDescriptions,
	getPhases,
	Language,
} from '../Localization'
import {ScanAnswer} from "../../models/ScanAnswer";

interface IScanDataContext {
	scanData: Entity[]
	getScanAnswer: (entity: Entities, element: Elements) => ScanAnswer
	setScanAnswer: (entity: Entities, element: Elements, scanAnswer: ScanAnswer) => void,
	entityFilledIn: (entity: Entities) => boolean,
	anyEntityFilledIn: () => boolean
}

export const ScanDataContext = createContext({} as IScanDataContext);

interface Props {
	children: any
}

export const ScanDataProvider: FunctionComponent<Props> = ({children}) => {
	const {language} = useContext(LanguageContext)

	const scanData: Entity[] = useMemo(() => {
		const descriptions = getGenericEntityDescriptions(language)
		const entities = [
			Entities.ASSESSMENT_TASKS,
			Entities.ASSESSMENT_PROGRAMME,
			Entities.ASSESSMENT_POLICY,
			Entities.ASSESSMENT_ORGANISATION,
			Entities.ASSESSMENT_LITERACY,
		]
		const genericPhaseDescriptions = getGenericEntityPhaseDescriptions(language)

		return getEntities(language).map(
			(entity: string, entityIndex): Entity => ({
				name: entity,
				color: phaseColors[entityIndex][phaseColors[entityIndex].length - 1],
				description: descriptions[entityIndex],
				elements: getElementsFrom(language, entityIndex),
				genericPhaseDescriptions: genericPhaseDescriptions[entityIndex],
				type: entities[entityIndex],
			}),
		)
	}, [language])

	const setScanAnswer = (entity: Entities, element: Elements, scanAnswer: ScanAnswer) => {
		localStorage.setItem(`${entity}.${element}`, JSON.stringify(scanAnswer));
	}

	const getScanAnswer = (entity: Entities, element: Elements): ScanAnswer => {
		const localEntity = localStorage.getItem(`${entity}.${element}`);
		if (!localEntity) {
			return {
				checkedPosition: -1,
				checkedAmbition: -1
			}
		}
		return JSON.parse(localEntity) as ScanAnswer;
	}

	const scanAnswerFilledIn = (entity: Entities, element: Elements): boolean => {
		const scanAnswer = getScanAnswer(entity, element);
		if (!scanAnswer) return false;
		return scanAnswer.checkedPosition !== -1 && scanAnswer.checkedAmbition !== -1;
	}

	const entityFilledIn = (entity: Entities): boolean => {
		for (const element of ElementArray) {
			if (!scanAnswerFilledIn(entity, element)) return false;
		}
		return true;
	}

	const anyEntityFilledIn = (): boolean => {
		for (const entity of EntityArray) {
			if (entityFilledIn(entity)) return true;
		}
		return false;
	}

	return (
		<ScanDataContext.Provider value={{scanData, getScanAnswer, setScanAnswer, entityFilledIn, anyEntityFilledIn}}>
			{children}
		</ScanDataContext.Provider>
	)
}

const getElementsFrom = (language: Language, entity: number): Element[] => {
	const elements = [
		Elements.QUALITY_CRITERIA,
		Elements.DESIGN,
		Elements.QUALITY_ASSURANCE,
	]

	return getElements(language).map(
		(element: string, elementIndex): Element => ({
			name: element,
			phases: getPhasesFrom(language, entity, elementIndex),
			type: elements[elementIndex],
		}),
	)
}

const getPhasesFrom = (
	language: Language,
	entity: number,
	element: number,
): Phase[] => {
	const descriptions = getEntityElementPhaseDescriptions(language)
	const genericEntityDescriptions = getGenericEntityPhaseDescriptions(language)
	const phases = [
		Phases.ACTIVITY_ORIENTED,
		Phases.PROCESS_ORIENTED,
		Phases.SYSTEM_ORIENTED,
		Phases.CHAIN_ORIENTED,
	]

	return getPhases(language).map(
		(phase: string, phaseIndex): Phase => ({
			name: phase,
			description: descriptions[entity][element][phaseIndex],
			genericEntityDescription: genericEntityDescriptions[entity][phaseIndex],
			color: phaseColors[entity][phaseIndex],
			fallbackColor: genericPhaseColors[phaseIndex],
			type: phases[phaseIndex],
		}),
	)
}

export const entityColors: string[] = [
	'#45A7C3',
	'#2DB3A5',
	'#AF72AD',
	'#ED7A0F',
	'#46AD48',
]

export const phaseColors: string[][] = [
	['#A1D3E1', '#85C5D7', '#73BDD2', '#45A7C3'],
	['#95D8D1', '#76CDC4', '#61C6BB', '#2DB3A5'],
	['#D6B7D5', '#CAA3C9', '#C395C1', '#AF72AD'],
	['#F5BB86', '#F3A862', '#F19B4B', '#ED7A0F'],
	['#A1D5A2', '#86C987', '#74C175', '#46AD48'],
]
