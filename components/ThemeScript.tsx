export default function ThemeScript() {
	return (
		<script
			suppressHydrationWarning
			dangerouslySetInnerHTML={{
				__html: `
          (function() {
            function applyTheme(theme) {
              var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              var resolvedTheme = theme === 'system' ? systemTheme : theme || systemTheme;
              
              if (resolvedTheme === 'dark') {
                document.documentElement.classList.add('dark');
                document.body.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
                document.body.classList.remove('dark');
              }
            }
            
            try {
              // Initial theme application
              var theme = localStorage.getItem('theme');
              applyTheme(theme);
              
              // Listen for system theme changes
              var mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
              mediaQuery.addEventListener('change', function() {
                var currentTheme = localStorage.getItem('theme');
                applyTheme(currentTheme);
              });
              
              // Listen for storage changes (for cross-tab sync)
              window.addEventListener('storage', function(e) {
                if (e.key === 'theme') {
                  applyTheme(e.newValue);
                }
              });
              
              // Mark theme as loaded to prevent FOUC
              document.documentElement.classList.add('theme-loaded');
            } catch (e) {}
          })();
        `,
			}}
		/>
	);
}
