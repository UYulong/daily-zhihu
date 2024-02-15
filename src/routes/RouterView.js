import { Suspense, useEffect, useState } from 'react'
import { Routes, Route, useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom'
import routes from '.'
import Loading from '@/components/Loading'
import store from '@/store'
import { useDispatch } from 'react-redux'
import { fetchUserInfo } from '@/store/modules/users'

// 需要验证的路由
const authRoutes = ['/personal', '/collect', '/update']

// 验证方法
const isAuthRoute = (pathname) => {
  return authRoutes.includes(pathname)
}

const Element = (props) => {
  const { component: Component, meta } = props

  const navigate = useNavigate(),
    location = useLocation(),
    params = useParams(),
    [usp] = useSearchParams()

  const [_, setRandom] = useState(null)

  const { pathname } = location

  // 是否需要验证身份
  let _isPass = true
  if (isAuthRoute(pathname)) {
    // 需要认证的路由
    const { info } = store.getState().users

    if (Reflect.ownKeys(info).length === 0) {
      _isPass = false
    }
  }

  // console.log(`isPass--[${pathname}]`, _isPass);

  const dispatch = useDispatch()
  useEffect(() => {
    if (_isPass) return

    (async () => {
      try {
        const { payload } = await dispatch(fetchUserInfo())
        if (payload) {
          setRandom(+new Date())
        } else {
          navigate(`/login?to=${pathname}`, { replace: true })
          return
        }
      } catch (e) {
        console.log(e);
      }
    })()
  })

  if (!_isPass) return <Loading />

  // 不需要验证
  const { title = '知乎日报' } = meta || {}
  document.title = title !== '知乎日报' ? `${title}-知乎日报` : title

  const routeTools = {
    navigate,
    location,
    params,
    usp
  }

  return <Component {...routeTools} />
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