import { useState, useEffect } from 'react'
import './PredictionTool.css'

interface PredictionToolProps {
  onClose?: () => void
  gameId?: string
  appName?: string
}

interface Prediction {
  difficulty: string
  multiplier: number
  timestamp: number
}

const PredictionTool: React.FC<PredictionToolProps> = ({ onClose, gameId, appName }) => {
  const [difficulty, setDifficulty] = useState<string>('medium')
  const [calculating, setCalculating] = useState<boolean>(false)
  const [prediction, setPrediction] = useState<number | null>(null)
  const [multiplier, setMultiplier] = useState<number | null>(null)
  // Share functionality removed
  const [predictionHistory, setPredictionHistory] = useState<Prediction[]>([])
  const [showHistory, setShowHistory] = useState<boolean>(false)
  
  // Load prediction history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('predictionHistory')
    if (savedHistory) {
      setPredictionHistory(JSON.parse(savedHistory))
    }
  }, [])
  
  // Shared prediction functionality removed

  // Multiplier arrays for different difficulty levels - updated to reduce risk
  // Easy mode multipliers with lower risk distribution:
  // 70% chance: 1.01x-1.56x, 25% chance: 1.56x-2.12x, 4% chance: 2.28x-3.28x, 1% chance: 3.70x-5.39x
  const easyMultipliers = [
    // 70% chance (1.01x-1.56x) - 70 entries
    1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01, 1.01,
    1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03, 1.03,
    1.06, 1.06, 1.06, 1.06, 1.06, 1.06, 1.06, 1.06, 1.06, 1.06,
    1.10, 1.10, 1.10, 1.10, 1.10, 1.10, 1.10, 1.10, 1.10, 1.10,
    1.15, 1.15, 1.15, 1.15, 1.15, 1.15, 1.15, 1.15, 1.15, 1.15,
    1.19, 1.19, 1.19, 1.19, 1.19, 1.19, 1.19, 1.19, 1.19, 1.19,
    1.24, 1.24, 1.24, 1.24, 1.24, 1.30, 1.30, 1.30, 1.30, 1.30,
    // 25% chance (1.56x-2.12x) - 25 entries
    1.35, 1.35, 1.35, 1.35, 1.35, 1.42, 1.42, 1.42, 1.42, 1.42,
    1.48, 1.48, 1.48, 1.48, 1.48, 1.56, 1.56, 1.56, 1.56, 1.56,
    1.65, 1.65, 1.75, 1.85, 1.98,
    // 4% chance (2.28x-3.28x) - 4 entries
    2.12, 2.28, 2.47, 2.70,
    // 1% chance (3.70x-5.39x) - 1 entry
    3.70
  ]
  
  // Medium mode multipliers with lower risk distribution:
  // 65% chance: 1.08x-2.05x, 30% chance: 2.37x-5.61x, 5% chance: 6.91x-14.29x
  const mediumMultipliers = [
    // 65% chance (1.08x-2.05x) - 65 entries
    1.08, 1.08, 1.08, 1.08, 1.08, 1.08, 1.08, 1.08, 1.08, 1.08, 1.08, 1.08, 1.08,
    1.21, 1.21, 1.21, 1.21, 1.21, 1.21, 1.21, 1.21, 1.21, 1.21, 1.21, 1.21, 1.21,
    1.37, 1.37, 1.37, 1.37, 1.37, 1.37, 1.37, 1.37, 1.37, 1.37, 1.37, 1.37, 1.37,
    1.56, 1.56, 1.56, 1.56, 1.56, 1.56, 1.56, 1.56, 1.56, 1.56, 1.56, 1.56, 1.56,
    1.78, 1.78, 1.78, 1.78, 1.78, 1.78, 1.78, 1.78, 1.78, 2.05, 2.05, 2.05, 2.05, 2.05,
    // 30% chance (2.37x-5.61x) - 30 entries
    2.37, 2.37, 2.37, 2.37, 2.37, 2.37, 2.37, 2.37, 2.37, 2.37,
    2.77, 2.77, 2.77, 2.77, 2.77, 2.77, 2.77, 2.77, 2.77, 2.77,
    3.24, 3.24, 3.24, 3.24, 3.24, 3.85, 3.85, 4.62, 4.62, 5.61,
    // 5% chance (6.91x-14.29x) - 5 entries
    6.91, 6.91, 8.64, 10.99, 14.29
  ]
  
  // Hard mode multipliers with lower risk distribution:
  // 60% chance: 1.18x-1.83x, 35% chance: 2.31x-5.02x, 5% chance: 6.66x-17.74x
  const hardMultipliers = [
    // 60% chance (1.18x-1.83x) - 60 entries
    1.18, 1.18, 1.18, 1.18, 1.18, 1.18, 1.18, 1.18, 1.18, 1.18,
    1.18, 1.18, 1.18, 1.18, 1.18, 1.18, 1.18, 1.18, 1.18, 1.18,
    1.18, 1.18, 1.18, 1.18, 1.18, 1.18, 1.18, 1.18, 1.18, 1.18,
    1.46, 1.46, 1.46, 1.46, 1.46, 1.46, 1.46, 1.46, 1.46, 1.46,
    1.46, 1.46, 1.46, 1.46, 1.46, 1.46, 1.46, 1.46, 1.46, 1.46,
    1.83, 1.83, 1.83, 1.83, 1.83, 1.83, 1.83, 1.83, 1.83, 1.83,
    // 35% chance (2.31x-5.02x) - 35 entries
    2.31, 2.31, 2.31, 2.31, 2.31, 2.31, 2.31, 2.31, 2.31, 2.31, 2.31, 2.31,
    2.95, 2.95, 2.95, 2.95, 2.95, 2.95, 2.95, 2.95, 2.95, 2.95, 2.95,
    3.82, 3.82, 3.82, 3.82, 3.82, 3.82, 5.02, 5.02, 5.02, 5.02, 5.02, 5.02,
    // 5% chance (6.66x-17.74x) - 5 entries
    6.66, 9.04, 12.52, 17.74, 17.74
  ]
  
  // Hardcore mode multipliers with lower risk distribution:
  // 70% chance: 1.44x-3.45x, 25% chance: 5.53x-9.09x, 5% chance: 15.30x-48.70x
  const hardcoreMultipliers = [
    // 70% chance (1.44x-3.45x) - 70 entries
    1.44, 1.44, 1.44, 1.44, 1.44, 1.44, 1.44, 1.44, 1.44, 1.44,
    1.44, 1.44, 1.44, 1.44, 1.44, 1.44, 1.44, 1.44, 1.44, 1.44,
    1.44, 1.44, 1.44, 1.44, 1.44, 1.44, 1.44, 1.44, 1.44, 1.44,
    2.21, 2.21, 2.21, 2.21, 2.21, 2.21, 2.21, 2.21, 2.21, 2.21,
    2.21, 2.21, 2.21, 2.21, 2.21, 2.21, 2.21, 2.21, 2.21, 2.21,
    3.45, 3.45, 3.45, 3.45, 3.45, 3.45, 3.45, 3.45, 3.45, 3.45,
    3.45, 3.45, 3.45, 3.45, 3.45, 3.45, 3.45, 3.45, 3.45, 3.45,
    // 25% chance (5.53x-9.09x) - 25 entries
    5.53, 5.53, 5.53, 5.53, 5.53, 5.53, 5.53, 5.53, 5.53, 5.53,
    5.53, 5.53, 5.53, 5.53, 5.53, 9.09, 9.09, 9.09, 9.09, 9.09,
    9.09, 9.09, 9.09, 9.09, 9.09,
    // 5% chance (15.30x-48.70x) - 5 entries
    15.30, 15.30, 26.78, 26.78, 48.70
  ]
  
  const calculatePrediction = () => {
    setCalculating(true)
    setPrediction(null)
    setMultiplier(null)
    
    // Simulate calculation delay
    setTimeout(() => {
      // Generate random prediction based on difficulty
      let predictionValue: number
      let multiplierValue: number
      let randomIndex: number
      
      switch (difficulty) {
        case 'easy':
          // For easy mode, most likely to be 1-3 steps
          randomIndex = Math.floor(Math.random() * 100)
          if (randomIndex < 60) { // 60% chance of 1-2 steps
            predictionValue = Math.floor(Math.random() * 2) + 1
          } else if (randomIndex < 90) { // 30% chance of 3-4 steps
            predictionValue = Math.floor(Math.random() * 2) + 3
          } else { // 10% chance of 5-6 steps
            predictionValue = Math.floor(Math.random() * 2) + 5
          }
          // Select a random multiplier from the easy multipliers array
          multiplierValue = easyMultipliers[Math.floor(Math.random() * easyMultipliers.length)]
          break
        case 'medium':
          // For medium mode, most likely to be 1-2 steps
          randomIndex = Math.floor(Math.random() * 100)
          if (randomIndex < 70) { // 70% chance of 1-2 steps
            predictionValue = Math.floor(Math.random() * 2) + 1
          } else if (randomIndex < 95) { // 25% chance of 3-4 steps
            predictionValue = Math.floor(Math.random() * 2) + 3
          } else { // 5% chance of 5 steps
            predictionValue = 5
          }
          // Select a random multiplier from the medium multipliers array
          multiplierValue = mediumMultipliers[Math.floor(Math.random() * mediumMultipliers.length)]
          break
        case 'hard':
          // For hard mode, most likely to be 1 step
          randomIndex = Math.floor(Math.random() * 100)
          if (randomIndex < 80) { // 80% chance of 1 step
            predictionValue = 1
          } else if (randomIndex < 95) { // 15% chance of 2 steps
            predictionValue = 2
          } else { // 5% chance of 3 steps
            predictionValue = 3
          }
          // Select a random multiplier from the hard multipliers array
          multiplierValue = hardMultipliers[Math.floor(Math.random() * hardMultipliers.length)]
          break
        case 'extreme': // Using 'extreme' in code but displaying as 'Hardcore' in UI
          // For hardcore mode, based on user data: 40% at first step, 50% at 2nd step, 10% at 3rd step
          randomIndex = Math.floor(Math.random() * 100)
          if (randomIndex < 40) { // 40% chance of 1 step
            predictionValue = 1
          } else if (randomIndex < 90) { // 50% chance of 2 steps
            predictionValue = 2
          } else { // 10% chance of 3 steps
            predictionValue = 3
          }
          // Select a random multiplier from the hardcore multipliers array
          multiplierValue = hardcoreMultipliers[Math.floor(Math.random() * hardcoreMultipliers.length)]
          break
        default:
          predictionValue = Math.floor(Math.random() * 3) + 1 // 1-3 steps
          multiplierValue = mediumMultipliers[Math.floor(Math.random() * mediumMultipliers.length)]
      }
      
      setPrediction(predictionValue)
      setMultiplier(multiplierValue)
      setCalculating(false)
      
      // Save to prediction history
      const newPrediction: Prediction = {
        difficulty,
        multiplier: multiplierValue,
        timestamp: Date.now()
      }
      
      const updatedHistory = [newPrediction, ...predictionHistory].slice(0, 10) // Keep only last 10 predictions
      setPredictionHistory(updatedHistory)
      localStorage.setItem('predictionHistory', JSON.stringify(updatedHistory))
    }, 2000)
  }

  // Share functionality removed

  const toggleHistory = () => {
    setShowHistory(!showHistory)
  }

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  // Profit tips based on difficulty and lower-risk multiplier distributions
  const getProfitTip = () => {
    switch (difficulty) {
      case 'easy':
        return 'Tip: Easy mode offers frequent smaller wins with minimal risk. 70% chance of 1.01x-1.56x, 25% chance of 1.56x-2.12x, 4% chance of 2.28x-3.28x, and only 1% chance of reaching 3.70x.'
      case 'medium':
        return 'Tip: Medium mode has balanced risk-reward. 65% chance of 1.08x-2.05x, 30% chance of 2.37x-5.61x, and only 5% chance of reaching 6.91x-14.29x.'
      case 'hard':
        return 'Tip: Hard mode offers higher potential with moderate risk. 60% chance of 1.18x-1.83x, 35% chance of 2.31x-5.02x, and only 5% chance of reaching 6.66x-17.74x.'
      case 'extreme':
        return 'Tip: Hardcore mode has the highest potential returns with controlled risk. 70% chance of 1.44x-3.45x, 25% chance of 5.53x-9.09x, and only 5% chance of reaching 15.30x-48.70x.'
      default:
        return 'Tip: Select a difficulty level that matches your risk tolerance. All modes have been optimized to minimize losses while maintaining exciting potential returns.'
    }
  }

  return (
    <div className="prediction-tool-container">
      <div className="prediction-tool">
        <div className="prediction-header">
          <div className="logo-container">
            <img src="./chickenroad-logo.png" alt="Chicken Road Logo" className="header-logo" />
            {(gameId || appName) && (
              <div className="game-info">
                {appName && <span className="app-name">{appName}</span>}
                {gameId && <span className="game-id">Game ID: {gameId}</span>}
              </div>
            )}
          </div>
          {onClose && (
            <button className="close-button" onClick={onClose}>
              ×
            </button>
          )}
        </div>
        
        <div className="hero-image-container">
          <img src="./hero-img.png" alt="Hero Image" className="hero-image" />
        </div>
        
        <div className="prediction-content-top">
          {calculating ? (
            <div className="calculating">
              <div className="chicken-bounce"></div>
              <p className="calculating-text">Calculating prediction</p>
            </div>
          ) : prediction !== null ? (
            <div className="prediction-result-top">
              <div className="result-box-top">
                <div className="result-item">
                  <span className="result-label">Cross at:</span>
                  <span className="result-value">{prediction} seconds</span>
                </div>
                <div className="result-item">
                  <span className="result-label">Multiplier:</span>
                  <span className="result-value">{multiplier}x</span>
                </div>
                <button className="recalculate-top" onClick={calculatePrediction}>
                  <span className="calculate-icon">🔄</span>
                  Predict Again
                </button>
              </div>
            </div>
          ) : (
            <div className="quick-calculate">
              <button className="quick-calculate-button" onClick={calculatePrediction}>
                <span className="calculate-icon">🔮</span>
                Predict
              </button>
            </div>
          )}
        </div>
        
        <div className="difficulty-selector">
          <h3>Select Difficulty:</h3>
          <div className="difficulty-buttons">
            <button 
              className={`difficulty-button ${difficulty === 'easy' ? 'active' : ''}`}
              onClick={() => setDifficulty('easy')}
            >
              Easy
            </button>
            <button 
              className={`difficulty-button ${difficulty === 'medium' ? 'active' : ''}`}
              onClick={() => setDifficulty('medium')}
            >
              Medium
            </button>
            <button 
              className={`difficulty-button ${difficulty === 'hard' ? 'active' : ''}`}
              onClick={() => setDifficulty('hard')}
            >
              Hard
            </button>
            <button 
              className={`difficulty-button ${difficulty === 'extreme' ? 'active' : ''}`}
              onClick={() => setDifficulty('extreme')}
            >
              Hardcore
            </button>
          </div>
        </div>
        
        {/* Share prediction functionality removed */}
        
        {prediction === null && !calculating && (
          <div className="prediction-content">
            <div className="prediction-start">
              <p>Get a prediction for when to cross the road in the Chicken Road game!</p>
              <p className="profit-tip">{getProfitTip()}</p>
            </div>
          </div>
        )}
        
        <div className="history-section">
          <button className="history-toggle" onClick={toggleHistory}>
            {showHistory ? 'Hide History' : 'Show Prediction History'}
          </button>
          
          {showHistory && predictionHistory.length > 0 && (
            <div className="history-list">
              {predictionHistory.map((item, index) => (
                <div key={index} className="history-item">
                  <div className="history-difficulty">{item.difficulty}</div>
                  <div className="history-multiplier">{item.multiplier}x</div>
                  <div className="history-time">{formatTimestamp(item.timestamp)}</div>
                </div>
              ))}
            </div>
          )}
          
          {showHistory && predictionHistory.length === 0 && (
            <p className="no-history">No prediction history yet</p>
          )}
        </div>
        
        <div className="prediction-footer">
          <p>Use this tool to improve your chances in the Chicken Road game!</p>
          <div className="social-links">
            <a href="#" className="social-link" title="Twitter">Twitter</a>
            <a href="#" className="social-link" title="Discord">Discord</a>
            <a href="#" className="social-link" title="Telegram">Telegram</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PredictionTool