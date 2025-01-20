import Router from "./route";

import ThemeProvider from "./layout/provider/Theme";
import React from "react";

const App = () => {
    return (
        <ThemeProvider>
            <Router/>
        </ThemeProvider>
    );
};
export default App;