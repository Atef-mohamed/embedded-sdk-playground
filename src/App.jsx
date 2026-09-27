import { useCallback, useEffect, useRef } from "react";
import { useTheme } from "./contexts/ThemeContext.jsx";
import { useAppBootstrap } from "./hooks/useAppBootstrap.js";
import { useIframeAutoBootstrap } from "./hooks/useIframeAutoBootstrap.js";
import { ToastProvider, useToast } from "./contexts/ToastContext.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import Header from "./components/Header.jsx";
import StatusBar from "./components/StatusBar.jsx";

function AppContent() {
  const { setTheme } = useTheme();
  const { showToast } = useToast();
  const hasSyncedInitialTheme = useRef(false);

  // Memoize callbacks to prevent subscription churn
  const handleSdkThemeChange = useCallback(
    (newTheme) => setTheme(newTheme),
    [setTheme],
  );

  const handleSdkActionClick = useCallback(
    (value) => showToast(`Action clicked: ${value}`, "info"),
    [showToast],
  );

  const { isReady, layout, bootstrap } = useAppBootstrap({
    debug: true,
    autoInit: false, // Triggered by useIframeAutoBootstrap when embedded
    onThemeChange: handleSdkThemeChange,
    onActionClick: handleSdkActionClick,
  });

  // Detect iframe mode and auto-bootstrap when embedded
  const { iframeMode, parentOrigin } = useIframeAutoBootstrap(bootstrap);

  // Sync initial theme from host (later changes handled by onThemeChange)
  useEffect(() => {
    if (isReady && layout?.theme && !hasSyncedInitialTheme.current) {
      hasSyncedInitialTheme.current = true;
      setTheme(layout.theme);
    }
  }, [isReady, layout, setTheme]);

  return (
    <div className="app">
      <Header />
      <StatusBar
        isConnected={isReady}
        parentOrigin={parentOrigin}
        iframeMode={iframeMode}
      />
      <main className="main-content">{/* App content goes here */}</main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
