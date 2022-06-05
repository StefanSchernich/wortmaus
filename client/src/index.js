import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import App from "./components/App";
import NewWord from "./components/NewWord";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<Routes>
			<Route element={<Layout />}>
				<Route path='/' element={<App />} />
				<Route path='/new' element={<NewWord />} />
			</Route>
		</Routes>
	</BrowserRouter>
);
