import {FunctionComponent, useContext} from 'react'
import 'reactjs-popup/dist/index.css'
import AssignmentModelModules from './AssignmentModelModules'
import ModelPhases from './modules/ModelPhases'
import GenericEntity from './modules/GenericEntity'
import {ScanDataContext} from '../../../utils/contexts/ScanDataContext'
import {Entities} from '../../../models/Entity'
import {Phases} from '../../../models/Phase'

interface Props {
    results?: number[]
    onPhaseClick?: (entity: Entities, phase: Phases) => void
}

const AssignmentModel: FunctionComponent<Props> = ({results = [3, 3, 3, 3, 3], onPhaseClick}) => {
    const {SideText, CenterText} = AssignmentModelModules();
    const {genericPhases} = useContext(ScanDataContext);

    const onClick = (entity: Entities, phase: Phases) =>
        onPhaseClick && onPhaseClick(entity, phase);

    return (
        <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="672"
            height="672"
            viewBox="0 0 595.3 595.3"
            xmlSpace="preserve"
            className={'toetsmodel-component'}
        >
            <SideText/>
            <g id="assessmenttasks">
                <GenericEntity
                    entity={Entities.ASSESSMENT_TASKS}
                    phase={Phases.ACTIVITY_ORIENTED}
                    result={results[Entities.ASSESSMENT_TASKS]}
                    onPhaseClick={onClick}
                    d="M297.4,182.5c-50.5,0.3-93.3,33.3-108.5,78.8l107.8,34.3L297.4,182.5z"
                />
                <GenericEntity
                    entity={Entities.ASSESSMENT_TASKS}
                    phase={Phases.PROCESS_ORIENTED}
                    result={results[Entities.ASSESSMENT_TASKS]}
                    onPhaseClick={onClick}
                    d="M297.4,182.5l0.2-31.2c-64.6,0.3-119.2,42.3-138.4,100.5l29.7,9.5C204,215.8,246.8,182.9,297.4,182.5z"
                />
                <GenericEntity
                    entity={Entities.ASSESSMENT_TASKS}
                    phase={Phases.SYSTEM_ORIENTED}
                    result={results[Entities.ASSESSMENT_TASKS]}
                    onPhaseClick={onClick}
                    d="M297.6,151.3l0.2-31.2c-78.6,0.2-145.1,51.4-168.3,122.3l29.7,9.5C178.3,193.7,233,151.6,297.6,151.3z"
                />
                <GenericEntity
                    entity={Entities.ASSESSMENT_TASKS}
                    phase={Phases.CHAIN_ORIENTED}
                    result={results[Entities.ASSESSMENT_TASKS]}
                    onPhaseClick={onClick}
                    d="M297.8,120.1l0.2-31.2c-92.6,0.1-171,60.5-198.2,144l29.7,9.5C152.6,171.6,219.2,120.3,297.8,120.1z"
                />
            </g>

            <g id="assessmentprogram">
                <GenericEntity
                    entity={Entities.ASSESSMENT_PROGRAMME}
                    phase={Phases.ACTIVITY_ORIENTED}
                    result={results[Entities.ASSESSMENT_PROGRAMME]}
                    onPhaseClick={onClick}
                    d="M407.5,261.5c-15-45.5-57.7-78.4-108.1-78.9l0.7,113.1L407.5,261.5z"
                />
                <GenericEntity
                    entity={Entities.ASSESSMENT_PROGRAMME}
                    phase={Phases.PROCESS_ORIENTED}
                    result={results[Entities.ASSESSMENT_PROGRAMME]}
                    onPhaseClick={onClick}
                    d="M299.2,151.3l0.2,31.2c50.4,0.5,93.1,33.4,108.1,78.9l29.7-9.5C418.1,193.8,363.6,151.8,299.2,151.3z"
                />
                <GenericEntity
                    entity={Entities.ASSESSMENT_PROGRAMME}
                    phase={Phases.SYSTEM_ORIENTED}
                    result={results[Entities.ASSESSMENT_PROGRAMME]}
                    onPhaseClick={onClick}
                    d="M437.2,252l29.7-9.5c-23.1-70.8-89.5-122-167.9-122.4l0.2,31.2C363.6,151.8,418.1,193.8,437.2,252z"
                />
                <GenericEntity
                    entity={Entities.ASSESSMENT_PROGRAMME}
                    phase={Phases.CHAIN_ORIENTED}
                    result={results[Entities.ASSESSMENT_PROGRAMME]}
                    onPhaseClick={onClick}
                    d="M466.9,242.5l29.7-9.5C469.5,149.6,391.2,89.2,298.8,88.9l0.2,31.2C377.4,120.5,443.8,171.7,466.9,242.5z"
                />
            </g>

            <g id="assessmentpolicy">
                <GenericEntity
                    entity={Entities.ASSESSMENT_POLICY}
                    phase={Phases.ACTIVITY_ORIENTED}
                    result={results[Entities.ASSESSMENT_POLICY]}
                    onPhaseClick={onClick}
                    d="M366.6,390.1c28.3-21,46.7-54.6,46.7-92.5c0-11.9-1.8-23.4-5.2-34.2l-107,35.5L366.6,390.1z"
                />
                <GenericEntity
                    entity={Entities.ASSESSMENT_POLICY}
                    phase={Phases.PROCESS_ORIENTED}
                    result={results[Entities.ASSESSMENT_POLICY]}
                    onPhaseClick={onClick}
                    d="M413.2,297.6c0,37.9-18.4,71.6-46.7,92.5l18.2,25.3c36.2-26.6,59.7-69.5,59.7-117.9c0-15.4-2.4-30.1-6.8-44l-29.6,9.8C411.4,274.2,413.2,285.7,413.2,297.6z"
                />
                <GenericEntity
                    entity={Entities.ASSESSMENT_POLICY}
                    phase={Phases.SYSTEM_ORIENTED}
                    result={results[Entities.ASSESSMENT_POLICY]}
                    onPhaseClick={onClick}
                    d="M444.4,297.6c0,48.4-23.5,91.3-59.7,117.9l18.2,25.3c44.1-32.3,72.7-84.4,72.7-143.2c0-18.8-2.9-36.9-8.3-53.9l-29.6,9.8C442.1,267.4,444.4,282.2,444.4,297.6z"
                />
                <GenericEntity
                    entity={Entities.ASSESSMENT_POLICY}
                    phase={Phases.CHAIN_ORIENTED}
                    result={results[Entities.ASSESSMENT_POLICY]}
                    onPhaseClick={onClick}
                    d="M506.8,297.6c0-22.2-3.5-43.6-9.9-63.7l-29.6,9.8c5.4,17,8.3,35.1,8.3,53.9c0,58.8-28.6,110.9-72.7,143.2l18.2,25.3C473.1,428.2,506.8,366.8,506.8,297.6z"
                />
            </g>

            <g id="assessmentorganisation">
                <GenericEntity
                    entity={Entities.ASSESSMENT_ORGANISATION}
                    phase={Phases.ACTIVITY_ORIENTED}
                    result={results[Entities.ASSESSMENT_ORGANISATION]}
                    onPhaseClick={onClick}
                    d="M231.6,391.5c18.8,13.3,41.7,21.2,66.5,21.2c24.9,0,48-7.9,66.8-21.4l-66.6-90.5L231.6,391.5z"
                />
                <GenericEntity
                    entity={Entities.ASSESSMENT_ORGANISATION}
                    phase={Phases.PROCESS_ORIENTED}
                    result={results[Entities.ASSESSMENT_ORGANISATION]}
                    onPhaseClick={onClick}
                    d="M298.2,412.7c-24.8,0-47.7-7.8-66.5-21.2l-18.5,25.1c24,17.1,53.3,27.2,85,27.2c31.8,0,61.3-10.2,85.3-27.4L365,391.3C346.1,404.8,323.1,412.7,298.2,412.7z"
                />
                <GenericEntity
                    entity={Entities.ASSESSMENT_ORGANISATION}
                    phase={Phases.SYSTEM_ORIENTED}
                    result={results[Entities.ASSESSMENT_ORGANISATION]}
                    onPhaseClick={onClick}
                    d="M298.2,443.9c-31.7,0-61.1-10.1-85-27.2l-18.5,25.1c29.1,21,64.9,33.3,103.5,33.3c38.7,0,74.6-12.4,103.8-33.5l-18.5-25.1C359.4,433.7,330,443.9,298.2,443.9z"
                />
                <GenericEntity
                    entity={Entities.ASSESSMENT_ORGANISATION}
                    phase={Phases.CHAIN_ORIENTED}
                    result={results[Entities.ASSESSMENT_ORGANISATION]}
                    onPhaseClick={onClick}
                    d="M298.2,475c-38.6,0-74.4-12.3-103.5-33.3l-18.5,25.1c34.3,24.8,76.4,39.4,122,39.4c45.7,0,87.9-14.7,122.2-39.6l-18.5-25.1C372.8,462.6,336.9,475,298.2,475z"
                />
            </g>

            <g id="assessmentliteracy">
                <GenericEntity
                    entity={Entities.ASSESSMENT_LITERACY}
                    phase={Phases.ACTIVITY_ORIENTED}
                    result={results[Entities.ASSESSMENT_LITERACY]}
                    onPhaseClick={onClick}
                    d="M188.3,263.2c-3.4,10.9-5.2,22.4-5.2,34.4c0,38.1,18.5,71.8,46.9,92.7l65.7-91.5L188.3,263.2z"
                />
                <GenericEntity
                    entity={Entities.ASSESSMENT_LITERACY}
                    phase={Phases.PROCESS_ORIENTED}
                    result={results[Entities.ASSESSMENT_LITERACY]}
                    onPhaseClick={onClick}
                    d="M183.1,297.6c0-12,1.8-23.5,5.2-34.4l-29.6-9.8c-4.4,13.9-6.8,28.8-6.8,44.2c0,48.5,23.6,91.5,59.9,118.1l18.2-25.3C201.6,369.4,183.1,335.6,183.1,297.6z"
                />
                <GenericEntity
                    entity={Entities.ASSESSMENT_LITERACY}
                    phase={Phases.SYSTEM_ORIENTED}
                    result={results[Entities.ASSESSMENT_LITERACY]}
                    onPhaseClick={onClick}
                    d="M151.9,297.6c0-15.4,2.4-30.2,6.8-44.2l-29.6-9.8c-5.4,17-8.4,35.2-8.4,54c0,58.9,28.7,111.1,72.9,143.4l18.2-25.3C175.5,389.1,151.9,346.1,151.9,297.6z"
                />
                <GenericEntity
                    entity={Entities.ASSESSMENT_LITERACY}
                    phase={Phases.CHAIN_ORIENTED}
                    result={results[Entities.ASSESSMENT_LITERACY]}
                    onPhaseClick={onClick}
                    d="M120.7,297.6c0-18.8,2.9-37,8.4-54l-29.6-9.8c-6.5,20.1-10,41.5-10,63.8c0,69.4,33.9,130.8,86,168.8l18.2-25.3C149.5,408.7,120.7,356.5,120.7,297.6z"
                />
            </g>

            <g id="phases">
                {/* assessmenttasks */}
                <ModelPhases
                    phase={genericPhases[Phases.ACTIVITY_ORIENTED]}
                    bb={[225, 214]}
                    d="M231.7,230.1v-2.3h2.7v-7.2h-2.3v-1.8c0.7-0.1,1.2-0.3,1.7-0.5s0.9-0.4,1.4-0.7h2.1v10.1h2.3v2.3L231.7,230.1L231.7,230.1z"
                />
                <ModelPhases
                    phase={genericPhases[Phases.PROCESS_ORIENTED]}
                    bb={[201, 191]}
                    d="M207.4,206.4v-1.6c0.8-0.7,1.5-1.4,2.2-2.1s1.2-1.2,1.7-1.8s0.8-1.1,1.1-1.6s0.4-1,0.4-1.4c0-0.6-0.2-1.1-0.5-1.4c-0.3-0.3-0.7-0.5-1.3-0.5c-0.5,0-0.9,0.1-1.2,0.4s-0.7,0.6-1,0.9l-1.6-1.5c0.6-0.7,1.2-1.1,1.9-1.5s1.4-0.5,2.3-0.5c0.6,0,1.2,0.1,1.7,0.3s0.9,0.5,1.3,0.8c0.4,0.3,0.6,0.8,0.8,1.2c0.2,0.5,0.3,1,0.3,1.6c0,0.5-0.1,1.1-0.3,1.6s-0.5,1.1-0.9,1.6s-0.8,1.1-1.3,1.6s-1,1.1-1.5,1.6c0.3,0,0.7-0.1,1-0.1c0.4,0,0.7,0,1,0h2.5v2.4H207.4z"
                />
                <ModelPhases
                    phase={genericPhases[Phases.SYSTEM_ORIENTED]}
                    bb={[179, 168]}
                    d="M188.6,183.9c-1,0-1.9-0.2-2.6-0.5s-1.3-0.7-1.7-1.3l1.3-1.8c0.4,0.4,0.8,0.7,1.2,0.9s0.9,0.4,1.5,0.4s1.1-0.1,1.5-0.4c0.4-0.3,0.5-0.6,0.5-1.1c0-0.3,0-0.5-0.1-0.7s-0.3-0.4-0.5-0.6c-0.2-0.1-0.6-0.3-1-0.4c-0.4-0.1-1-0.1-1.7-0.1v-2c0.6,0,1,0,1.4-0.1s0.7-0.2,0.9-0.3s0.4-0.3,0.5-0.5s0.1-0.4,0.1-0.7c0-0.4-0.1-0.8-0.4-1c-0.3-0.2-0.6-0.4-1.1-0.4c-0.4,0-0.8,0.1-1.2,0.3s-0.7,0.5-1.1,0.8l-1.4-1.8c0.6-0.5,1.2-0.9,1.8-1.2s1.3-0.4,2.1-0.4c0.6,0,1.2,0.1,1.7,0.2c0.5,0.2,1,0.4,1.3,0.7s0.7,0.6,0.9,1.1c0.2,0.4,0.3,0.9,0.3,1.4c0,0.7-0.2,1.2-0.5,1.7c-0.4,0.4-0.9,0.8-1.5,1.1v0.1c0.7,0.2,1.3,0.6,1.8,1.1s0.7,1.2,0.7,2c0,0.6-0.1,1.1-0.4,1.5c-0.2,0.4-0.6,0.8-1,1.1s-0.9,0.5-1.5,0.7C189.8,183.8,189.2,183.9,188.6,183.9z"
                />
                <ModelPhases
                    phase={genericPhases[Phases.CHAIN_ORIENTED]}
                    bb={[157, 145]}
                    d="M167.1,161.1v-3h-5.4v-2l4.5-7.5h3.5v7.2h1.4v2.2h-1.4v3h-2.6V161.1z M164.5,156h2.6v-2c0-0.4,0-0.9,0-1.4s0.1-1,0.1-1.4h-0.1c-0.2,0.3-0.3,0.7-0.5,1c-0.2,0.4-0.3,0.7-0.5,1.1L164.5,156z"
                />

                {/* assessmentprogram */}
                <ModelPhases
                    phase={genericPhases[Phases.ACTIVITY_ORIENTED]}
                    bb={[352, 214]}
                    d="M358.9,230.1v-2.3h2.7v-7.2h-2.3v-1.8c0.7-0.1,1.2-0.3,1.7-0.5s0.9-0.4,1.4-0.7h2.1v10.1h2.3v2.3L358.9,230.1L358.9,230.1z"
                />
                <ModelPhases
                    phase={genericPhases[Phases.PROCESS_ORIENTED]}
                    bb={[375, 191]}
                    d="M381.6,206.7v-1.6c0.8-0.7,1.5-1.4,2.2-2.1s1.2-1.2,1.7-1.8s0.8-1.1,1.1-1.6c0.3-0.5,0.4-1,0.4-1.4c0-0.6-0.2-1.1-0.5-1.4c-0.3-0.3-0.7-0.5-1.3-0.5c-0.5,0-0.9,0.1-1.2,0.4s-0.7,0.6-1,0.9l-1.6-1.5c0.6-0.7,1.2-1.1,1.9-1.5s1.4-0.5,2.3-0.5c0.6,0,1.2,0.1,1.7,0.3s0.9,0.5,1.3,0.8s0.6,0.8,0.8,1.2c0.2,0.5,0.3,1,0.3,1.6c0,0.5-0.1,1.1-0.3,1.6c-0.2,0.5-0.5,1.1-0.9,1.6s-0.8,1.1-1.3,1.6s-1,1.1-1.5,1.6c0.3,0,0.7-0.1,1-0.1c0.4,0,0.7,0,1,0h2.5v2.4H381.6z"
                />
                <ModelPhases
                    phase={genericPhases[Phases.SYSTEM_ORIENTED]}
                    bb={[397, 169]}
                    d="M407,185.6c-1,0-1.9-0.2-2.6-0.5s-1.3-0.7-1.7-1.3l1.3-1.8c0.4,0.4,0.8,0.7,1.2,0.9s0.9,0.4,1.5,0.4s1.1-0.1,1.5-0.4c0.4-0.3,0.5-0.6,0.5-1.1c0-0.3,0-0.5-0.1-0.7s-0.3-0.4-0.5-0.6c-0.2-0.1-0.6-0.3-1-0.4c-0.4-0.1-1-0.1-1.7-0.1v-2c0.6,0,1,0,1.4-0.1s0.7-0.2,0.9-0.3c0.2-0.1,0.4-0.3,0.5-0.5s0.1-0.4,0.1-0.7c0-0.4-0.1-0.8-0.4-1s-0.6-0.4-1.1-0.4c-0.4,0-0.8,0.1-1.2,0.3c-0.4,0.2-0.7,0.5-1.1,0.8l-1.4-1.8c0.6-0.5,1.2-0.9,1.8-1.2c0.6-0.3,1.3-0.4,2.1-0.4c0.6,0,1.2,0.1,1.7,0.2c0.5,0.2,1,0.4,1.3,0.7s0.7,0.6,0.9,1.1c0.2,0.4,0.3,0.9,0.3,1.4c0,0.7-0.2,1.2-0.5,1.7c-0.4,0.4-0.9,0.8-1.5,1.1v0.1c0.7,0.2,1.3,0.6,1.8,1.1s0.7,1.2,0.7,2c0,0.6-0.1,1.1-0.4,1.5c-0.2,0.4-0.6,0.8-1,1.1s-0.9,0.5-1.5,0.7C408.2,185.6,407.6,185.6,407,185.6z"
                />
                <ModelPhases
                    phase={genericPhases[Phases.CHAIN_ORIENTED]}
                    bb={[420, 146]}
                    d="M430.6,162.8v-3h-5.4v-2l4.5-7.5h3.5v7.2h1.4v2.2h-1.4v3h-2.6V162.8z M428,157.6h2.6v-2c0-0.4,0-0.9,0-1.4s0.1-1,0.1-1.4h-0.1c-0.2,0.3-0.3,0.7-0.5,1c-0.2,0.4-0.3,0.7-0.5,1.1L428,157.6z"
                />

                {/* assessmentpolicy */}
                <ModelPhases
                    phase={genericPhases[Phases.ACTIVITY_ORIENTED]}
                    bb={[381, 318]}
                    d="M386.8,333.5v-2.3h2.7V324h-2.3v-1.8c0.7-0.1,1.2-0.3,1.7-0.5s0.9-0.4,1.4-0.7h2.1v10.1h2.3v2.3h-7.9V333.5z"
                />
                <ModelPhases
                    phase={genericPhases[Phases.PROCESS_ORIENTED]}
                    bb={[409, 335]}
                    d="M414.6,350v-1.6c0.8-0.7,1.5-1.4,2.2-2.1s1.2-1.2,1.7-1.8c0.5-0.6,0.8-1.1,1.1-1.6c0.3-0.5,0.4-1,0.4-1.4c0-0.6-0.2-1.1-0.5-1.4s-0.7-0.5-1.3-0.5c-0.5,0-0.9,0.1-1.2,0.4s-0.7,0.6-1,0.9l-1.6-1.5c0.6-0.7,1.2-1.1,1.9-1.5s1.4-0.5,2.3-0.5c0.6,0,1.2,0.1,1.7,0.3c0.5,0.2,0.9,0.5,1.3,0.8s0.6,0.8,0.8,1.2c0.2,0.5,0.3,1,0.3,1.6c0,0.5-0.1,1.1-0.3,1.6c-0.2,0.5-0.5,1.1-0.9,1.6s-0.8,1.1-1.3,1.6s-1,1.1-1.5,1.6c0.3,0,0.7-0.1,1-0.1c0.4,0,0.7,0,1,0h2.5v2.4H414.6z"
                />
                <ModelPhases
                    phase={genericPhases[Phases.SYSTEM_ORIENTED]}
                    bb={[436, 352]}
                    d="M445.8,368.9c-1,0-1.9-0.2-2.6-0.5s-1.3-0.7-1.7-1.3l1.3-1.8c0.4,0.4,0.8,0.7,1.2,0.9s0.9,0.4,1.5,0.4s1.1-0.1,1.5-0.4s0.5-0.6,0.5-1.1c0-0.3,0-0.5-0.1-0.7s-0.3-0.4-0.5-0.6c-0.2-0.1-0.6-0.3-1-0.4s-1-0.1-1.7-0.1v-2c0.6,0,1,0,1.4-0.1s0.7-0.2,0.9-0.3c0.2-0.1,0.4-0.3,0.5-0.5s0.1-0.4,0.1-0.7c0-0.4-0.1-0.8-0.4-1s-0.6-0.4-1.1-0.4c-0.4,0-0.8,0.1-1.2,0.3c-0.4,0.2-0.7,0.5-1.1,0.8l-1.4-1.8c0.6-0.5,1.2-0.9,1.8-1.2c0.6-0.3,1.3-0.4,2.1-0.4c0.6,0,1.2,0.1,1.7,0.2c0.5,0.2,1,0.4,1.3,0.7s0.7,0.6,0.9,1.1c0.2,0.4,0.3,0.9,0.3,1.4c0,0.7-0.2,1.2-0.5,1.7c-0.4,0.4-0.9,0.8-1.5,1.1v0.1c0.7,0.2,1.3,0.6,1.8,1.1s0.7,1.2,0.7,2c0,0.6-0.1,1.1-0.4,1.5c-0.2,0.4-0.6,0.8-1,1.1c-0.4,0.3-0.9,0.5-1.5,0.7C447.1,368.8,446.5,368.9,445.8,368.9z"
                />
                <ModelPhases
                    phase={genericPhases[Phases.CHAIN_ORIENTED]}
                    bb={[464, 371]}
                    d="M474.5,386.8v-3h-5.4v-2l4.5-7.5h3.5v7.2h1.4v2.2h-1.4v3L474.5,386.8L474.5,386.8z M471.9,381.6h2.6v-2c0-0.4,0-0.9,0-1.4s0.1-1,0.1-1.4h-0.1c-0.2,0.3-0.3,0.7-0.5,1c-0.2,0.4-0.3,0.7-0.5,1.1L471.9,381.6z"
                />

                {/* assessmentorganisation */}
                <ModelPhases
                    phase={genericPhases[Phases.ACTIVITY_ORIENTED]}
                    bb={[289, 388]}
                    d="M294.9,404.1v-2.3h2.7v-7.2h-2.3v-1.8c0.7-0.1,1.2-0.3,1.7-0.5s0.9-0.4,1.4-0.7h2.1v10.1h2.3v2.3h-7.9V404.1z"
                />
                <ModelPhases
                    phase={genericPhases[Phases.PROCESS_ORIENTED]}
                    bb={[289, 418]}
                    d="M294.2,433.7v-1.6c0.8-0.7,1.5-1.4,2.2-2.1s1.2-1.2,1.7-1.8c0.5-0.6,0.8-1.1,1.1-1.6c0.3-0.5,0.4-1,0.4-1.4c0-0.6-0.2-1.1-0.5-1.4s-0.7-0.5-1.3-0.5c-0.5,0-0.9,0.1-1.2,0.4s-0.7,0.6-1,0.9l-1.6-1.5c0.6-0.7,1.2-1.1,1.9-1.5s1.4-0.5,2.3-0.5c0.6,0,1.2,0.1,1.7,0.3c0.5,0.2,0.9,0.5,1.3,0.8s0.6,0.8,0.8,1.2c0.2,0.5,0.3,1,0.3,1.6c0,0.5-0.1,1.1-0.3,1.6c-0.2,0.5-0.5,1.1-0.9,1.6s-0.8,1.1-1.3,1.6s-1,1.1-1.5,1.6c0.3,0,0.7-0.1,1-0.1c0.4,0,0.7,0,1,0h2.5v2.4H294.2z"
                />
                <ModelPhases
                    phase={genericPhases[Phases.SYSTEM_ORIENTED]}
                    bb={[289, 449]}
                    d="M298.2,466.5c-1,0-1.9-0.2-2.6-0.5s-1.3-0.7-1.7-1.3l1.3-1.8c0.4,0.4,0.8,0.7,1.2,0.9s0.9,0.4,1.5,0.4s1.1-0.1,1.5-0.4s0.5-0.6,0.5-1.1c0-0.3,0-0.5-0.1-0.7s-0.3-0.4-0.5-0.6c-0.2-0.1-0.6-0.3-1-0.4s-1-0.1-1.7-0.1v-2c0.6,0,1,0,1.4-0.1s0.7-0.2,0.9-0.3c0.2-0.1,0.4-0.3,0.5-0.5s0.1-0.4,0.1-0.7c0-0.4-0.1-0.8-0.4-1s-0.6-0.4-1.1-0.4c-0.4,0-0.8,0.1-1.2,0.3c-0.4,0.2-0.7,0.5-1.1,0.8l-1.4-1.8c0.6-0.5,1.2-0.9,1.8-1.2c0.6-0.3,1.3-0.4,2.1-0.4c0.6,0,1.2,0.1,1.7,0.2c0.5,0.2,1,0.4,1.3,0.7s0.7,0.6,0.9,1.1c0.2,0.4,0.3,0.9,0.3,1.4c0,0.7-0.2,1.2-0.5,1.7c-0.4,0.4-0.9,0.8-1.5,1.1v0.1c0.7,0.2,1.3,0.6,1.8,1.1s0.7,1.2,0.7,2c0,0.6-0.1,1.1-0.4,1.5c-0.2,0.4-0.6,0.8-1,1.1c-0.4,0.3-0.9,0.5-1.5,0.7C299.5,466.4,298.9,466.5,298.2,466.5z"
                />
                <ModelPhases
                    phase={genericPhases[Phases.CHAIN_ORIENTED]}
                    bb={[289, 479]}
                    d="M299.2,496.7v-3h-5.4v-2l4.5-7.5h3.5v7.2h1.4v2.2h-1.4v3L299.2,496.7L299.2,496.7z M296.6,491.5h2.6v-2c0-0.4,0-0.9,0-1.4s0.1-1,0.1-1.4h-0.1c-0.2,0.3-0.3,0.7-0.5,1c-0.2,0.4-0.3,0.7-0.5,1.1L296.6,491.5z"
                />

                {/* assessmentliteracy */}
                <ModelPhases
                    phase={genericPhases[Phases.ACTIVITY_ORIENTED]}
                    bb={[195, 318]}
                    d="M201,333.5v-2.3h2.7V324h-2.3v-1.8c0.7-0.1,1.2-0.3,1.7-0.5s0.9-0.4,1.4-0.7h2.1v10.1h2.3v2.3H201V333.5z"
                />
                <ModelPhases
                    phase={genericPhases[Phases.PROCESS_ORIENTED]}
                    bb={[165, 331]}
                    d="M169.8,346.2v-1.6c0.8-0.7,1.5-1.4,2.2-2.1s1.2-1.2,1.7-1.8c0.5-0.6,0.8-1.1,1.1-1.6s0.4-1,0.4-1.4c0-0.6-0.2-1.1-0.5-1.4s-0.7-0.5-1.3-0.5c-0.5,0-0.9,0.1-1.2,0.4s-0.7,0.6-1,0.9l-1.6-1.5c0.6-0.7,1.2-1.1,1.9-1.5s1.4-0.5,2.3-0.5c0.6,0,1.2,0.1,1.7,0.3c0.5,0.2,0.9,0.5,1.3,0.8c0.4,0.3,0.6,0.8,0.8,1.2c0.2,0.5,0.3,1,0.3,1.6c0,0.5-0.1,1.1-0.3,1.6s-0.5,1.1-0.9,1.6s-0.8,1.1-1.3,1.6s-1,1.1-1.5,1.6c0.3,0,0.7-0.1,1-0.1c0.4,0,0.7,0,1,0h2.5v2.4H169.8z"
                />
                <ModelPhases
                    phase={genericPhases[Phases.SYSTEM_ORIENTED]}
                    bb={[136, 344]}
                    d="M146,359.5c-1,0-1.9-0.2-2.6-0.5s-1.3-0.7-1.7-1.3l1.3-1.8c0.4,0.4,0.8,0.7,1.2,0.9s0.9,0.4,1.5,0.4s1.1-0.1,1.5-0.4s0.5-0.6,0.5-1.1c0-0.3,0-0.5-0.1-0.7s-0.3-0.4-0.5-0.6c-0.2-0.1-0.6-0.3-1-0.4s-1-0.1-1.7-0.1v-2c0.6,0,1,0,1.4-0.1s0.7-0.2,0.9-0.3c0.2-0.1,0.4-0.3,0.5-0.5s0.1-0.4,0.1-0.7c0-0.4-0.1-0.8-0.4-1c-0.3-0.2-0.6-0.4-1.1-0.4c-0.4,0-0.8,0.1-1.2,0.3c-0.4,0.2-0.7,0.5-1.1,0.8l-1.4-1.8c0.6-0.5,1.2-0.9,1.8-1.2c0.6-0.3,1.3-0.4,2.1-0.4c0.6,0,1.2,0.1,1.7,0.2c0.5,0.2,1,0.4,1.3,0.7s0.7,0.6,0.9,1.1c0.2,0.4,0.3,0.9,0.3,1.4c0,0.7-0.2,1.2-0.5,1.7c-0.4,0.4-0.9,0.8-1.5,1.1v0.1c0.7,0.2,1.3,0.6,1.8,1.1s0.7,1.2,0.7,2c0,0.6-0.1,1.1-0.4,1.5c-0.2,0.4-0.6,0.8-1,1.1c-0.4,0.3-0.9,0.5-1.5,0.7C147.2,359.4,146.6,359.5,146,359.5z"
                />
                <ModelPhases
                    phase={genericPhases[Phases.CHAIN_ORIENTED]}
                    bb={[110, 359]}
                    d="M119.7,375v-3h-5.4v-2l4.5-7.5h3.5v7.2h1.4v2.2h-1.4v3L119.7,375L119.7,375z M117.1,369.8h2.6v-2c0-0.4,0-0.9,0-1.4s0.1-1,0.1-1.4h-0.1c-0.2,0.3-0.3,0.7-0.5,1c-0.2,0.4-0.3,0.7-0.5,1.1L117.1,369.8z"
                />
            </g>

            <g id={'mask'}>
                <path
                    fill="#FFFFFF"
                    d="M298.2,444.4c-30.8,0-60.3-9.4-85.3-27.3l-0.4-0.3l19.1-25.9l0.4,0.3c19.4,13.8,42.3,21.1,66.2,21.1c24,0,47-7.4,66.5-21.3l0.4-0.3l19.1,25.9l-0.4,0.3C358.7,434.8,329.1,444.4,298.2,444.4z M213.9,416.5c24.7,17.6,53.9,26.8,84.3,26.8c30.6,0,59.8-9.3,84.6-27L364.9,392c-19.6,13.9-42.6,21.2-66.7,21.2c-23.9,0-46.9-7.3-66.4-21L213.9,416.5z"
                />
                <path
                    fill="#FFFFFF"
                    d="M384.7,416.2L365.9,390l0.4-0.3c29.1-21.5,46.5-56,46.5-92.1c0-11.6-1.7-23.1-5.2-34.1l-0.1-0.5l30.6-10.1l0.2,0.5c4.5,14.3,6.8,29.1,6.8,44.2c0,23.7-5.5,46.4-16.3,67.3c-10.3,20-25.4,37.6-43.6,51L384.7,416.2z M367.3,390.2l17.6,24.5c17.9-13.2,32.7-30.6,42.9-50.3c10.8-20.8,16.2-43.3,16.2-66.9c0-14.8-2.2-29.4-6.6-43.4l-28.7,9.5c3.4,10.9,5.1,22.4,5.1,33.9C413.8,333.9,396.4,368.5,367.3,390.2z"
                />
                <path
                    fill="#FFFFFF"
                    d="M366.5,390.8l-66.2-92.3l108.1-35.8l0.2,0.5c3.5,11.1,5.2,22.7,5.2,34.4c0,36.5-17.5,71.2-46.9,92.9L366.5,390.8z M301.9,299.1l64.8,90.3c28.8-21.6,46.1-55.9,46.1-91.8c0-11.5-1.7-22.8-5-33.6L301.9,299.1z"
                />
                <path
                    fill="#FFFFFF"
                    d="M407.1,262.1l-0.2-0.5c-15.4-46.5-58.6-78.1-107.6-78.6h-0.5l-0.2-32.2h0.5c63.2,0.4,118.8,41,138.5,101l0.2,0.5L407.1,262.1z M299.9,182c49.1,0.7,92.3,32.3,107.9,78.8l28.8-9.2c-19.6-59.2-74.5-99.2-136.9-99.8L299.9,182z"
                />
                <path
                    fill="#FFFFFF"
                    d="M159.5,252.5l-30.7-9.8l0.2-0.5c11.5-35.3,33.5-65.7,63.5-87.9c30.6-22.6,67-34.6,105.2-34.7h0.5l-0.2,32.2h-0.5c-62.9,0.3-118.3,40.5-137.9,100.2L159.5,252.5z M130.1,242.1l28.8,9.2c19.8-59.7,75.3-100,138.2-100.4l0.2-30.2c-37.8,0.2-73.8,12.1-104.1,34.5C163.4,177.1,141.6,207.2,130.1,242.1z"
                />
                <path
                    fill="#FFFFFF"
                    d="M189.2,262l-30.7-9.8l0.2-0.5c19.8-60.1,75.6-100.6,138.8-100.9h0.5l-0.2,32.2h-0.5c-49.1,0.3-92.5,31.9-108,78.5L189.2,262z M159.8,251.6l28.8,9.2c15.7-46.6,59.1-78.2,108.3-78.7l0.2-30.2C234.6,152.3,179.5,192.3,159.8,251.6z"
                />
                <path
                    fill="#FFFFFF"
                    d="M436.9,252.6l-0.2-0.5c-19.5-59.6-74.8-99.9-137.5-100.3h-0.5l-0.2-32.2h0.5c76.9,0.4,144.6,49.7,168.4,122.7l0.2,0.5L436.9,252.6z M299.7,150.8c62.8,0.6,118.1,41,137.8,100.5l28.8-9.2c-23.8-72.2-90.7-121-166.8-121.6L299.7,150.8z"
                />
                <path
                    fill="#FFFFFF"
                    d="M299.5,296.3L298.9,182h0.5c49.4,0.5,93.1,32.4,108.6,79.3l0.2,0.5l-0.5,0.2L299.5,296.3z M299.9,183l0.7,111.9l106.3-33.8C391.4,215.1,348.5,183.7,299.9,183z"
                />
                <path
                    fill="#FFFFFF"
                    d="M402.8,441.5L384,415.3l0.4-0.3c18-13.3,33-30.8,43.3-50.6c10.8-20.8,16.2-43.3,16.2-66.9c0-15-2.3-29.7-6.7-43.9l-0.1-0.5l30.6-10.1l0.2,0.5c5.5,17.4,8.4,35.6,8.4,54c0,28.4-6.9,56.7-19.9,81.8c-12.6,24.3-30.9,45.6-53,61.8L402.8,441.5z M385.5,415.6l17.6,24.5c21.8-16.1,39.9-37.2,52.3-61.2c12.9-24.9,19.8-53.1,19.8-81.3c0-18.1-2.7-36-8.2-53.2l-28.7,9.5c4.4,14.1,6.6,28.8,6.6,43.7c0,23.7-5.5,46.4-16.3,67.3C418.4,384.7,403.4,402.3,385.5,415.6z"
                />
                <path
                    fill="#FFFFFF"
                    d="M298.2,475.5c-37.5,0-73.4-11.5-103.8-33.4l-0.4-0.3l19.1-25.9l0.4,0.3c24.8,17.8,54.1,27.1,84.7,27.1c30.7,0,60.1-9.5,85-27.3l0.4-0.3l19.1,25.9l-0.4,0.3C371.8,463.9,335.8,475.5,298.2,475.5z M195.4,441.6c30.1,21.5,65.6,32.9,102.8,32.9c37.3,0,72.9-11.4,103.1-33.1l-17.9-24.3c-25,17.8-54.4,27.2-85.2,27.2c-30.7,0-60-9.3-84.9-27L195.4,441.6z"
                />
                <path
                    fill="#FFFFFF"
                    d="M298.2,413.2c-24.1,0-47.2-7.4-66.8-21.3l-0.4-0.3l0.3-0.4l67.1-91.3l67.3,91.5l-0.4,0.3C345.6,405.7,322.4,413.2,298.2,413.2z M232.4,391.4c19.3,13.6,42.1,20.8,65.8,20.8c23.9,0,46.7-7.3,66.1-21l-65.9-89.6L232.4,391.4z"
                />
                <path
                    fill="#FFFFFF"
                    d="M193.8,441.7l-0.4-0.3c-22.2-16.2-40.6-37.6-53.2-61.9c-13.1-25.1-20-53.4-20-81.9c0-18.5,2.8-36.7,8.4-54.1l0.2-0.5l30.6,10.1l-0.1,0.5c-4.5,14.2-6.8,29-6.8,44c0,23.3,5.6,46.5,16.3,67c10.3,19.9,25.3,37.4,43.5,50.7l0.4,0.3L193.8,441.7z M129.4,244.2c-5.4,17.2-8.2,35.2-8.2,53.4c0,28.3,6.9,56.5,19.8,81.5c12.5,24,30.6,45.2,52.5,61.2l17.6-24.5c-18.1-13.3-33-30.8-43.3-50.7c-10.7-20.7-16.4-44-16.4-67.5c0-14.9,2.2-29.7,6.7-43.9L129.4,244.2z"
                />
                <path
                    fill="#FFFFFF"
                    d="M212,416.4l-0.4-0.3c-18.2-13.4-33.4-31-43.7-51c-10.7-20.7-16.4-44-16.4-67.5c0-15.1,2.3-30,6.8-44.3l0.2-0.5l30.6,10.1l-0.1,0.5c-3.4,11-5.2,22.5-5.2,34.2c0,36.3,17.5,70.8,46.7,92.3l0.4,0.3L212,416.4z M159,254.1c-4.4,14.1-6.6,28.7-6.6,43.5c0,23.3,5.6,46.5,16.3,67c10.2,19.7,25.1,37.1,43,50.4l17.6-24.5c-29.3-21.7-46.7-56.4-46.7-92.8c0-11.6,1.7-23,5.1-34L159,254.1z"
                />
                <path
                    fill="#FFFFFF"
                    d="M230.1,391l-0.4-0.3c-29.5-21.7-47.1-56.5-47.1-93.1c0-11.8,1.8-23.4,5.2-34.5l0.2-0.5l108.5,36L230.1,391zM188.6,263.9c-3.3,10.9-5,22.2-5,33.7c0,36.1,17.3,70.5,46.3,92l65-90.5L188.6,263.9z"
                />
                <polygon
                    fill="#FFFFFF"
                    points="296.6,213.7 297.4,85.9 299.6,85.8 300,214.1"
                />
                <polygon
                    fill="#FFFFFF"
                    points="377.4,270.8 499,231.3 499.8,233.3 378.1,274.1"
                />
                <polygon
                    fill="#FFFFFF"
                    points="220,270.8 98.5,231.3 97.7,233.3 219.4,274.1"
                />
                <polygon
                    fill="#FFFFFF"
                    points="249.1,362.9 174.8,466.9 176.5,468.2 252,364.5"
                />
                <polygon
                    fill="#FFFFFF"
                    points="348,363.1 422.2,467.1 420.6,468.5 345,364.8"
                />
            </g>

            <CenterText/>
        </svg>
    )
}

export default AssignmentModel
