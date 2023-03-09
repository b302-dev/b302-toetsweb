import React, {FunctionComponent} from "react";
import ToetsmodelComponent from "./ToetsmodelComponent";
import scanData from "../../assets/data/scandata.json";
import resultData from "../../assets/data/resultdata.json";
import Card from "./Card";

interface Props {
    fragmentTitle: string;
    getResult: (entity: number, element: number) => number;
    getFeedback: (entity: number, element: number) => string;
}

const ResultFragment: FunctionComponent<Props> = ({fragmentTitle, getResult, getFeedback}) => {

    const entities = scanData.entities;

    const getResultData = () => {
        const resultData: Array<Array<string>> = [];
        resultData.push(['Toetsweb', 'Kwaliteitscriteria', 'Ontwerp', 'Borging', 'Fase']);
        entities.forEach((entity, entityIndex) => {
            const results = [
                getResult(entityIndex, 0).toString(),
                getResult(entityIndex, 1).toString(),
                getResult(entityIndex, 2).toString()
            ];

            resultData.push([
                entity.name,
                results[0],
                results[1],
                results[2],
                getEndResult(results.join('')).toString()
            ]);
        });
        return resultData;
    }

    const getEndResult = (results: string) => {
        const phases = resultData.phases;
        let phaseID = 1;
        phases.forEach((phase) => {
            const selectIDs = phase.selectIDs;
            selectIDs.forEach((selectID) => {
                if (results === selectID) {
                    phaseID = parseInt(phase.phaseID);
                }
            });
        });
        return phaseID;
    }

    const printFeedback = (entityIndex: number, elementIndex: number) => {
        const feedback = getFeedback(entityIndex, elementIndex);
        return <p>Toelichting: {feedback !== '' ? feedback : <i>Niet ingevuld</i>}</p>;
    }

    return (
        <div className='result-fragment'>
            <h1 className='result-fragment__title'>{fragmentTitle}</h1>
            <ToetsmodelComponent results={getResultData()}/>
            <Card className='result-fragment__answer-card'>
                {
                    entities.map((entity, entityIndex) => {
                        return (
                            <div key={entityIndex}>
                                <h3>{entity.name}</h3>
                                {
                                    entity.elements.map((element, elementIndex) => {
                                        return (
                                            <div key={elementIndex}>
                                                <h4>{element.name}</h4>
                                                <p>{element.phases[getResult(entityIndex, elementIndex) - 1]}</p>
                                                {printFeedback(entityIndex, elementIndex)}
                                                <br/>
                                            </div>
                                        );
                                    })
                                }
                                <br/>
                            </div>
                        );
                    })
                }
            </Card>
        </div>
    )
}

export default ResultFragment;