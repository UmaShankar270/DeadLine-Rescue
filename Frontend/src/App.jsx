import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";

function App() {

    return (

        <>

            <Dashboard />

            <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                theme="colored"
            />

        </>

    );

}

export default App;