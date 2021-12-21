import {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import JobsData from './data/JobsData';
import Header from './components/Header';
import Filters from './components/Filters';
import { Container, Row, Col } from 'react-bootstrap';
import Jobs from './components/Jobs'
import Footer from './components/Footer';

function App() {

  const [jobs, setJobs] = useState(JobsData)

  return (
    <div className="App">
      <Header/>
      <Filters/>
      <hr/>
      <Container>
        <Row>
          <Col>
            <Jobs jobs={jobs}/>
          </Col>
          <Col>
          
          </Col>
        </Row>
      </Container>
      <Footer/>
    </div>
  );
}

export default App;
