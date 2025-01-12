import React from 'react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class HomeErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4 rounded-lg bg-background-elevated/50 border border-red-500/20">
          <h2 className="text-xl font-bold text-red-500 mb-2">Algo salió mal</h2>
          <p className="text-text-secondary">
            Por favor, intenta recargar la página
          </p>
        </div>
      );
    }

    return this.props.children;
  }
} 