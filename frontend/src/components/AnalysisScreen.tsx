import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, AlertTriangle, ArrowLeft, Download, RotateCcw, Leaf } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

interface AnalysisScreenProps {
  image: string;
  cropType: string;
  onBack: () => void;
  onAnalyzeAnother: () => void;
  onSaveToHistory: (result: AnalysisResult) => void;
}

export interface AnalysisResult {
  id: string;
  date: string;
  cropType: string;
  isHealthy: boolean;
  diseaseName?: string;
  confidence: number;
  cause?: string;
  symptoms?: string[];
  treatment?: string[];
  prevention?: string[];
  image: string;
}

// Mock disease database
const diseaseDatabase: Record<string, any> = {
  tomato: [
    {
      name: 'Early Blight',
      cause: 'Fungal infection caused by Alternaria solani',
      symptoms: [
        'Dark brown spots with concentric rings',
        'Yellowing of older leaves',
        'Leaf wilting and dropping',
      ],
      treatment: [
        'Apply copper-based fungicides',
        'Remove infected leaves immediately',
        'Ensure proper air circulation',
      ],
      prevention: [
        'Rotate crops annually',
        'Water at soil level, avoid wetting leaves',
        'Maintain proper plant spacing',
      ],
    },
    {
      name: 'Late Blight',
      cause: 'Oomycete pathogen Phytophthora infestans',
      symptoms: [
        'Water-soaked lesions on leaves',
        'White mold on leaf undersides',
        'Rapid plant collapse in humid conditions',
      ],
      treatment: [
        'Apply systemic fungicides immediately',
        'Remove and destroy infected plants',
        'Improve drainage',
      ],
      prevention: [
        'Use resistant varieties',
        'Avoid overhead irrigation',
        'Monitor weather for high humidity',
      ],
    },
  ],
  maize: [
    {
      name: 'Northern Corn Leaf Blight',
      cause: 'Fungus Exserohilum turcicum',
      symptoms: [
        'Long, elliptical gray-green lesions',
        'Lesions may merge causing large blighted areas',
        'Reduced photosynthesis',
      ],
      treatment: [
        'Apply triazole fungicides',
        'Remove crop residue after harvest',
        'Use hybrid resistant varieties',
      ],
      prevention: [
        'Plant resistant hybrids',
        'Crop rotation with non-host crops',
        'Timely planting to avoid peak disease period',
      ],
    },
  ],
  cotton: [
    {
      name: 'Cotton Leaf Curl Disease',
      cause: 'Whitefly-transmitted virus',
      symptoms: [
        'Upward or downward curling of leaves',
        'Thickening of veins',
        'Stunted plant growth',
      ],
      treatment: [
        'Control whitefly population with insecticides',
        'Remove and destroy infected plants',
        'Use virus-free planting material',
      ],
      prevention: [
        'Plant resistant varieties',
        'Control whitefly vectors',
        'Remove alternate hosts nearby',
      ],
    },
  ],
  rice: [
    {
      name: 'Bacterial Leaf Blight',
      cause: 'Bacterium Xanthomonas oryzae',
      symptoms: [
        'Water-soaked lesions on leaf tips',
        'Yellow to white lesions with wavy margins',
        'Wilting of seedlings',
      ],
      treatment: [
        'Apply copper-based bactericides',
        'Remove infected plants',
        'Drain and dry fields temporarily',
      ],
      prevention: [
        'Use resistant varieties',
        'Avoid excess nitrogen fertilizer',
        'Maintain proper water management',
      ],
    },
  ],
  wheat: [
    {
      name: 'Wheat Rust',
      cause: 'Fungal pathogen (Puccinia species)',
      symptoms: [
        'Orange to red-brown pustules on leaves',
        'Yellow halos around pustules',
        'Premature leaf death',
      ],
      treatment: [
        'Apply fungicides at early detection',
        'Remove volunteer wheat plants',
        'Improve field sanitation',
      ],
      prevention: [
        'Use rust-resistant varieties',
        'Monitor fields regularly',
        'Plant at recommended times',
      ],
    },
  ],
  potato: [
    {
      name: 'Potato Late Blight',
      cause: 'Oomycete Phytophthora infestans',
      symptoms: [
        'Dark water-soaked lesions on leaves',
        'White fungal growth on undersides',
        'Brown to black stem lesions',
      ],
      treatment: [
        'Apply systemic fungicides',
        'Hill up soil around plants',
        'Harvest tubers promptly',
      ],
      prevention: [
        'Use certified disease-free seed',
        'Avoid overhead irrigation',
        'Maintain good drainage',
      ],
    },
  ],
};

