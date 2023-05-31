import { useEffect, useState } from 'react'

function useWindowScroll() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowScroll, setWindowScroll] = useState({
    x: 0,
    y: 0,
  })
  useEffect(() => {
    // Handler to call on window resize
    function handleScroll() {
      // Set window width/height to state
      setWindowScroll({
        x: window.scrollX,
        y: window.scrollY,
      })
    }
    // Add event listener
    window.addEventListener('scroll', handleScroll)
    // Call handler right away so state gets updated with initial window size
    handleScroll()
    // Remove event listener on cleanup
    return () => window.removeEventListener('scroll', handleScroll)
  }, []) // Empty array ensures that effect is only run on mount
  return windowScroll
}

export default useWindowScroll
