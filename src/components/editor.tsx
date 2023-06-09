import React, { useCallback, useEffect } from 'react'
import { EditorState } from '@codemirror/state'
import useCodeMirror from './codemirror'

interface Props {
  initialDoc: string
  onChange: (doc: string) => void
}

const Editor: React.FC<Props> = (props) => {
  const { onChange, initialDoc } = props
  const handleChange = useCallback(
    (state: EditorState) => onChange(state.doc.toString()),
    [onChange]
  )
  const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
    initialDoc: initialDoc,
    onChange: handleChange,
  })

  useEffect(() => {
    if (!editorView) return
    if (props.initialDoc === editorView.state.doc.toString()) return
    editorView.dispatch({
      changes: {
        from: 0,
        to: editorView.state.doc.length,
        insert: props.initialDoc,
      },
    })
  }, [props.initialDoc])

  useEffect(() => {
    if (editorView) {
      // Do nothing for now
    } else {
      // loading editor
    }
  }, [editorView])

  return <div className="h-full w-full" ref={refContainer}></div>
}

export default Editor
