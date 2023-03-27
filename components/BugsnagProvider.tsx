import Bugsnag from "@bugsnag/js";
import BugsnagPluginReact from "@bugsnag/plugin-react";
import React from "react";

Bugsnag.start({
  apiKey: "2e8864db5e70f2fd27e9b539354a1270",
  plugins: [new BugsnagPluginReact()],
});

const ErrorBoundary = Bugsnag.getPlugin("react")!.createErrorBoundary(React);

type Props = {
  children: React.ReactNode;
};

const BugsnagProvider = ({ children }: Props) => {
  return <ErrorBoundary>{children}</ErrorBoundary>;
};

export default BugsnagProvider;
