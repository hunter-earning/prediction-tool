import { useState, useEffect } from 'react'
import PredictionTool from './predictionTool/PredictionTool'
import AppHub from './AppHub'
import './App.css'

const App = () => {
  // Only keep the setter function since we don't use the state variable
  const [, setSharedPredictionData] = useState<any>(null)
  const [showPredictionTool, setShowPredictionTool] = useState<boolean>(false)
  // State for app and game ID
  const [selectedApp, setSelectedApp] = useState<string>('')
  const [gameId, setGameId] = useState<string>('')  

  useEffect(() => {
    // Check for shared prediction in URL
    const urlParams = new URLSearchParams(window.location.search)
    const predictionParam = urlParams.get('prediction')
    
    if (predictionParam) {
      try {
        // Decode the prediction data
        const predictionData = JSON.parse(decodeURIComponent(predictionParam))
        console.log('Shared prediction:', predictionData)
        
        // Store the prediction data
        setSharedPredictionData(predictionData)
        
        // Remove the prediction parameter from URL
        window.history.replaceState({}, document.title, window.location.pathname)
      } catch (error) {
        console.error('Error parsing prediction data:', error)
      }
    }
  }, [])

  const handleSelectPredictionTool = (appName: string, gameId: string) => {
    setSelectedApp(appName);
    setGameId(gameId);
    setShowPredictionTool(true);
  }

  const handleBackToHub = () => {
    setShowPredictionTool(false);
    setSelectedApp('');
    setGameId('');
  }

  return (
    <div className="app-container">
      <div className="app-background"></div>
      <div className="app-content">
        {showPredictionTool ? (
          <>
            <button 
              className="back-button" 
              onClick={handleBackToHub}
            >
              ← Back to App Hub
            </button>
            <PredictionTool gameId={gameId} appName={selectedApp} />
          </>
        ) : (
          <AppHub onSelectPredictionTool={handleSelectPredictionTool} />
        )}
      </div>
      <footer className="app-footer">
        <p>© {new Date().getFullYear()} Chicken Road Game | All Rights Reserved</p>
      </footer>
    </div>
  )
}

export default App