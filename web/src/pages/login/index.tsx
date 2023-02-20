import LoginForm from './form'
import bg from './loading-bg.png'

const Login = () => {
  return (
    <div className="flex w-screen h-screen">
      <div className="bg-blue-500 w-[768px] flex-shrink-0 pt-[100px]">
        <div className="text-white flex flex-col justify-center  px-20">
          <img className="mx-auto" src={bg} />
          <div className="text-xl">欢迎使用看板平台。</div>
          <div className="text-base">
            森盟科技有限公司看板后台，集项目管理、甘特图于一体的高效项目开发管理平台。
          </div>
        </div>
      </div>
      <div className="flex-1 flex justify-center">
        <LoginForm />
      </div>
    </div>
  )
}

export default Login
