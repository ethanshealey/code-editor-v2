import { useState, useEffect } from 'react'
import Language from '@/types/Language'
import { monacoThemes } from '@/helpers/themes'
import Theme from '@/types/Theme'
import { RxHamburgerMenu } from 'react-icons/rx'

interface IHeader {
    lang: Language,
    setLang: Function,
    theme: Theme,
    setTheme: Function,
    execute: Function
}

const Header = ({ lang, setLang, theme, setTheme, execute }: IHeader) => {

    const [ languages, setLanguages ] = useState<Language[]>([])
    const [ showMobileDropdown, setShowMobileDropdown ] = useState(false)

    useEffect(() => {
        fetch('/api/languages').then((res) => res.json()).then((data) => {
            console.log(data)
            setLanguages(data.languages)
        })
    }, [])

    useEffect(() => {
        document.getElementById('hamburger-dropdown')!.style.marginTop = showMobileDropdown ? '5vh' : '0vh'
    }, [showMobileDropdown])

    return (
        <div id="header">
            <h1>Online Code Editor</h1>
            <div id="header-button-group">
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
            <div id="header-button-group-sm">
                <RxHamburgerMenu onClick={() => setShowMobileDropdown(p => !p)} />
            </div>
        </div>
    )
}

export default Header