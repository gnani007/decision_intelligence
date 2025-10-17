import './App.scss';
import Charts from './components/Charts';
import FlowCanvas from './components/FlowCanvas';

function App() {
  return (
    <div className="App">
      <div className='header'>
        <h3>Decision Workflow dashboard</h3>
      </div>
      <div className='main-container'>
        <div className='reactflow-container'>
          <FlowCanvas />
        </div>
        <div className='chart-container '>
          <Charts />
        </div>
      </div>

    </div>
  );
}

export default App;
