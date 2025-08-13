import { useState, useEffect } from 'react';
import './AppHub.css';

interface AppTileProps {
  title: string;
  description?: string;
  icon?: string;
  url?: string;
  showDownloadButton?: boolean;
}

const AppTile: React.FC<AppTileProps> = ({ title, description, icon, url, showDownloadButton }) => {
  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (url) {
      window.open(url, '_blank');
    }
  };

  // Special case for prediction tool to keep its original layout
  if (title === 'Prediction Tool') {
    return (
      <div className="app-tile prediction-tool-tile">
        {icon && <div className="app-icon">
          <img src={icon} alt={`${title} icon`} />
        </div>}
        <div className="app-info">
          <h3>{title}</h3>
          {description && <p>{description}</p>}
          {showDownloadButton && url && (
            <button className="download-button" onClick={handleDownload}>
              Download
            </button>
          )}
        </div>
      </div>
    );
  }

  // New horizontal layout for other app tiles
  return (
    <div className="app-tile horizontal-tile">
      {/* Logo on left */}
      {icon && <div className="app-icon-horizontal">
        <img src={icon} alt={`${title} icon`} />
      </div>}
      
      {/* Name and bonus info in center */}
      <div className="app-info-horizontal">
        <h3>{title}</h3>
        {description && <p className="bonus-text">{description}</p>}
      </div>
      
      {/* Download button on right */}
      {showDownloadButton && url && (
        <div className="download-button-container">
          <button className="download-button" onClick={handleDownload}>
            <span>Download</span>
          </button>
        </div>
      )}
    </div>
  );
};

interface AppHubProps {
  onSelectPredictionTool: (appName: string, gameId: string) => void;
}

const AppHub: React.FC<AppHubProps> = ({ onSelectPredictionTool }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState<string>('');
  const [gameId, setGameId] = useState<string>('');
  const [error, setError] = useState<string>('');
  // const [imagesLoaded, setImagesLoaded] = useState<{[key: string]: boolean}>({});

  // App data with real information
  const apps = [
    {
      id: 'rummypaisa',
      title: 'RUMMY PAISA',
      description: '₹30 Signup Bonus',
      url: 'https://www.rummypaisa.vip/share/6ZftVxy',
      icon: './rummy-paisa.jpeg',
      showDownloadButton: true
    },
    {
      id: 'junglehaan',
      title: 'JUNGLE HAAN',
      description: '₹30 Signup Bonus',
      url: 'https://www.junglehaan.com/share/6Ia6Ixy',
      icon: './jungle-haan1.png',
      showDownloadButton: true
    },
    {
      id: 'tufanirummy',
      title: 'TUFANI RUMMY',
      description: '₹30 Signup Bonus',
      url: 'https://www.tufanirummy.com/share/39iy3xy',
      icon: './tufani-rummy.jpg',
      showDownloadButton: true
    },
    {
      id: 'realteenpatti',
      title: 'REAL TEEN PATTI',
      description: '₹30 Signup Bonus',
      url: 'https://www.realteenpatii.com/share/6d5pIxy',
      icon: './realteenpatti.png',
      showDownloadButton: true
    },
    {
      id: 'rummya1',
      title: 'RUMMY A1',
      description: '₹30 Signup Bonus',
      url: 'https://www.rummya1.vip/share/6d5cjxy',
      icon: './rummy-a1.png',
      showDownloadButton: true
    },
    {
      id: 'prediction-tool',
      title: 'Prediction Tool',
      description: 'Chicken Road Game Prediction Tool',
      icon: './chickengif2.gif',
      showDownloadButton: false
    }
  ];

  const handleAppClick = (app: any) => {
    if (app.id === 'prediction-tool') {
      setSelectedApp('');
      setGameId('');
      setError('');
      setShowModal(true);
    } else if (app.url) {
      window.open(app.url, '_blank');
    }
  };

  const handleAppSelection = (appId: string) => {
    setSelectedApp(appId);
    setError('');
  };

  const handleSubmit = () => {
    if (!selectedApp) {
      setError('Please select an app');
      return;
    }
    
    if (!gameId.trim()) {
      setError('Please enter a game ID');
      return;
    }
    
    // Find the app name from the selected app ID
    const app = apps.find(a => a.id === selectedApp);
    const appName = app ? app.title : '';
    
    onSelectPredictionTool(appName, gameId);
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedApp('');
    setGameId('');
    setError('');
  };

  // Preload images
  useEffect(() => {
    apps.forEach(app => {
      if (app.icon) {
        const img = new Image();
        img.src = app.icon;
        // Image preloading without tracking loaded state
      }
    });
  }, []);

  return (
    <div className="app-hub-container">
      <div className="app-hub-header">
        <img src="./chickenroad-logo.png" alt="Chicken Road Logo" className="hub-logo" />
        <h1 className="improved-font">TOP APPLICATIONS</h1>
        <p className="note">*prediction tool only works on following platforms *</p>
      </div>
      
      <div className="app-grid">
        {apps.map(app => (
          <div key={app.id} onClick={() => handleAppClick(app)} className="app-tile-wrapper">
            <AppTile
              title={app.title}
              description={app.description}
              icon={app.icon}
              url={app.url}
              showDownloadButton={app.showDownloadButton}
            />
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>Select App & Game ID</h2>
              <button className="modal-close" onClick={handleCloseModal}>×</button>
            </div>
            <div className="modal-content">
              <div className="app-selection">
                <h3>Select App:</h3>
                <div className="app-options">
                  {apps.filter(app => app.id !== 'prediction-tool').map(app => (
                    <div 
                      key={app.id} 
                      className={`app-option ${selectedApp === app.id ? 'selected' : ''}`}
                      onClick={() => handleAppSelection(app.id)}
                    >
                      {app.icon && <img src={app.icon} alt={app.title} className="app-option-icon" />}
                      <span className="app-option-text">{app.title}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="game-id-input">
                <h3>Enter Game ID:</h3>
                <input 
                  type="text" 
                  value={gameId}
                  onChange={(e) => setGameId(e.target.value)}
                  placeholder="Enter game ID"
                />
              </div>
              
              {error && <div className="error-message">{error}</div>}
              
              <button className="proceed-button" onClick={handleSubmit}>
                Proceed to Prediction Tool
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppHub;