import useMediaQuery from './hooks/useMediaQuery'

const App = () => {
  const isSmallDevice = useMediaQuery('only screen and (max-width : 768px)')
  const isMediumDevice = useMediaQuery('only screen and (min-width : 769px) and (max-width : 992px)')
  const isLargeDevice = useMediaQuery('only screen and (min-width : 993px) and (max-width : 1200px)')
  const isExtraLargeDevice = useMediaQuery('only screen and (min-width : 1201px)')

  return (
    <div>
      {isSmallDevice && <p>You are on a small device.</p>}
      {isMediumDevice && <p>You are on a medium device.</p>}
      {isLargeDevice && <p>You are on a large device.</p>}
      {isExtraLargeDevice && <p>You are on an extra large device.</p>}
    </div>
  )
}
export default App
