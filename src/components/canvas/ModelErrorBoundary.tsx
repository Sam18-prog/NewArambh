'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, ArrowLeft, Map } from 'lucide-react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
  fallbackDestinationId?: string;
  onFallback2D?: () => void;
  onRetry?: () => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ModelErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ModelErrorBoundary caught an error while rendering 3D Canvas:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
    if (this.props.onRetry) {
      this.props.onRetry();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-zinc-950/95 backdrop-blur-xl">
          <div className="max-w-md w-full rounded-3xl p-8 bg-zinc-900 border border-red-500/30 text-center space-y-5 shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white tracking-tight">
                Unable to Render 3D Environment
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                The 3D canvas encountered a graphics initialization error or the architectural asset
                could not be parsed by your GPU. You can switch to our 2D interactive floor plan or retry.
              </p>
              {this.state.error && (
                <div className="p-3 rounded-xl bg-black/60 border border-zinc-800 text-[11px] font-mono text-red-300/90 text-left overflow-x-auto max-h-24">
                  {this.state.error.message}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2.5 pt-2">
              {this.props.onFallback2D && (
                <button
                  type="button"
                  onClick={this.props.onFallback2D}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-zinc-950 bg-amber-400 hover:bg-amber-300 transition-colors shadow-lg shadow-amber-500/20"
                >
                  <Map className="w-4 h-4" />
                  <span>Switch to 2D Floor Plan</span>
                </button>
              )}

              <button
                type="button"
                onClick={this.handleRetry}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold text-zinc-200 bg-zinc-800 hover:bg-zinc-700 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry 3D Experience</span>
              </button>

              {this.props.fallbackDestinationId && (
                <Link
                  href={`/explore/${this.props.fallbackDestinationId}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-medium text-zinc-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Return to Destination Overview</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
