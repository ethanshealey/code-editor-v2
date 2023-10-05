import { useState, useEffect } from 'react'
import { monacoThemes } from '@/helpers/themes'
import Language from '@/types/Language'
import Theme from '@/types/Theme'

interface IHamburgerDropdown {
    lang: Language,
    setLang: Function,
    theme: Theme,
    setTheme: Function,
    execute: Function
}

const HamburgerDropdown = ({ lang, setLang, theme, setTheme, execute }: IHamburgerDropdown) => {

    const [ languages, setLanguages ] = useState<Language[]>([])

    useEffect(() => {
        fetch('/api/languages').then((res) => res.json()).then((data) => {
            console.log(data)
            setLanguages(data.languages)
        })
    }, [])

  return (
    <div id="hamburger-dropdown">
        <select id="language-dropdown" value={lang.name}>
            {
                languages && languages?.map((l: Language) => (
                    <option key={l.name} onClick={() => setLang(l)}>{ l?.name }</option>
                ))
            }
        </select>
        <select id="theme-dropdown" value={theme.value}>
            {
                Object.entries(monacoThemes)?.map(([k, v]: any) => (
                    <option key={`${k}-${v}`} onClick={() => setTheme({ name: k, value: v })}>{ v }</option>
                ))
            }
        </select>
        <button id="execute-btn" onClick={() => execute()}>Run</button>
    </div>
  )
}

export default HamburgerDropdown