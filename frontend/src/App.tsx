import { useState } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { HomeScreen } from './components/HomeScreen';
import { ImagePreview } from './components/ImagePreview';
import { AnalysisScreen, AnalysisResult } from './components/AnalysisScreen';
import { HistoryScreen } from './components/HistoryScreen';
import { AboutScreen } from './components/AboutScreen';
import { Button } from './components/ui/button';
import { History, Info } from 'lucide-react';

type Screen = 'splash' | 'home' | 'preview' | 'analysis' | 'history' | 'about';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedCrop, setSelectedCrop] = useState<string>('');
  const [analysisHistory, setAnalysisHistory] = useState<AnalysisResult[]>([]);

  const handleSplashComplete = () => {
    setCurrentScreen('home');
  };

  const handleImageSelected = (image: string, cropType: string) => {
    setSelectedImage(image);
    setSelectedCrop(cropType);
    setCurrentScreen('preview');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
    setSelectedImage('');
    setSelectedCrop('');
  };

  const handleAnalyze = () => {
    setCurrentScreen('analysis');
  };

  const handleRetake = () => {
    setCurrentScreen('home');
    setSelectedImage('');
  };

  const handleSaveToHistory = (result: AnalysisResult) => {
    setAnalysisHistory((prev) => [result, ...prev]);
  };

  const handleAnalyzeAnother = () => {
    setCurrentScreen('home');
    setSelectedImage('');
    setSelectedCrop('');
  };

  const handleViewHistory = () => {
    setCurrentScreen('history');
  };

  const handleViewAbout = () => {
    setCurrentScreen('about');
  };

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear all history?')) {
      setAnalysisHistory([]);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Floating navigation buttons (only on home screen) */}
      {currentScreen === 'home' && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
          <Button
            onClick={handleViewHistory}
            size="icon"
            className="w-14 h-14 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg shadow-emerald-500/30"
          >
            <History className="w-6 h-6" />
          </Button>
          <Button
            onClick={handleViewAbout}
            size="icon"
            className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg shadow-blue-500/30"
          >
            <Info className="w-6 h-6" />
          </Button>
        </div>
      )}

      {/* Screen rendering */}
      {currentScreen === 'splash' && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}

      {currentScreen === 'home' && (
        <HomeScreen onImageSelected={handleImageSelected} />
      )}

      {currentScreen === 'preview' && (
        <ImagePreview
          image={selectedImage}
          cropType={selectedCrop}
          onBack={handleBackToHome}
          onAnalyze={handleAnalyze}
          onRetake={handleRetake}
        />
      )}

      {currentScreen === 'analysis' && (
        <AnalysisScreen
          image={selectedImage}
          cropType={selectedCrop}
          onBack={handleBackToHome}
          onAnalyzeAnother={handleAnalyzeAnother}
          onSaveToHistory={handleSaveToHistory}
        />
      )}

      {currentScreen === 'history' && (
        <HistoryScreen
          history={analysisHistory}
          onBack={handleBackToHome}
          onClearHistory={handleClearHistory}
        />
      )}

      {currentScreen === 'about' && (
        <AboutScreen onBack={handleBackToHome} />
      )}
    </div>
  );
}
