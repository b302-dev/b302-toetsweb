import Page from "../Page";
import AssignmentModel from "../layout/toetsmodel/AssignmentModel";
import {useState} from "react";
import {Entities} from "../../models/Entity";
import {Phases} from "../../models/Phase";

const ColorAssignmentModel = () => {

    const [results, setResults] = useState<number[]>([0, 0, 0, 0, 0]);

    const onPhaseClick = (entity: Entities, phase: Phases) => {
        const newResults = [...results];
        newResults[entity] = phase;
        setResults(newResults);
    }

    return (
        <Page>
            <AssignmentModel results={results} onPhaseClick={onPhaseClick}/>
        </Page>
    )
}

export default ColorAssignmentModel;
