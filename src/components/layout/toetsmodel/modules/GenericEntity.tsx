import {FunctionComponent} from 'react'
import {Portal} from '../../Portal'
import {Entities} from "../../../../models/Entity";
import {phaseColors} from "../../../../utils/contexts/ScanDataContext";
import {genericPhaseColors, Phases} from "../../../../models/Phase";
import {useTranslation} from "react-i18next";

interface PhaseBarProps {
	entity: Entities
	phase: Phases
	result: number
	d: string
	onPhaseClick?: (entity: Entities, phase: Phases) => void
}

const GenericEntity: FunctionComponent<PhaseBarProps> = (props) => {
	const { t } = useTranslation();

	const isResult = props.phase <= props.result;
	const currentName = t(`phases.${props.phase}.name`);
	const currentDescription = t(`entities.${props.entity}.phases.${props.phase}.description`);
	const currentColor = isResult ? phaseColors[props.entity][props.phase] : genericPhaseColors[props.phase];

	const onClick = () => props.onPhaseClick && props.onPhaseClick(props.entity, props.phase);

	return (
		<Portal trigger={<path style={{backgroundColor: currentColor, fill: currentColor}} d={props.d}/>}
				onClick={onClick}>
			<div className={'toetsmodel-component__popup'}
				 style={{backgroundColor: phaseColors[props.entity][props.phase]}}>
				<h4>{`${props.phase + 1}. ${currentName.toUpperCase()}`}</h4>
				<p>{currentDescription}</p>
			</div>
		</Portal>
	)
}

export default GenericEntity
