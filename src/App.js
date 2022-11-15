
// import Customers from './component/admin/Customers';
// import Functional from './component/Functional-components/Functional';
// import MouseHook from './component/Functional-components/MouseHook';
// import UploadImageToS3WithNativeSdk from './component/Functional-components/UploadImageToS3WithNativeSdk';

import Toastify from "./component/Functional-components/Toastify";

// import Alert from "./component/Functional-components/Alert";

require("bootstrap/less/bootstrap.less");
function App() {
  return (
    <div className="App">
        {/* <center><h1>React admin</h1></center>  */}
        {/* <Functional /> */}
        {/* <MouseHook /> */}
        {/* <UploadImageToS3WithNativeSdk /> */}
       {/* <Alert /> */}
       <Toastify />
    </div>
  );
}

export default App;
