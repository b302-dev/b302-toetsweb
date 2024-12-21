import {StrictMode} from "react";
import {createRoot} from 'react-dom/client'
import './styles/main.scss'
import 'react-tooltip/dist/react-tooltip.css'
import {ScanDataProvider} from "./utils/contexts/ScanDataContext";
import Router from "./components/layout/Router";
import NavBar from "./components/layout/nav/NavBar";
import {LanguageProvider} from "./utils/contexts/LanguageContext";
import '@/translation/i18n'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <LanguageProvider>
            <ScanDataProvider>
                <div className={'app'}>
                    <Router>
                        <NavBar/>
                    </Router>
                </div>
                <div id="modal-root"/>
            </ScanDataProvider>
        </LanguageProvider>
    </StrictMode>,
)
