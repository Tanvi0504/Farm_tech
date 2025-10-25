import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Upload, Camera, Sparkles, Info } from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card } from './ui/card';

interface HomeScreenProps {
  onImageSelected: (image: string, cropType: string) => void;
}

const cropTypes = [
  { value: 'tomato', label: '🍅 Tomato' },
  { value: 'maize', label: '🌽 Maize' },
  { value: 'cotton', label: '☁️ Cotton' },
  { value: 'rice', label: '🌾 Rice' },
  { value: 'wheat', label: '🌾 Wheat' },
  { value: 'potato', label: '🥔 Potato' },
];

export function HomeScreen({ onImageSelected }: HomeScreenProps) {
  const [selectedCrop, setSelectedCrop] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && selectedCrop) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelected(reader.result as string, selectedCrop);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    if (!selectedCrop) {
      alert('Please select a crop type first');
      return;
    }
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white py-6 px-4 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-white">CropCare AI</h1>
              <p className="text-emerald-100 text-sm">Smart Disease Detection</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-8 bg-white/80 backdrop-blur-sm border-emerald-200 shadow-xl">
            {/* Title section */}
            <div className="text-center mb-8">
              <h2 className="text-emerald-900 mb-2">Start Your Analysis</h2>
              <p className="text-emerald-700">Upload or capture a leaf image to detect diseases</p>
            </div>

            {/* Crop selector */}
            <div className="mb-8">
              <label className="block text-emerald-900 mb-3">
                Select Crop Type
              </label>
              <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                <SelectTrigger className="w-full h-14 bg-white border-emerald-300 hover:border-emerald-500 transition-colors">
                  <SelectValue placeholder="Choose your crop..." />
                </SelectTrigger>
                <SelectContent>
                  {cropTypes.map((crop) => (
                    <SelectItem key={crop.value} value={crop.value}>
                      {crop.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Upload button */}
            <div className="mb-6">
              <Button
                onClick={handleUploadClick}
                disabled={!selectedCrop}
                className="w-full h-16 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg shadow-emerald-500/30 transition-all hover:shadow-xl hover:shadow-emerald-500/40"
              >
                <div className="flex items-center justify-center gap-3">
                  <Upload className="w-6 h-6" />
                  <span className="text-lg">Upload or Capture Leaf Image</span>
                  <Camera className="w-6 h-6" />
                </div>
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {/* Info card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-emerald-100 to-green-100 rounded-lg p-4 border border-emerald-300"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Info className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-emerald-900 mb-1">How it works</p>
                  <p className="text-emerald-700 text-sm">
                    AI analyzes texture, color, and patterns to detect diseases with high accuracy. Get instant results and treatment recommendations.
                  </p>
                </div>
              </div>
            </motion.div>
          </Card>
        </motion.div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {[
            { icon: '🎯', title: 'Accurate Detection', desc: 'AI-powered analysis' },
            { icon: '⚡', title: 'Instant Results', desc: 'Get results in seconds' },
            { icon: '📊', title: 'Track History', desc: 'Monitor crop health' },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <Card className="p-6 text-center bg-white/60 backdrop-blur-sm border-emerald-200 hover:shadow-lg transition-all hover:scale-105">
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-emerald-900 mb-1">{feature.title}</h3>
                <p className="text-emerald-700 text-sm">{feature.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
