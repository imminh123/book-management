import React, { Component } from "react";

type MyProps = {
  // using `interface` is also ok

  children: React.ReactNode;
};

export class ErrorBoundary extends Component<MyProps> {
  state = { hasError: false };

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <section className="h-screen flex items-center justify-center">
          <h1 className="text-discord-100">
            Sorry there's some errors, please try again later!
          </h1>
        </section>
      );
    }

    return this.props.children;
  }
}
