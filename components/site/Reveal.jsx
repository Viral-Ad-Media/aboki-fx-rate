import React, { useEffect, useRef, useState } from 'react'

/**
 * Reveals its children once, when the element's top is about 88% of the way down the viewport.
 * Children marked with data-part arrive in reading order (stagger via --n). Without JS, or with
 * reduced motion, the content is simply there: the hidden state lives in CSS under html.js.
 *
 * manner: "rise" (default) | "rows" | "settle"
 */
export default function Reveal({ as: Tag = 'div', manner = 'rise', children, className, ...rest }) {
  const ref = useRef(null)
  const [state, setState] = useState('out')

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') {
      setState('in')
      return
    }
    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          setState('in')
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.01 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag ref={ref} data-reveal={state} data-manner={manner} className={className} {...rest}>
      {children}
    </Tag>
  )
}
