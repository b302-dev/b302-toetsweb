import {FunctionComponent, useContext} from 'react'
import {Phases} from '../../../../models/Phase'
import {Portal} from '../../Portal'
import {Entities} from "../../../../models/Entity";
import {ScanDataContext} from "../../../../utils/contexts/ScanDataContext";

interface PhaseBarProps {
    entity: Entities
    phase: Phases
    result: number
    d: string
    onPhaseClick?: (entity: Entities, phase: Phases) => void
}

const GenericEntity: FunctionComponent<PhaseBarProps> = ({
                                                             entity,
                                                             phase,
                                                             result,
                                                             d,
                                                             onPhaseClick
                                                         }) => {
    const {scanData: entities} = useContext(ScanDataContext);

    const thisPhase = entities[entity].elements[0].phases[phase];
    const isResult = phase <= result;

    const style = () => {
        const color = isResult ? thisPhase.color : thisPhase.fallbackColor
        return {
            backgroundColor: color,
            fill: color,
        }
    }

    const onClick = () => onPhaseClick && onPhaseClick(entity, phase);

    return (
        <Portal trigger={<path style={style()} d={d}/>} onClick={onClick}>
            <div
                className={'toetsmodel-component__popup'}
                style={{backgroundColor: thisPhase.color}}
            >
                <h4>{`${phase + 1}. ${thisPhase.name.toUpperCase()}`}</h4>
                <p>{thisPhase.genericEntityDescription}</p>
            </div>
        </Portal>
    )
}

export default GenericEntity
