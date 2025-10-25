import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle, AlertTriangle, Calendar, Filter, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { AnalysisResult } from './AnalysisScreen';

interface HistoryScreenProps {
  history: AnalysisResult[];
  onBack: () => void;
  onClearHistory: () => void;
}

const cropLabels: Record<string, string> = {
  tomato: '🍅 Tomato',
  maize: '🌽 Maize',
  cotton: '☁️ Cotton',
  rice: '🌾 Rice',
  wheat: '🌾 Wheat',
  potato: '🥔 Potato',
};

export function HistoryScreen({ history, onBack, onClearHistory }: HistoryScreenProps) {
  const [filterCrop, setFilterCrop] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredHistory = history.filter((item) => {
    const matchesCrop = filterCrop === 'all' || item.cropType === filterCrop;
    const matchesStatus = 
      filterStatus === 'all' || 
      (filterStatus === 'healthy' && item.isHealthy) ||
      (filterStatus === 'diseased' && !item.isHealthy);
    return matchesCrop && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white py-4 px-4 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                onClick={onBack}
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
              >
                <ArrowLeft className="w-6 h-6" />
              </Button>
              <div>
                <h2 className="text-white">Analysis History</h2>
                <p className="text-emerald-100 text-sm">{history.length} total analyses</p>
              </div>
            </div>
            {history.length > 0 && (
              <Button
                onClick={onClearHistory}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {history.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-12 text-center bg-white/80 backdrop-blur-sm border-emerald-200">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full flex items-center justify-center">
                <Calendar className="w-12 h-12 text-emerald-600" />
              </div>
              <h3 className="text-emerald-900 mb-2">No History Yet</h3>
              <p className="text-emerald-700 mb-6">
                Your analysis history will appear here once you start detecting diseases
              </p>
              <Button
                onClick={onBack}
                className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white"
              >
                Start First Analysis
              </Button>
            </Card>
          </motion.div>
        ) : (
          <>
            {/* Filters */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <label className="block text-emerald-900 mb-2 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filter by Crop
                </label>
                <Select value={filterCrop} onValueChange={setFilterCrop}>
                  <SelectTrigger className="bg-white border-emerald-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Crops</SelectItem>
                    {Object.entries(cropLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-emerald-900 mb-2 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filter by Status
                </label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="bg-white border-emerald-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="healthy">Healthy Only</SelectItem>
                    <SelectItem value="diseased">Diseased Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>

            {/* History list */}
            <div className="space-y-4">
              {filteredHistory.length === 0 ? (
                <Card className="p-8 text-center bg-white/80 backdrop-blur-sm border-emerald-200">
                  <p className="text-emerald-700">No results match your filters</p>
                </Card>
              ) : (
                filteredHistory.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="p-4 bg-white/80 backdrop-blur-sm border-emerald-200 hover:shadow-lg transition-all">
                      <div className="flex gap-4">
                        {/* Image thumbnail */}
                        <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-emerald-100">
                          <img
                            src={item.image}
                            alt="Analyzed leaf"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                {item.isHealthy ? (
                                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                                ) : (
                                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                                )}
                                <h3 className={item.isHealthy ? 'text-emerald-900' : 'text-orange-900'}>
                                  {item.isHealthy ? 'Healthy Leaf' : item.diseaseName}
                                </h3>
                              </div>
                              <p className="text-emerald-700 text-sm">
                                {cropLabels[item.cropType]}
                              </p>
                            </div>
                            <Badge
                              className={
                                item.isHealthy
                                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                  : 'bg-orange-100 text-orange-800 border-orange-300'
                              }
                            >
                              {item.confidence.toFixed(1)}%
                            </Badge>
                          </div>

                          <div className="flex items-center gap-2 text-emerald-600 text-sm">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(item.date)}</span>
                          </div>

                          {!item.isHealthy && item.treatment && (
                            <div className="mt-2 text-sm text-emerald-700">
                              <p className="line-clamp-2">
                                Treatment: {item.treatment[0]}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>

            {/* Summary stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <Card className="p-6 text-center bg-gradient-to-br from-emerald-100 to-green-100 border-emerald-300">
                <div className="text-3xl mb-2">{history.length}</div>
                <p className="text-emerald-900">Total Analyses</p>
              </Card>
              <Card className="p-6 text-center bg-gradient-to-br from-green-100 to-emerald-100 border-green-300">
                <div className="text-3xl mb-2">
                  {history.filter((h) => h.isHealthy).length}
                </div>
                <p className="text-emerald-900">Healthy Detected</p>
              </Card>
              <Card className="p-6 text-center bg-gradient-to-br from-orange-100 to-red-100 border-orange-300">
                <div className="text-3xl mb-2">
                  {history.filter((h) => !h.isHealthy).length}
                </div>
                <p className="text-orange-900">Diseases Found</p>
              </Card>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
