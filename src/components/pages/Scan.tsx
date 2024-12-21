import ScanCard from '../layout/ScanCard'
import {useContext, useState} from 'react'
import {useTitle} from '../../utils/hooks/TitleHook'
import Page from '../Page'
import {entityColors, phaseColors, ScanDataContext} from '../../utils/contexts/ScanDataContext'
import {Entities, EntityArray} from "../../models/Entity";
import {Elements} from "../../models/Element";
import {useTranslation} from "react-i18next";

const Scan = () => {
	const {t} = useTranslation();

	const [currentEntity, setCurrentEntity] = useState<Entities>(Entities.ASSESSMENT_TASKS);
	const [currentElement, setCurrentElement] = useState<Elements>(Elements.QUALITY_CRITERIA);

	const {entityFilledIn} = useContext(ScanDataContext);

	useTitle(t('pages.scan.title'));

	const goToEntity = (entity: Entities) => {
		setCurrentEntity(entity);
		setCurrentElement(Elements.QUALITY_CRITERIA);
	}

	const handleNext = () => {
		if (currentElement === Elements.QUALITY_ASSURANCE) {
			if (currentEntity === Entities.ASSESSMENT_LITERACY) {
				window.location.href = '/result'
				return
			}
			setCurrentElement(Elements.QUALITY_CRITERIA)
			setCurrentEntity(currentEntity + 1)
			window.scrollTo(0, 0)
			return
		}
		setCurrentElement(currentElement + 1)
		window.scrollTo(0, 0)
	}

	const handlePrevious = () => {
		if (currentElement === Elements.QUALITY_CRITERIA) {
			if (currentEntity === Entities.ASSESSMENT_TASKS) {
				return
			}
			setCurrentElement(Elements.QUALITY_ASSURANCE)
			setCurrentEntity(currentEntity - 1)
			window.scrollTo(0, 0)
			return
		}
		setCurrentElement(currentElement - 1)
		window.scrollTo(0, 0)
	}

	return (
		<Page className="scan">
			<div className={'scan__tabs'}>
				{EntityArray.map((entity) => {
					const notFinished = entityFilledIn(entity);
					const color = notFinished ? 'gray' : 'white';

					const backgroundColor = () => {
						if (notFinished) return '#F9F9F9';
						if (currentEntity === entity) return entityColors[currentEntity];
						return phaseColors[entity][0];
					}

					return (
						<button
							key={entity}
							className={`scan__tabs-item nobutton`}
							style={{backgroundColor: backgroundColor(), color: color}}
							onClick={() => goToEntity(entity)}>
							<p>{t(`entities.${entity}.name`)}</p>
						</button>
					)
				})}
			</div>
			<ScanCard
				color={entityColors[currentEntity]}
				entityIndex={currentEntity}
				elementIndex={currentElement}
				handleNext={handleNext}
				handlePrevious={handlePrevious}/>
		</Page>
	)
}

export default Scan
