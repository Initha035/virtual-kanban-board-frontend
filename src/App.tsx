import {
  BrowserRouter as BR,
  Navigate,
  Route as R,
  Routes,
} from "react-router-dom";
import { lazy, Suspense as S, useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Welcome from "./components/auth/Welcome";
import Home from "./components/home/Home";
import { Toaster } from "react-hot-toast";

const Setting = lazy(() => import("./components/project/Setting"));
const Project = lazy(() => import("./components/project/Project"));

function App() {
  return (
    <main>
      <Provider store={store}>
        <BR>
          <Routes>
            <R path="/project" element={<Home />}>
              <R
                path=":projectId"
                element={
                  <S>
                    <Setting />
                  </S>
                }
              />
              <R
                path=":projectId/board"
                element={
                  <S>
                    <Project />
                  </S>
                }
              />
            </R>
            <R path="/register" element={<Welcome type="REGISTER" />} />
            <R path="/login" element={<Welcome type="LOGIN" />} />

            <R path="/" element={<Navigate to="/project" />} />
          </Routes>
        </BR>
      </Provider>
      <Toaster />
    </main>
  );
}

export default App;
