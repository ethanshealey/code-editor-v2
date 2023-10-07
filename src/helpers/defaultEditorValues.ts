import Language from "@/types/Language"
import languageMapper from "./languageMapper"

interface DefaultEditorValueMapper extends Object {
    'javascript': string,
    'typescript': string,
    'bash': string,
    'c': string,
    'cpp': string,
    'clojure': string,
    'csharp': string,
    'cobol': string,
    'lisp': string,
    'dart': string,
    'd': string,
    'elixir': string,
    'erlang': string,
    'fsharp': string,
    'fortran': string,
    'go': string,
    'groovy': string,
    'haskell': string,
    'java': string,
    'kotlin': string,
    'lua': string,
    'objectivec': string,
    'ocaml': string,
    'octave': string,
    'pascal': string,
    'perl': string
}

export default (l: Language): string => {

    const value: keyof DefaultEditorValueMapper = languageMapper(l)

    const mapper: DefaultEditorValueMapper = {
        'javascript': `console.log('hello world!')`,
        'typescript': `console.log('hello world!')`,
        'bash': `#!/bin/bash\necho "Hello World"`,
        'c': `#include<stdio.h>\n\nint main() {\n\tprintf("Hello World!");\n\treturn 0;\n}`,
        'cpp': `#include<iostream>\n\nint main() {\n\tstd::cout << "Hello World" << std::endl;\n\treturn 0;\n}`,
        'clojure': `(defn hello []\n\t(println "Hello world!"))\n\n(hello)`,
        'csharp': `class HelloWorld\n{\n\tstatic void Main()\n\t\t{\n\t\t\tSystem.Console.WriteLine("Hello, World!");\n\t\t}\n}`,
        'cobol': `IDENTIFICATION DIVISION.\nPROGRAM-ID. IDSAMPLE.\nENVIRONMENT DIVISION.\nPROCEDURE DIVISION.\n\tDISPLAY 'HELLO WORLD'.\nSTOP RUN.\n`,
        'lisp': `(print "Hello World")`,
        'dart': `main() {\n\tprint('Hello World!');\n}`,
        'd': `import std.stdio;\n\nvoid main() {\n\twritefln("Hello World!");\n}`,
        'elixir': `defmodule HelloWorld do\n\tIO.puts "Hello, World!"\nend`,
        'erlang': `-module(hello).\n\n-export([hello/0]).\n\nhello() ->\n\tio:format("Hello World!~n", []).`,
        'fsharp': `printf "Hello World!\\n"`,
        'fortran': `\tPROGRAM HELLO\n\tWRITE (*, 100)\n\tSTOP\n100 FORMAT (' HELLO WORLD ' /)\n\tEND`,
        'go': `package main\nimport "fmt"\nfunc main() {\n\tfmt.Printf("Hello World\\n")\n}`,
        'groovy': `println "Hello World"`,
        'haskell': `main = putStrLn "Hello World"`,
        'java': `class Main {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World!");\n\t}\n}`,
        'kotlin': `fun main(args : Array<String>) {\n\tprintln("Hello, world!")\n}`,
        'lua': `print "Hello world"`,
        'objectivec': `#include<stdh.io>\n\nint main() {\n\tprintf("Hello World!");\n\treturn 0;\n}`,
        'ocaml': `print_string "Hello World!\\n";;`,
        'octave': `printf("Hello World\\n");`,
        'pascal': `program HelloWorld(output);\nbegin\n\tWriteLn('Hello World!');\nend.`,
        'perl': `print "Hello World!\\n";`
    }

    console.log(mapper[value as keyof DefaultEditorValueMapper])

    const res: any = mapper[value]
    return res
}