import { useState, useRef, useEffect } from 'react'

function useUninitialEffect(effect, deps) {
	const initialRender = useRef(true)

	useEffect(() => {
		if (initialRender.current) initialRender.current = false
		else return effect()
	}, deps)
}

export function useTransition(entering, timeout) {

  const [mount, setmount] = useState(entering)
  const [forward, setforward] = useState(entering)

	useUninitialEffect(() => {

    let TRANS
		if (entering) {
      // entering
      setmount(true)
      TRANS = setTimeout(() => setforward(true), 50)
    } else {
      // exiting
      setforward(false)
      TRANS = setTimeout(() => setmount(false), timeout)
    }

    return () => {
      clearTimeout(TRANS)
    }

	}, [entering])

  return [mount, forward]

}
