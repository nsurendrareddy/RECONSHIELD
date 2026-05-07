import { Component } from 'react'
import { AlertTriangle } from 'lucide-react'

export default class ErrorBoundary extends Component {
  state = { hasError: false, error: null }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="glass-card p-6 text-center animate-fade-in">
          <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto mb-3" />
          <p className="text-amber-400 font-heading font-semibold">Component Error</p>
          <p className="text-xs text-gray-500 font-mono mt-2">{this.state.error?.message}</p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-4 px-4 py-2 rounded-lg bg-surface-700 text-xs font-mono text-gray-300 hover:text-matrix-400 border border-white/5"
          >
            retry()
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
