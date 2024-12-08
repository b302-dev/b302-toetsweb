import { ToastContainer } from 'react-toastify'
import NavBar from './components/layout/nav/NavBar'
import Router from './components/layout/Router'
import { LanguageProvider } from './utils/contexts/LanguageContext'
import { ScanDataProvider } from './utils/contexts/ScanDataContext'

const App = () => {
	return (
		<LanguageProvider>
			<ScanDataProvider>
				<div className={'app'}>
					<Router>
						<NavBar/>
					</Router>
				</div>
				<ToastContainer/>
				<div id="modal-root"/>
			</ScanDataProvider>
		</LanguageProvider>
	)
}

export default App
