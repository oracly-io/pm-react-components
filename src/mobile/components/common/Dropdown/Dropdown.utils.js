export const getModifiers = ({ isOpen, popperStyles = {}, }) => {

  return [
    { name: 'eventListeners', options: { scroll: false } },
    {
      name: 'toggle',
      enabled: true,
      phase: 'beforeWrite',
      requires: ['computeStyles'],
      fn: ({ state }) => {
        state.styles.popper.visibility = isOpen ? 'visible' : 'hidden'
        state.styles.popper.pointerEvents = isOpen ? 'all' : 'none'
      },
    },
    {
      name: 'styles',
      enabled: true,
      phase: 'beforeWrite',
      requires: ['computeStyles'],
      fn: ({ state }) => {
        state.styles.popper.left = '-8px'
        
        for (const prop in popperStyles) { state.styles.popper[prop] = popperStyles[prop] }
      },
    },
    { name: 'offset', options: { offset: [0, 8] } },
  ]
}