import { Suspense } from 'react'
import { Routes, Route, useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom'
import routes from '.'

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
  return <Suspense fallback={<>加载中...</>}>
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