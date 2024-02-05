// App.jsx
import React from "react";
import SignupForm from "./components/molecules/SignupForm"; // SignupForm コンポーネントをインポート

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <SignupForm /> {/* サインアップフォームを表示 */}
      </header>
    </div>
  );
}

export default App;
