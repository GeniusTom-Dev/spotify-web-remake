import useAuth from "../../components/useAuth"

function DashBoard() {
  const token = localStorage.getItem('token')
  const accessToken = useAuth(token)
  return (
    <div className='bg-[var(--grey)] h-[100vh]'>
      {token}
        DashBoard
    </div>
  )
}

export default DashBoard