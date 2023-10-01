interface IInputPane {
  stdin: string,
  setStdin: Function
}

const InputPane = ({ stdin, setStdin }: IInputPane) => {
  return (
    <textarea id="input-pane" value={stdin} onChange={(e) => setStdin(e.target.value)} />
  )
}

export default InputPane