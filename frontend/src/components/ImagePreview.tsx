import { motion } from 'motion/react';
import { ArrowLeft, RefreshCcw, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface ImagePreviewProps {
  image: string;
  cropType: string;
  onBack: () => void;
  onAnalyze: () => void;
  onRetake: () => void;
}

const cropLabels: Record<string, string> = {
  tomato: '🍅 Tomato',
  maize: '🌽 Maize',
  cotton: '☁️ Cotton',
  rice: '🌾 Rice',
  wheat: '🌾 Wheat',
  potato: '🥔 Potato',
};

export function ImagePreview({ image, cropType, onBack, onAnalyze, onRetake }: ImagePreviewProps) {
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
            <h2 className="text-white">Preview Image</h2>
            <p className="text-emerald-100 text-sm">Confirm before analysis</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-emerald-200 shadow-xl">
            {/* Crop type badge */}
            <div className="mb-6 flex items-center justify-center">
              <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-6 py-2 rounded-full">
                <span>{cropLabels[cropType]}</span>
              </div>
            </div>

            {/* Image preview */}
            <div className="relative mb-6 rounded-xl overflow-hidden shadow-2xl">
              <motion.img
                src={image}
                alt="Leaf preview"
                className="w-full h-auto max-h-[500px] object-contain bg-gradient-to-br from-emerald-900/5 to-green-900/5"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-emerald-600/20 rounded-xl pointer-events-none" />
            </div>

            {/* Info text */}
            <p className="text-center text-emerald-700 mb-8">
              Make sure the leaf is clearly visible and well-lit for best results
            </p>

            {/* Action buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={onRetake}
                variant="outline"
                className="h-14 border-emerald-300 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-500"
              >
                <RefreshCcw className="w-5 h-5 mr-2" />
                Retake Photo
              </Button>
              <Button
                onClick={onAnalyze}
                className="h-14 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg shadow-emerald-500/30"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Analyze Leaf
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Tips card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <Card className="p-6 bg-gradient-to-r from-emerald-100 to-green-100 border-emerald-300">
            <h3 className="text-emerald-900 mb-3">📸 Tips for Best Results</h3>
            <ul className="space-y-2 text-emerald-700 text-sm">
              <li>• Ensure good lighting on the leaf</li>
              <li>• Hold camera steady to avoid blur</li>
              <li>• Capture the entire leaf with visible symptoms</li>
              <li>• Avoid shadows and reflections</li>
            </ul>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
