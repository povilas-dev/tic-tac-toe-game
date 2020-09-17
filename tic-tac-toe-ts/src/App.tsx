import React, { useState } from "react";
import Modal from "wix-style-react/dist/es/src/Modal";
import Button from "wix-style-react/dist/es/src/Button";
import "./App.css";

const App: React.FunctionComponent<{}> = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  return (
    <div className="App">
      <Button onClick={() => setIsModalVisible(!isModalVisible)} />
      <Modal isOpen={isModalVisible}></Modal>
    </div>
  );
};

export default App;
