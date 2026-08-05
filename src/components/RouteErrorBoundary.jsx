import React from 'react';
import { LogoImage } from './LogoImage';

const DEFAULT_LABELS = {
  title: 'Something went wrong',
  description: 'This tool failed to load. Try again or refresh the page.',
  retry: 'Try again',
};

/**
 * Catches render errors in route trees so SPA navigation never leaves a blank screen.
 * Implemented as .jsx because this repo's React 19 install has no Component class typings.
 */
export class RouteErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      console.error('RouteErrorBoundary', error, info?.componentStack);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.error) {
      this.setState({ error: null });
    }
  }

  handleRetry = () => {
    this.setState({ error: null });
  };

  render() {
    if (!this.state.error) {
      return this.props.children;
    }

    const labels = this.props.labels ?? DEFAULT_LABELS;

    return (
      <div
        className="flex-1 flex items-center justify-center py-28 min-h-[50vh] px-4"
        role="alert"
      >
        <div className="flex flex-col items-center gap-4 premium-surface !py-8 !px-10 max-w-md text-center">
          <LogoImage size={56} className="w-14 h-14 rounded-2xl shadow-md" />
          <h2 className="text-sm font-semibold text-slate-800">{labels.title}</h2>
          <p className="text-xs text-slate-500 leading-relaxed">{labels.description}</p>
          <button
            type="button"
            onClick={this.handleRetry}
            className="mt-1 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-xl px-4 py-2 transition-colors"
          >
            {labels.retry}
          </button>
        </div>
      </div>
    );
  }
}
