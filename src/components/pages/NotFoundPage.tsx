import React, { FunctionComponent } from 'react';
import {Page} from 'react-ts-boiler';

interface Props {}

const NotFoundPage: FunctionComponent<Props> = () => {

    return (
        <Page>
            <p>404 Pagina niet gevonden</p>
        </Page>
    );
};

export default NotFoundPage;
