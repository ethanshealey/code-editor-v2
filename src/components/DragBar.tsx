import { useEffect } from 'react'

const DragBar = () => {

  useEffect(() => {
    let drag = false
    let dragBar = document.getElementById('drag-bar')
    const handleDragBarClick = (e: any) => {
        e.preventDefault()
        drag = true
    }
    const handleDragBarRelease = (e: any) => {
        e.preventDefault()
        drag = false
    }
    const handleDragBar = (e: any) => {
        if(drag) {
            console.log(e.y)
            document.getElementById('editor-pane')!.style.height = `${e.y}px`
            console.log(document.getElementById('editor-pane')!.style.height)
        }
    }

    dragBar?.addEventListener('mousedown', handleDragBarClick)
    dragBar?.addEventListener('mousemove', handleDragBar)
    dragBar?.addEventListener('mouseup', handleDragBarRelease)
    return () => document.getElementById('drag-bar')?.removeEventListener('mousedown', handleDragBar)
  }, [])

  return (
    <div id="drag-bar" className='noselect'><span>||</span></div>
  )
}

export default DragBar