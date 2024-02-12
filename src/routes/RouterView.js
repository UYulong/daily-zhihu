import { Suspense } from 'react'
import { Routes, Route, useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom'
import routes from '.'
import Loading from '@/components/Loading'

const Element = (props) => {
  const { component: Component, meta } = props
  const navigate = useNavigate(),
    location = useLocation(),
    params = useParams(),
    [usp] = useSearchParams()

  const { title = '知乎日报' } = meta || {}
  document.title = title !== '知乎日报' ? `${title}-知乎日报` : title

  return <Component navigate={navigate} location={location} params={params} usp={usp} />
}

const RouterView = () => {
  return <Suspense fallback={<Loading />}>
    <Routes>
      {
        routes.map(route => {
          const { path } = route
          return <Route key={route.name} path={path} element={<Element {...route} />} />
        })
      }
    </Routes>
  </Suspense>

}

export default RouterView