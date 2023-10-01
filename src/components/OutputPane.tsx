import { decode } from 'base-64';
import Spinner from './Spinner';

interface IOutputPane {
  output: any,
  isProcessing: boolean
}

const OutputPane = ({ output, isProcessing }: IOutputPane) => {

  return (
    <div id="output-pane">
      {
        isProcessing ? (
          <Spinner size={"15px"} />
        ) : output ? output.results.stderr ? (
          <pre>{ decode(output.results.stderr) }</pre>
        ) : (
          <pre style={{ color: '#f05c51' }}>{ decode(output.results.stdout) }</pre>
        ) : (
          <></>
        )
      }
    </div>
  )
}

export default OutputPane