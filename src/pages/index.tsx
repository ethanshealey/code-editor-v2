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
import { encode } from '@/helpers/utf8-base64'
import HamburgerDropdown from '../components/HamburgerDropdown'
import defaultEditorValues from '@/helpers/defaultEditorValues'

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
    if(!code?.length)
      setCode(defaultEditorValues(l))
  }

  const execute = () => {
    console.log(language.id, code, stdin)
    setIsProcessing(true)
    const bCode = encode(code)
    const bStdin = encode(stdin)
    console.log(bCode, bStdin)
    fetch(`/api/execute?language_id=${language.id}&source_code=${bCode}&stdin=${bStdin}`).then((res) => res.json()).then((data) => {
      console.log(data)
      // if(data?.results?.message) 
      //   setOutput({ results: { stderr: encode(data.results.message) }})
      if(data?.results?.message?.includes('You have exceeded the DAILY quota')) {
        setOutput({ results: { stderr: encode(data.results.message) } })
      }
      else 
        setOutput(data)
      setIsProcessing(false)
    })
  }

  return (
    <>
      <Head>
        <title>Code Editor V2 | ethanshealey.com</title>
        <meta name="description" content="An online code compiler" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
      </Head>
      <main>
        <Header lang={language} setLang={onLanguageChange} theme={theme} setTheme={onThemeChange} execute={execute} />
        <HamburgerDropdown lang={language} setLang={onLanguageChange} theme={theme} setTheme={onThemeChange} execute={execute} />
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
