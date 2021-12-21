import {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import JobsData from './data/JobsData';
import Header from './components/Header';
import { Container, Row, Col } from 'react-bootstrap';
import Jobs from './components/Jobs'

function App() {

  const [jobs, setJobs] = useState(JobsData)

  return (
    <div className="App">
      <Header/>
      <Container>
        <Row>
          <Col>
            <Jobs jobs={jobs}/>
          </Col>
          <Col>
          
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
