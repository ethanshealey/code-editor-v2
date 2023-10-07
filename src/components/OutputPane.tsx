import { decode } from '@/helpers/utf8-base64'
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
          <pre style={{ color: '#f05c51' }}>{ decode(output.results.stderr ?? '') }</pre>
        ) : (
          <>
            { output.results.compile_output && <pre style={{ color: '#f05c51' }}>{ decode(output.results.compile_output ?? '') }</pre> }
            { output.results.message && <pre>{ decode(output.results.message ?? '') }</pre> }
            { output.results.stdout && <pre>{ decode(output.results.stdout ?? '') }</pre> }
          </>
          
        ) : (
          <></>
        )
      }
    </div>
  )
}

export default OutputPane