'use client'

import { useState, useEffect } from 'react'
import { debug } from '@/lib/cursor-debug'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { RefreshCw, AlertTriangle, Info, Clock, Activity } from 'lucide-react'

interface DebugPanelProps {
  isVisible?: boolean
  onClose?: () => void
}

export function CursorDebugPanel({ isVisible = false, onClose }: DebugPanelProps) {
  const [logs, setLogs] = useState<any[]>([])
  const [metrics, setMetrics] = useState<any[]>([])
  const [errorSummary, setErrorSummary] = useState<any>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const refreshData = async () => {
    setIsRefreshing(true)
    try {
      const recentLogs = debug.getLogs(50)
      const recentMetrics: any[] = [] // TODO: Implement performance metrics
      const errors = debug.getErrors()
      
      setLogs(recentLogs)
      setMetrics(recentMetrics)
      setErrorSummary(errors)
    } catch (error) {
      console.error('Failed to refresh debug data:', error)
    } finally {
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    if (isVisible) {
      refreshData()
      const interval = setInterval(refreshData, 5000) // Refresh every 5 seconds
      return () => clearInterval(interval)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 w-96 h-96 bg-background border rounded-lg shadow-lg z-50">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-semibold">Cursor Debug Panel</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={refreshData}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
          {onClose && (
            <Button variant="ghost" size="sm" onClick={onClose}>
              ×
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="overview" className="h-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="h-80 p-4">
          <ScrollArea className="h-full">
            {errorSummary && (
              <Card className="mb-4">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    Error Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Total Errors:</span>
                    <Badge variant="destructive">{errorSummary.totalErrors}</Badge>
                  </div>
                  {Object.entries(errorSummary.errorTypes).map(([type, count]) => (
                    <div key={type} className="flex items-center justify-between text-sm">
                      <span>{type}:</span>
                      <Badge variant="secondary">{count as number}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Activity className="h-4 w-4" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Recent Logs:</span>
                    <Badge variant="outline">{logs.length}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Performance Metrics:</span>
                    <Badge variant="outline">{metrics.length}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="logs" className="h-80 p-4">
          <ScrollArea className="h-full">
            <div className="space-y-2">
              {logs.map((log, index) => (
                <Alert key={index} className="text-xs">
                  <div className="flex items-start gap-2">
                    {log.level === 'error' && <AlertTriangle className="h-3 w-3 text-red-500 mt-0.5" />}
                    {log.level === 'warn' && <AlertTriangle className="h-3 w-3 text-yellow-500 mt-0.5" />}
                    {log.level === 'info' && <Info className="h-3 w-3 text-blue-500 mt-0.5" />}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={log.level === 'error' ? 'destructive' : 'secondary'} className="text-xs">
                          {log.level}
                        </Badge>
                        <span className="text-muted-foreground text-xs">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <AlertDescription className="text-xs">{log.message}</AlertDescription>
                      {log.context && (
                        <details className="mt-1">
                          <summary className="text-xs text-muted-foreground cursor-pointer">
                            Context
                          </summary>
                          <pre className="text-xs mt-1 p-2 bg-muted rounded">
                            {JSON.stringify(log.context, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  </div>
                </Alert>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="metrics" className="h-80 p-4">
          <ScrollArea className="h-full">
            <div className="space-y-2">
              {metrics.map((metric, index) => (
                <Card key={index} className="p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm">{metric.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(metric.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm font-mono">{metric.duration}ms</span>
                    </div>
                  </div>
                  {metric.metadata && (
                    <details className="mt-2">
                      <summary className="text-xs text-muted-foreground cursor-pointer">
                        Metadata
                      </summary>
                      <pre className="text-xs mt-1 p-2 bg-muted rounded">
                        {JSON.stringify(metric.metadata, null, 2)}
                      </pre>
                    </details>
                  )}
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Hook to toggle debug panel
export function useCursorDebug() {
  const [isDebugVisible, setIsDebugVisible] = useState(false)

  const toggleDebug = () => setIsDebugVisible(!isDebugVisible)
  const showDebug = () => setIsDebugVisible(true)
  const hideDebug = () => setIsDebugVisible(false)

  return {
    isDebugVisible,
    toggleDebug,
    showDebug,
    hideDebug,
  }
}
