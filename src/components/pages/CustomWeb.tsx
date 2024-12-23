import Page from "../Page";
import AssignmentModel from "../layout/toetsmodel/AssignmentModel";
import {useState} from "react";
import {Entity} from "../../models/Entity";
import {Phase} from "../../models/Phase";
import {useTranslation} from "react-i18next";
import {useTitle} from "../../utils/hooks/TitleHook";
import {SvgToPng} from "../../utils/SvgConverter";
import Button from "../layout/Button";

const CustomWeb = () => {

    const {t} = useTranslation();
    useTitle(t('pages.customWeb.title'))

    const [results, setResults] = useState<number[]>([0, 0, 0, 0, 0]);

    const onPhaseClick = (entity: Entity, phase: Phase) => {
        const newResults = [...results];
        newResults[entity] = phase;
        setResults(newResults);
    }

    const downloadAssignmentWeb = async () => {
        const assignmentWeb = document.querySelector('.assignment-model');
        if (!assignmentWeb) return;

        const base64Image = await SvgToPng(assignmentWeb);

        const a = document.createElement("a");
        a.href = base64Image;
        a.download = "Image.png";
        a.click();
    }

    return (
        <Page>
            <main className={'custom-web'}>
                <p>{t('pages.customWeb.text')}</p>
                <div className={'flex flex--justify-center'}>
                    <AssignmentModel results={results} onPhaseClick={onPhaseClick}/>
                </div>
                <div className={'flex flex--justify-end'}>
                    <Button onClick={downloadAssignmentWeb}>
                        {t('pages.customWeb.download')}
                    </Button>
                </div>
            </main>
        </Page>
    )
}

export default CustomWeb;
