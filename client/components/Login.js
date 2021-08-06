import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { login } from '../axios/api'

const LoginForm = () => {
  const [name, setName] = useState()
  const [password, setPassword] = useState()
  const handleClick = (e) => {
    login(name, password)
  }

  return (<div>
    <section className="section-title">
      <div className="px-2">
      </div>
    </section>
    <div className="bwm-form">
      <div className="row">
        <div className="col-md-5 mx-auto">
          <h1 className="h3">Sign in</h1>
          <form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                onChange={e => setName(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                onChange={e => setPassword(e.target.value)} />
            </div>
            <Link href="/board">
              <button
                type="submit"
                className="btn btn-warning"
                onClick={handleClick}>Submit</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  </div>
  )
}


export default LoginForm