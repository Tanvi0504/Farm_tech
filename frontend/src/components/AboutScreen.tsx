import { motion } from 'motion/react';
import { ArrowLeft, Brain, Camera, Shield, Lightbulb, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface AboutScreenProps {
  onBack: () => void;
}

export function AboutScreen({ onBack }: AboutScreenProps) {
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
            <h2 className="text-white">About CropCare AI</h2>
            <p className="text-emerald-100 text-sm">How it works</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-8 mb-6 bg-gradient-to-br from-emerald-600 to-green-600 text-white border-none shadow-xl">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-white mb-3">AI-Powered Crop Disease Detection</h2>
              <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
                Helping farmers protect their crops with advanced machine learning and computer vision technology
              </p>
            </div>
          </Card>
        </motion.div>

        {/* How it works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card className="p-8 bg-white/80 backdrop-blur-sm border-emerald-200">
            <h3 className="text-emerald-900 mb-6 flex items-center gap-2">
              <Brain className="w-6 h-6" />
              How Our AI Works
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-12 h-12 flex-shrink-0 bg-gradient-to-br from-emerald-600 to-green-600 rounded-lg flex items-center justify-center text-white">
                  1
                </div>
                <div>
                  <h4 className="text-emerald-900 mb-1">Image Processing</h4>
                  <p className="text-emerald-700">
                    Your uploaded image is preprocessed to enhance clarity and extract key features like texture, color patterns, and leaf structure.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 flex-shrink-0 bg-gradient-to-br from-emerald-600 to-green-600 rounded-lg flex items-center justify-center text-white">
                  2
                </div>
                <div>
                  <h4 className="text-emerald-900 mb-1">Deep Learning Analysis</h4>
                  <p className="text-emerald-700">
                    Our convolutional neural network (CNN) model, trained on thousands of crop disease images, analyzes the patterns to identify potential diseases.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 flex-shrink-0 bg-gradient-to-br from-emerald-600 to-green-600 rounded-lg flex items-center justify-center text-white">
                  3
                </div>
                <div>
                  <h4 className="text-emerald-900 mb-1">Disease Classification</h4>
                  <p className="text-emerald-700">
                    The model classifies the leaf condition and provides detailed information about detected diseases, including causes, symptoms, and recommended treatments.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Tips for best results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Card className="p-8 bg-white/80 backdrop-blur-sm border-emerald-200">
            <h3 className="text-emerald-900 mb-6 flex items-center gap-2">
              <Lightbulb className="w-6 h-6" />
              Tips for Best Results
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  icon: <Camera className="w-5 h-5" />,
                  title: 'Good Lighting',
                  desc: 'Capture images in natural daylight for best color accuracy',
                },
                {
                  icon: '🔍',
                  title: 'Clear Focus',
                  desc: 'Ensure the leaf is in sharp focus without blur',
                },
                {
                  icon: '📏',
                  title: 'Proper Distance',
                  desc: 'Fill the frame with the leaf, not too close or far',
                },
                {
                  icon: '🎯',
                  title: 'Show Symptoms',
                  desc: 'Include visible disease symptoms in the image',
                },
                {
                  icon: '🌿',
                  title: 'Single Leaf',
                  desc: 'Focus on one leaf at a time for accurate results',
                },
                {
                  icon: '💧',
                  title: 'Dry Surface',
                  desc: 'Avoid wet leaves as water droplets may affect analysis',
                },
              ].map((tip, index) => (
                <div key={index} className="flex gap-3 p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-lg border border-emerald-200">
                  <div className="text-2xl flex-shrink-0">
                    {typeof tip.icon === 'string' ? tip.icon : tip.icon}
                  </div>
                  <div>
                    <h4 className="text-emerald-900 mb-1">{tip.title}</h4>
                    <p className="text-emerald-700 text-sm">{tip.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Technology stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <Card className="p-8 bg-white/80 backdrop-blur-sm border-emerald-200">
            <h3 className="text-emerald-900 mb-6 flex items-center gap-2">
              <Shield className="w-6 h-6" />
              Our Technology
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🧠</span>
                </div>
                <h4 className="text-emerald-900 mb-1">Machine Learning</h4>
                <p className="text-emerald-700 text-sm">
                  Advanced neural networks trained on extensive disease datasets
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">👁️</span>
                </div>
                <h4 className="text-emerald-900 mb-1">Computer Vision</h4>
                <p className="text-emerald-700 text-sm">
                  Pattern recognition and image analysis algorithms
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <h4 className="text-emerald-900 mb-1">Data Science</h4>
                <p className="text-emerald-700 text-sm">
                  Evidence-based recommendations from agricultural research
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-300">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h4 className="text-amber-900 mb-2">Important Disclaimer</h4>
                <p className="text-amber-800 text-sm leading-relaxed">
                  The results provided by CropCare AI are for <strong>guidance purposes only</strong>. While our AI model is trained to provide accurate disease detection, it should not replace professional agricultural advice. We strongly recommend verifying the results with a certified agricultural expert or plant pathologist before taking any major treatment actions. This app is designed to assist farmers in early disease detection and should be used as a supplementary tool alongside traditional agricultural practices.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Footer info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-emerald-600 text-sm"
        >
          <p>CropCare AI v1.0 | Built with ❤️ for farmers</p>
        </motion.div>
      </div>
    </div>
  );
}
