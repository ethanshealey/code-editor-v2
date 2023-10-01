import { useState, useEffect } from 'react'
import Head from 'next/head'
import EditorPane from '@/components/EditorPane'
import Header from '@/components/Header'
import OutputPane from '@/components/OutputPane'
import DragBar from '@/components/DragBar'
import { defineTheme } from '@/helpers/themes'
import Language from '@/types/Language'
import Theme from '@/types/Theme'
import Tabs from '@/components/Tabs'
import InputPane from '@/components/InputPane'
import { encode } from 'base-64';

export default function Home() {

  const [ code, setCode ] = useState<string>('')
  const [ stdin, setStdin ] = useState<string>('')
  const [ theme, setTheme ] = useState<Theme>({ name: "blackboard", value: "Blackboard" })
  const [ language, setLanguage ] = useState<Language>({ id: 93, name: 'JavaScript (Node.js 18.15.0)' })
  const [ showOutput, setShowOutput ] = useState(true)
  const [ output, setOutput ] = useState<any>(undefined)
  const [ isProcessing, setIsProcessing ] = useState(false)

  useEffect(() => {
    defineTheme('blackboard').then((_: any) => setTheme({ name: "blackboard", value: "Blackboard" }))
  }, [])

  const onThemeChange = (t: Theme) => {
    console.log(t)
    defineTheme(t.name).then((_: any) => setTheme(t))
  }

  const onLanguageChange = (l: Language) => {
    setLanguage((_: any) => l)
  }

  const execute = () => {
    console.log(language.id, code, stdin)
    setIsProcessing(true)
    const bCode = encode(code)
    const bStdin = encode(stdin)
    console.log(bCode, bStdin)
    fetch(`/api/execute?language_id=${language.id}&source_code=${bCode}&stdin=${bStdin}`).then((res) => res.json()).then((data) => {
      console.log(data)
      setOutput(data)
      setIsProcessing(false)
    })
    // setOutput({
    //     "results": {
    //       "source_code": decode("Y29uc29sZS5sb2coJ2hpJyk=\n"),
    //       "language_id": 93,
    //       "stdin": "",
    //       "expected_output": null,
    //       "stdout": decode("aGkK\n"),
    //       "status_id": 3,
    //       "created_at": "2023-10-01T02:28:56.054Z",
    //       "finished_at": "2023-10-01T02:28:57.586Z",
    //       "time": "0.447",
    //       "memory": 14304,
    //       "stderr": null,
    //       "token": "5a46e231-8a42-4ade-b4af-11cf001b31ea",
    //       "number_of_runs": 1,
    //       "cpu_time_limit": "5.0",
    //       "cpu_extra_time": "1.0",
    //       "wall_time_limit": "10.0",
    //       "memory_limit": 128000,
    //       "stack_limit": 64000,
    //       "max_processes_and_or_threads": 60,
    //       "enable_per_process_and_thread_time_limit": false,
    //       "enable_per_process_and_thread_memory_limit": false,
    //       "max_file_size": 1024,
    //       "compile_output": null,
    //       "exit_code": 0,
    //       "exit_signal": null,
    //       "message": null,
    //       "wall_time": "0.479",
    //       "compiler_options": null,
    //       "command_line_arguments": null,
    //       "redirect_stderr_to_stdout": false,
    //       "callback_url": null,
    //       "additional_files": null,
    //       "enable_network": false,
    //       "status": {
    //         "id": 3,
    //         "description": "Accepted"
    //       },
    //       "language": {
    //         "id": 93,
    //         "name": "JavaScript (Node.js 18.15.0)"
    //       }
    //     }
    // })
    // setIsProcessing(false)
  }

  return (
    <>
      <Head>
        <title>Code Editor V2 | ethanshealey.com</title>
        <meta name="description" content="An online code compiler" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Header lang={language} setLang={onLanguageChange} theme={theme} setTheme={onThemeChange} execute={execute} />
        <EditorPane code={code} setCode={setCode} theme={theme} language={language} />
        {/* <DragBar /> */}
        <div id="bottom-panes">
          <Tabs showOutput={showOutput} setShowOutput={setShowOutput} />
          {
            showOutput ?
            <OutputPane output={output} isProcessing={isProcessing} /> : <InputPane stdin={stdin} setStdin={setStdin} />
          }
        </div>
      </main>
    </>
  )
}
