import React, { Suspense } from "react";
import "./App.css";

const Header = React.lazy(() => import("Header_remote/Header"));
const Title2 = React.lazy(() => import("Header_remote/Titles/Title2"));
console.info(`Starting application with process.env.WEBPACK_DEMO_FOO = "${process.env.WEBPACK_DEMO_F003}`);
const title=process.env.WEBPACK_DEMO_F004


function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Suspense>
          <Header />
        </Suspense>
        <Suspense>
          <Title2 />
        </Suspense> */}
        {title}
        <h3>ola</h3>
      </header>
    </div>
  );
}

export default App;