export function AnalysisScreen({ image, cropType, onBack, onAnalyzeAnother, onSaveToHistory }: AnalysisScreenProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    // Simulate AI analysis with progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        
        // Simulate analysis completion
        setTimeout(() => {
          const isHealthy = Math.random() > 0.4; // 60% chance of disease for demo
          let analysisResult: AnalysisResult;

          if (isHealthy) {
            analysisResult = {
              id: Date.now().toString(),
              date: new Date().toISOString(),
              cropType,
              isHealthy: true,
              confidence: 92 + Math.random() * 7,
              image,
            };
          } else {
            const diseases = diseaseDatabase[cropType] || [];
            const disease = diseases[Math.floor(Math.random() * diseases.length)];
            
            analysisResult = {
              id: Date.now().toString(),
              date: new Date().toISOString(),
              cropType,
              isHealthy: false,
              diseaseName: disease?.name || 'Unknown Disease',
              confidence: 85 + Math.random() * 10,
              cause: disease?.cause,
              symptoms: disease?.symptoms,
              treatment: disease?.treatment,
              prevention: disease?.prevention,
              image,
            };
          }

          setResult(analysisResult);
          setIsAnalyzing(false);
        }, 500);
      }
      setProgress(Math.min(currentProgress, 100));
    }, 200);

    return () => clearInterval(interval);
  }, [cropType, image]);

  const handleSave = () => {
    if (result) {
      onSaveToHistory(result);
      alert('Analysis saved to history!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white py-4 px-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <Button
            onClick={onBack}
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h2 className="text-white">Analysis Results</h2>
            <p className="text-emerald-100 text-sm">AI-powered detection</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {isAnalyzing ? (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Card className="p-8 bg-white/80 backdrop-blur-sm border-emerald-200 shadow-xl">
                <div className="text-center">
                  {/* Animated scanning icon */}
                  <motion.div
                    className="w-24 h-24 mx-auto mb-6 relative"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-green-600 rounded-full opacity-20 blur-xl" />
                    <div className="relative w-full h-full bg-gradient-to-br from-emerald-600 to-green-600 rounded-full flex items-center justify-center">
                      <Leaf className="w-12 h-12 text-white" />
                    </div>
                  </motion.div>

                  <h3 className="text-emerald-900 mb-2">Analyzing Leaf...</h3>
                  <p className="text-emerald-700 mb-6">
                    AI is examining texture, color patterns, and disease signatures
                  </p>

                  {/* Progress bar */}
                  <div className="max-w-md mx-auto">
                    <Progress value={progress} className="h-3 mb-2" />
                    <p className="text-emerald-600 text-sm">{Math.round(progress)}% complete</p>
                  </div>

                  {/* Analysis steps */}
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { label: 'Scanning Image', delay: 0 },
                      { label: 'Detecting Patterns', delay: 0.5 },
                      { label: 'Identifying Disease', delay: 1 },
                    ].map((step, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: progress > index * 30 ? 1 : 0.3, y: 0 }}
                        transition={{ delay: step.delay }}
                        className="text-emerald-700 text-sm"
                      >
                        {step.label}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {result?.isHealthy ? (
                // Healthy result
                <Card className="p-8 bg-white/80 backdrop-blur-sm border-emerald-200 shadow-xl">
                  <div className="text-center mb-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/50"
                    >
                      <CheckCircle className="w-14 h-14 text-white" />
                    </motion.div>
                    <h2 className="text-emerald-900 mb-2">Healthy Leaf! 🎉</h2>
                    <p className="text-emerald-700 text-lg">
                      No diseases detected in your {cropType} crop
                    </p>
                    <Badge className="mt-4 bg-emerald-100 text-emerald-800 border-emerald-300">
                      {result.confidence.toFixed(1)}% Confidence
                    </Badge>
                  </div>

                  <div className="bg-gradient-to-r from-emerald-100 to-green-100 rounded-lg p-6 mb-6 border border-emerald-300">
                    <h3 className="text-emerald-900 mb-3">✅ What this means:</h3>
                    <ul className="space-y-2 text-emerald-700">
                      <li>• Your crop appears to be in good health</li>
                      <li>• Continue regular monitoring and maintenance</li>
                      <li>• Keep following good agricultural practices</li>
                      <li>• Check plants regularly for early signs of issues</li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button
                      onClick={onAnalyzeAnother}
                      variant="outline"
                      className="h-14 border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                    >
                      <RotateCcw className="w-5 h-5 mr-2" />
                      Analyze Another Leaf
                    </Button>
                    <Button
                      onClick={handleSave}
                      className="h-14 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Save Report
                    </Button>
                  </div>
                </Card>
              ) : (
                // Disease detected
                <Card className="p-8 bg-white/80 backdrop-blur-sm border-orange-200 shadow-xl">
                  <div className="text-center mb-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/50"
                    >
                      <AlertTriangle className="w-14 h-14 text-white" />
                    </motion.div>
                    <h2 className="text-orange-900 mb-2">Disease Detected</h2>
                    <p className="text-orange-700 text-lg mb-4">{result?.diseaseName}</p>
                    <Badge className="bg-orange-100 text-orange-800 border-orange-300">
                      {result?.confidence.toFixed(1)}% Confidence
                    </Badge>
                  </div>

                  {/* Cause */}
                  {result?.cause && (
                    <div className="mb-6">
                      <h3 className="text-orange-900 mb-2">🔬 Cause:</h3>
                      <p className="text-orange-700 bg-orange-50 p-4 rounded-lg border border-orange-200">
                        {result.cause}
                      </p>
                    </div>
                  )}

                  {/* Symptoms */}
                  {result?.symptoms && result.symptoms.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-orange-900 mb-2">🔍 Symptoms:</h3>
                      <ul className="space-y-2 bg-orange-50 p-4 rounded-lg border border-orange-200">
                        {result.symptoms.map((symptom, index) => (
                          <li key={index} className="text-orange-700">
                            • {symptom}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Treatment */}
                  {result?.treatment && result.treatment.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-emerald-900 mb-2">💊 Treatment:</h3>
                      <ul className="space-y-2 bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                        {result.treatment.map((step, index) => (
                          <li key={index} className="text-emerald-700">
                            • {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Prevention */}
                  {result?.prevention && result.prevention.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-blue-900 mb-2">🛡️ Prevention:</h3>
                      <ul className="space-y-2 bg-blue-50 p-4 rounded-lg border border-blue-200">
                        {result.prevention.map((measure, index) => (
                          <li key={index} className="text-blue-700">
                            • {measure}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button
                      onClick={onAnalyzeAnother}
                      variant="outline"
                      className="h-14 border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                    >
                      <RotateCcw className="w-5 h-5 mr-2" />
                      Analyze Another Leaf
                    </Button>
                    <Button
                      onClick={handleSave}
                      className="h-14 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Save Report
                    </Button>
                  </div>
                </Card>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
